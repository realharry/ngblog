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

  // Note that "useCache" is used on the server-side.
  // These caches have nothing to do with useCache.
  private pmCache: { [postUrl: string]: PostMetadata } = {};
  private psCache: { [postUrl: string]: PostSummary } = {};
  private pcCache: { [postUrl: string]: PostContent } = {};

  public loadPostMetadataFromMetadataUrl(metadataUrl: string, useCache = false): Observable<PostMetadata> {
    return this.loadPostMetadata(DailyPostsHelper.getInstance().getPostUrlFromMetadataUrl(metadataUrl));
  }
  public loadPostMetadata(postUrl: string, useCache = false): Observable<PostMetadata> {
    if (postUrl in this.pmCache) {
      return Observable.create(o => {
        let pm = this.pmCache[postUrl];
        o.next(pm);
      }).share();
    } else {
      return this.lazyLoaderService.loadJson(DailyPostsHelper.getInstance().getMetadataUrl(postUrl), useCache).map(obj => {
        let pm = PostMetadata.clone(obj);
        pm.url = postUrl;
        pm.dateId = DailyPostsHelper.getInstance().getDateId(pm.url);
        return pm;
      });
    }
  }

  public loadPostSummaryFromSummaryUrl(summaryUrl: string, useCache = false): Observable<PostSummary> {
    return this.loadPostSummary(DailyPostsHelper.getInstance().getPostUrlFromSummaryUrl(summaryUrl));
  }
  public loadPostSummary(postUrl: string, useCache = false): Observable<PostSummary> {
    if (postUrl in this.psCache) {
      return Observable.create(o => {
        let ps = this.psCache[postUrl];
        o.next(ps);
      }).share();
    } else {
      return this.lazyLoaderService.loadText(DailyPostsHelper.getInstance().getSummaryUrl(postUrl), useCache).map(data => {
        let ps = new PostSummary(data);
        ps.url = postUrl;
        return ps;
      }).share();
    }
  }

  public loadPostContentFromContentUrl(contentUrl: string, useCache = false): Observable<PostContent> {
    return this.loadPostContent(DailyPostsHelper.getInstance().getPostUrlFromContentUrl(contentUrl));
  }
  public loadPostContent(postUrl: string, useCache = false): Observable<PostContent> {
    if (postUrl in this.pcCache) {
      return Observable.create(o => {
        let pc = this.pcCache[postUrl];
        o.next(pc);
      }).share();
    } else {
      return this.lazyLoaderService.loadText(DailyPostsHelper.getInstance().getContentUrl(postUrl), useCache).map(data => {
        let pc = new PostContent(data);
        pc.url = postUrl;
        return pc;
      }).share();
    }
  }

}
