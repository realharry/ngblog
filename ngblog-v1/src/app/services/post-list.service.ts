import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { LocalStorageService } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/lazy';
import { DateRangeUtil } from '@ngcore/time';

import { PostStatus } from '../blog/core/post-status';
import { PostMetadata } from '../blog/post-metadata';
import { DailyPostsHelper } from '../helpers/daily-posts-helper';


@Injectable()
export class PostListService {
  // temporary
  private static DEFAULT_MAX_DATES = 100;
  // private static MAX_POSTS = 100;

  // tbd:
  // Pagination ???


  constructor(
    private localStorageService: LocalStorageService,
    private lazyLoaderService: LazyLoaderService,
    private dailyPostsHelper: DailyPostsHelper,
  ) { }


  // This caching is not entirely safe
  // since the cache can be invalidated simply when the calendar day changes...
  // --> but this should be really good enough for the "frontend" app....
  private cacheKey(dayCount: number, dateId: string): string {
    return dayCount + '-' + dateId;
  }
  private pmCacheMap: {[key: string]: PostMetadata[]} = {};


  // TBD:
  public getDailyPosts(
    dayCount: number = PostListService.DEFAULT_MAX_DATES,
    endDate: (string | null) = null,
    oldPosts: (string[] | null) = null,
    statuses: PostStatus[] = [PostStatus.Posted],
    useCache: boolean = false
  ): Observable<PostMetadata[]> {
    if(!endDate) {
      endDate = DateIdUtil.getTomorrowId();
    }
    let key = this.cacheKey(dayCount, endDate);
    if(key in this.pmCacheMap) {
      return Observable.create(o => {
        let posts = this.pmCacheMap[key];
        o.next(posts);
      }).share();
    } else {
      let urls = this.dailyPostsHelper.getDailyPostUrls(dayCount, endDate, oldPosts);
      if (urls && urls.length > 0) {
        let os: Observable<PostMetadata>[] = [];
        for (let u of urls) {
          let o = this.parsePostMetadata(u, useCache);
          os.push(o);
        }
        // TBD: add some small delay between http calls???
        return Observable.forkJoin(...os).map(data => {
          let pms: PostMetadata[] = [];
          if (data) {
            for (let d of data) {
              console.log(`### d = ${d}`)
              if (d && statuses.indexOf(d.status) != -1) {
                pms.push(d);
              }
            }
          }
          this.pmCacheMap[key] = pms;
          return pms;
        }).share();
      } else {
        return Observable.create(o => {
          let posts: PostMetadata[] = [];
          this.pmCacheMap[key] = posts;   // tbd: error vs empty result???
          o.next(posts);
        }).share();
      }
    }
  }

  // TBD:
  // Allow multiple posts for a single post url/date (post.json).
  private parsePostMetadata(url: string, useCache = false): Observable<(PostMetadata | null)> {
    // return this.lazyLoaderService.loadJson(url, useCache).flatMap(obj => {
    //   return Observable.create(o => {
    //     let pm: (PostMetadata | null) = null;
    //     if (obj) {
    //       pm = PostMetadata.clone(obj);
    //     }
    //     o.next(pm);
    //   });
    // })
    return this.lazyLoaderService.loadJson(DailyPostsHelper.getMetadataUrl(url), useCache)
      .map(obj => {
        let pm: (PostMetadata | null) = null;
        if (obj) {
          pm = PostMetadata.clone(obj);
          if (!pm.url) {   // Is this check necessary or desired????
            pm.url = url;
          }
          pm.dateId = DailyPostsHelper.getDateId(pm.url);
        }
        return pm;
      })
      .catch(err => {
        console.log(`loadJson() error. url = ${url}; err = ${err}`);
        return Observable.of(null);
      });
  }


}
