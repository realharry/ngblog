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
  private static MAX_DATES = 100;
  // private static MAX_POSTS = 100;

  // tbd:
  // Pagination ???


  constructor(
    private localStorageService: LocalStorageService,
    private lazyLoaderService: LazyLoaderService,
    private dailyPostsHelper: DailyPostsHelper,
  ) { }


  // TBD:
  public getDailyPosts(
    dayCount: number = PostListService.MAX_DATES,
    dateId: string = DateIdUtil.getTomorrowId(),
    statuses: PostStatus[] = [PostStatus.Posted],
    useCache: boolean = false
  ): Observable<PostMetadata[]> {
    let urls = this.dailyPostsHelper.getDailyPostUrls(dayCount, dateId);
    if (urls && urls.length > 0) {
      let os: Observable<PostMetadata>[] = [];
      for (let u of urls) {
        let o = this.parsePostMetadata(u, useCache);
        os.push(o);
      }
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
        return pms;
      }).share();
    } else {
      return Observable.create(o => {
        let posts: PostMetadata[] = [];
        o.next(posts);
      }).share();
    }
  }

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
    return this.lazyLoaderService.loadJson(this.dailyPostsHelper.getMetadataUrl(url), useCache)
      .map(obj => {
        let pm: (PostMetadata | null) = null;
        if (obj) {
          pm = PostMetadata.clone(obj);
          if (!pm.url) {   // Is this check necessary or desired????
            pm.url = url;
          }
        }
        return pm;
      })
      .catch(err => {
        console.log(`loadJson() error. url = ${url}; err = ${err}`);
        return Observable.of(null);
      });
  }


}
