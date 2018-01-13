import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { AppConfigService } from '../../config/app-config.service';
import { LazyLoaderService } from '@ngcore/idle';
import { PermalinkPathUtil } from '@ngcore/link';
import { CommonMarkUtil } from '@ngcore/mark';
import { CommonMarkEntryComponent } from '@ngcore/mark';

import { SiteInfo } from '../../common/site-info';
import { defaultSiteInfo } from '../info/default-site-info';
import { MarkdownDocEntry } from '../../entry/markdown-doc-entry';
import { MarkdownEntryUtil } from '../../entry/util/markdown-entry-util';
import { VisitorTokenService } from '../../services/visitor-token.service';
import { DailyPostsHelper } from '../../helpers/daily-posts-helper';
import { BlogPostService } from '../../services/blog-post.service';
import { BlogPostRegistry } from '../registry/blog-post-registry';


// TBD:
// Much of its original functionality has been moved to NgBlogPermalinkComponent.
// This class can be now refactored to serve page redirection only.

@Component({
  selector: 'app-ngblog-post',
  templateUrl: './ngblog-post.component.html',
  styleUrls: ['./ngblog-post.component.css']
})
export class NgBlogPostComponent implements OnInit {

  // @ViewChild("commonMarkEntry")
  // commonMarkEntry: CommonMarkEntryComponent;

  siteInfo: SiteInfo;
  docEntry: MarkdownDocEntry;
  // imgPrefix: string;

  private appConfig: AppConfig;
  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private appConfig: AppConfig,
    private appConfigService: AppConfigService,
    private lazyLoaderService: LazyLoaderService,
    private visitorTokenService: VisitorTokenService,
    private dailyPostsHelper: DailyPostsHelper,
    private blogPostService: BlogPostService,
    private blogPostRegistry: BlogPostRegistry,
  ) {
    this.appConfig = this.appConfigService.appConfig;

    this.siteInfo = new SiteInfo();
    this.docEntry = new MarkdownDocEntry();   // ???
    // this.imgPrefix = '';
  }

  ngOnInit() {
    // let config = this.appConfig.all;
    // for (let k in config) {
    //   if(isDL()) dl.log(`:::config::: key = ${k}; value = ${config[k]}`);
    // }

    let dateId = this.activatedRoute.snapshot.params['id'];
    if (isDL()) dl.log(`>>> path id = ${dateId}.`);

    let sInfo = this.appConfig.get('site-info');
    if (sInfo) {
      this.siteInfo.copy(sInfo);
    } else {
      this.siteInfo.copy(defaultSiteInfo);
    }

    // // // testing...
    // // this.imgPrefix = this.dailyPostsHelper.postFolder;
    // let postUrl = this.dailyPostsHelper.getPostUrl(dateId);
    // this.imgPrefix = postUrl;

    let entry = this.blogPostRegistry.getEntry(dateId);
    if (entry) {
      // let permalinkPath = PermalinkPathUtil.getPermalinkPath(entry.id, entry.title, entry.description);
      let permalinkPath = entry.permalinkPath;
      // this.router.navigate(['', permalinkPath], {replaceUrl:true}).then(suc => {
      this.router.navigate([permalinkPath], { replaceUrl: true }).then(suc => {
        if (isDL()) dl.log(`Redirect navigate() suc = ${suc}; permalinkPath = ${permalinkPath}`);
      });

      // this.docEntry = docEntry.clone();
      // this.docEntry = MarkdownDocEntry.copy(this.docEntry, entry);
      // MarkdownDocEntry.copy(this.docEntry, entry);
      this.docEntry.copy(entry);
    } else {
      let postUrl = this.dailyPostsHelper.getPostUrl(dateId);
      let useCache = true;
      this.blogPostService.loadPostMetadata(postUrl, useCache).catch(err => {
        if (isDL()) dl.log(`loadPostMetadata() error. postUrl = ${postUrl}; err = ${err}`);
        return Observable.of(null);
      }).subscribe(pm => {
        if (isDL()) dl.log(`post metadata = ${pm}`);
        if (pm) {
          let entry = MarkdownEntryUtil.buildFromPostMetadata(pm);
          if (isDL()) dl.log(`entry = ${entry}`);

          // let permalinkPath = PermalinkPathUtil.getPermalinkPath(entry.id, entry.title, entry.description);
          let permalinkPath = entry.permalinkPath;
          // this.router.navigate(['', permalinkPath], { replaceUrl: true }).then(suc => {
          this.router.navigate([permalinkPath], { replaceUrl: true }).then(suc => {
            if (isDL()) dl.log(`Redirect navigate() suc = ${suc}; permalinkPath = ${permalinkPath}`);
          });

          // // this.docEntry = entry;
          // // this.docEntry = MarkdownDocEntry.copy(this.docEntry, entry);
          // // MarkdownDocEntry.copy(this.docEntry, entry);
          // this.docEntry.copy(entry);

          // // tbd:
          // // Prepend the summary.md before content.md???

          // let contentUrl = this.docEntry.contentUrl;
          // this.blogPostService.loadPostContentFromContentUrl(contentUrl, true).subscribe(pc => {
          //   if (pc && pc.content) {
          //     this.commonMarkEntry.setMarkdownInput(pc.content, entry.imgPrefix);
          //   } else {
          //     // ???
          //   }
          // });
        } else {
          // ???? What to do ???
          // this.docEntry.clear();
          this.docEntry.id = dateId;
          // ...
        }
      });
    }
    if (isDL()) dl.log(`>>> this.docEntry = ${this.docEntry}`);
  }

  public get header(): string {
    if (this.docEntry.isEmpty) {
      return "Not found";   // tbd.
    } else if (!this.docEntry.title) {
      if (this.docEntry.id) {
        return this.docEntry.id;
      } else {
        return "(Title)";   // tbd.
      }
    } else {
      return this.docEntry.title;
    }
  }


  navigateBack() {
    this.location.back();
  }

  navigateHome() {
    // How to clear history stack???
    // this.location.clear();
    this.router.navigate(['/']).then(suc => {
      if (isDL()) dl.log(`navigate() suc = ${suc}`);
    });
  }

}
