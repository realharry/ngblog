import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';

import { MarkdownDocEntry } from '../../entry/markdown-doc-entry';
import { MarkdownEntryUtil } from '../../entry/util/markdown-entry-util';

import { PostListService } from '../../services/post-list.service';


@Injectable()
export class BlogPostRegistry {

  constructor(
    private appConfig: AppConfig,
    private postListService: PostListService,
    // private localStorageService: LocalStorageService,
    // private lazyLoaderService: LazyLoaderService,
  ) {
    // this.buildEntryMap().subscribe(map => {
    //   console.log("map loaded.");
    // });
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
    if(this.isLoaded) {
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
  //       console.log(`post metadata = ${pm}`);
  //       let entry = MarkdownEntryUtil.buildFromPostMetadata(pm);
  //       console.log(`entry = ${entry}`);
  //       map[entry.id] = entry;
  //     }
  //     this.entryMap = map;
  //     this._isLoaded = true;
  //     return map;
  //   });
  // }

  public buildEntryMap(): Observable<MarkdownDocEntry[]> {
    let maxDates = 30;
    maxDates = this.appConfig.getNumber("max-post-age", maxDates);
    return this.postListService.getDailyPosts(maxDates).map(posts => {
      let map: { [dateId: string]: MarkdownDocEntry } = {};
      let list: MarkdownDocEntry[] = [];
      for (let pm of posts) {
        console.log(`post metadata = ${pm}`);
        let entry = MarkdownEntryUtil.buildFromPostMetadata(pm);
        console.log(`entry = ${entry}`);
        map[entry.id] = entry;
        list.push(entry);
      }
      this.entryMap = map;
      this.entryList = list;
      this._isLoaded = true;
      // return Object.values(map);
      return this.entryList;
    });
  }

}