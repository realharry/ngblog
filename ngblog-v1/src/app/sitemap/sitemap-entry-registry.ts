import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { SiteEntry } from '@ngcore/link';

import { SitemapEntryUtil } from './util/sitemap-entry-util';
import { PostStatus } from '../blog/core/post-status';
import { PostListService } from '../services/post-list.service';


@Injectable()
export class SitemapEntryRegistry {

  constructor(
    private appConfig: AppConfig,
    private postListService: PostListService,
  ) {
  }

  private _isLoaded = false;
  public get isLoaded(): boolean {
    return this._isLoaded;
  }
  private entryMap: { [location: string]: SiteEntry } = {};
  private entryList: SiteEntry[] = [];
  public get entries(): SiteEntry[] {
    // return Object.values(this.entryMap);
    return this.entryList;
  }

  public getEntry(location: string): (SiteEntry | null) {
    if (this.isLoaded) {
      return this.entryMap[location];
    } else {
      return null;
    }
  }


  public buildEntryMap(hostUrl: string): Observable<SiteEntry[]> {
    let maxDates = 100;
    maxDates = this.appConfig.getNumber("max-sitemap-age", maxDates);
    // TBD:
    // Setting useCache to true throws exceptions.
    // Need to investigate....
    let useCache = false;
    return this.postListService.getDailyPosts(maxDates, null, null,
      [PostStatus.Posted, PostStatus.Hidden], useCache).map(posts => {
        let map: { [location: string]: SiteEntry } = {};
        let list: SiteEntry[] = [];
        for (let pm of posts) {
          if(isDL()) dl.log(`post metadata = ${pm}`);
          let entry = SitemapEntryUtil.buildFromPostMetadata(pm, hostUrl);
          if(isDL()) dl.log(`entry = ${entry}`);
          if (entry) {
            map[entry.location] = entry;
            list.push(entry);
          }
        }
        this.entryMap = map;
        this.entryList = list;
        this._isLoaded = true;
        // return Object.values(map);
        return this.entryList;
      });
  }

}
