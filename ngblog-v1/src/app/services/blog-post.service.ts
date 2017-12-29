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


@Injectable()
export class BlogPostService {

  constructor(
    private localStorageService: LocalStorageService,
    private lazyLoaderService: LazyLoaderService,
  ) { }

  public loadPostMetadata(url: string, useCache = false): Observable<PostMetadata> {
    return this.lazyLoaderService.loadJson(url, useCache).map(obj => {
      let pm = PostMetadata.clone(obj);
      pm.url = url;
      return pm;
    });
  }

  public loadPostSummary(url: string, useCache = false): Observable<PostSummary> {
    return this.lazyLoaderService.loadText(url, useCache).map(data => {
      let ps = new PostSummary(data);
      ps.url = url;
      return ps;
    }).share();
  }

  public loadPostContent(url: string, useCache = false): Observable<PostContent> {
    return this.lazyLoaderService.loadText(url, useCache).map(data => {
      let ps = new PostContent(data);
      ps.url = url;
      return ps;
    }).share();
  }


}
