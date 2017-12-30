import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { LocalStorageService } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/lazy';

import { PostStatus } from '../blog/core/post-status';
import { PostMetadata } from '../blog/post-metadata';
import { PostSummary } from '../blog/post-summary';
import { PostContent } from '../blog/post-content';
import { DailyPostsHelper } from '../helpers/daily-posts-helper';


@Injectable()
export class BlogPostService {

  constructor(
    private localStorageService: LocalStorageService,
    private lazyLoaderService: LazyLoaderService,
    // private dailyPostsHelper: DailyPostsHelper,
  ) { }

  public loadPostMetadata(postUrl: string, useCache = false): Observable<PostMetadata> {
    return this.lazyLoaderService.loadJson(DailyPostsHelper.getInstance().getMetadataUrl(postUrl), useCache).map(obj => {
      let pm = PostMetadata.clone(obj);
      pm.url = postUrl;
      pm.dateId = DailyPostsHelper.getInstance().getDateId(pm.url);
      return pm;
    });
  }

  public loadPostSummary(postUrl: string, useCache = false): Observable<PostSummary> {
    return this.lazyLoaderService.loadText(DailyPostsHelper.getInstance().getSummaryUrl(postUrl), useCache).map(data => {
      let ps = new PostSummary(data);
      ps.url = postUrl;
      return ps;
    }).share();
  }

  public loadPostContent(postUrl: string, useCache = false): Observable<PostContent> {
    return this.lazyLoaderService.loadText(DailyPostsHelper.getInstance().getContentUrl(postUrl), useCache).map(data => {
      let pc = new PostContent(data);
      pc.url = postUrl;
      return pc;
    }).share();
  }


}
