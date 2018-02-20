import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { AppConfigService } from '../../config/app-config.service';

import { MarkdownDocEntry } from '../../entry/markdown-doc-entry';
import { MarkdownEntryUtil } from '../../entry/util/markdown-entry-util';

import { PostListService } from '../../services/post-list.service';
import { PostMetadata } from '../../blog/post-metadata';


@Injectable()
export class BlogPostRegistry {

  private appConfig: AppConfig;
  constructor(
    // private appConfig: AppConfig,
    private appConfigService: AppConfigService,
    private postListService: PostListService,
    // private localStorageService: LocalStorageService,
    // private lazyLoaderService: LazyLoaderService,
  ) {
    this.appConfig = this.appConfigService.appConfig;

    // this.buildEntryMap().subscribe(map => {
    //   if(isDL()) dl.log("map loaded.");
    // });
  }

  public getRangeEndDate(dateId: string): string {
    let todayId = DateIdUtil.getTodayId();
    let endDate: string;
    if(dateId > todayId) {
      endDate = DateIdUtil.getTomorrowId();
    } else if(dateId == todayId) {
      if(DateTimeUtil.getHourOfTheDay() >= this.appConfigService.dailyPostStartHour) {
        endDate = DateIdUtil.getTomorrowId();
      } else {
        endDate = todayId;
      }
    } else {
      endDate = DateIdUtil.getNextDayId(dateId);
    }
    return endDate;
  }

  private _isLoaded = false;
  public get isLoaded(): boolean {
    return this._isLoaded;
  }
  private entryMap: { [dateId: string]: MarkdownDocEntry } = {};
  private entryList: MarkdownDocEntry[] = [];
  public get entries(): MarkdownDocEntry[] {
    // return Object.values(this.entryMap);
    return this.entryList;
  }

  public getEntry(dateId: string): (MarkdownDocEntry | null) {
    if (this.isLoaded) {
      return this.entryMap[dateId];
    } else {
      return null;
    }
  }

  // public buildEntryMap(): Observable<{ [dateId: string]: MarkdownDocEntry }> {
  //   let maxDates = 30;
  //   maxDates = this.appConfig.getNumber("max-post-age", maxDates);
  //   return this.postListService.getDailyPosts(maxDates).map(posts => {
  //     let map: { [dateId: string]: MarkdownDocEntry } = {};
  //     for (let pm of posts) {
  //       if(isDL()) dl.log(`post metadata = ${pm}`);
  //       let entry = MarkdownEntryUtil.buildFromPostMetadata(pm);
  //       if(isDL()) dl.log(`entry = ${entry}`);
  //       map[entry.id] = entry;
  //     }
  //     this.entryMap = map;
  //     this._isLoaded = true;
  //     return map;
  //   });
  // }

  public buildEntryMap(maxDates: number = 0, endDate: (string | null) = null, oldPosts: (string[] | null) = null): Observable<MarkdownDocEntry[]> {
    if (maxDates == 0) {
      const defMaxDates = 30;
      maxDates = this.appConfig.getNumber("max-post-age", defMaxDates);
    }
    if (oldPosts == null) {
      let oldPostList = this.appConfig.get("old-post-list");
      if (oldPostList) {
        // let opl: string[] = (oldPostList as string[]).slice(0);
        // oldPosts = opl.sort().reverse();
        oldPosts = (oldPostList as string[]).slice(0);
      }
    }
    // if(isDL()) console.dir(oldPosts);
    return this.postListService.getDailyPosts(maxDates, endDate, oldPosts).map(posts => {
      let map: { [dateId: string]: MarkdownDocEntry } = {};
      let list: MarkdownDocEntry[] = [];

      // Note: We assume the list is reverse chronologically ordered.
      let opm: (PostMetadata | null) = null;
      let npm: (PostMetadata | null) = null;
      if (posts && posts.length > 0) {
        let plen = posts.length;
        for (let r = 0; r < plen; r++) {
          let pm = posts[r];
          if (isDL()) dl.log(`post metadata = ${pm}`);
          let entry = MarkdownEntryUtil.buildFromPostMetadata(pm);
          if (r > 0) {
            let nn = r;
            while (--nn >= 0) {
              let npm = posts[nn];
              if (npm.hasContent) {
                entry.newerPostId = npm.dateId;
                break;
              }
            }
          }
          if (r < plen - 1) {
            let oo = r;
            while (++oo < plen) {
              let opm = posts[oo];
              if (opm.hasContent) {
                entry.olderPostId = opm.dateId;
                break;
              }
            }
          }
          if (isDL()) dl.log(`entry = ${entry}`);

          map[entry.id] = entry;
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
