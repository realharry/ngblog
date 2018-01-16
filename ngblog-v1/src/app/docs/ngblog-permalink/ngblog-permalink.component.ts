import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { AppConfigService } from '../../config/app-config.service';
import { BrowserWindowService } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/idle';
import { PermalinkPathUtil } from '@ngcore/link';
import { CommonMarkUtil } from '@ngcore/mark';
import { CommonMarkEntryComponent } from '@ngcore/mark';

import { SiteInfo } from '../../common/site-info';
import { ContactInfo } from '../../common/contact-info';
import { defaultSiteInfo } from '../info/default-site-info';
import { defaultContactInfo } from '../info/default-contact-info';
import { MarkdownDocEntry } from '../../entry/markdown-doc-entry';
import { MarkdownEntryUtil } from '../../entry/util/markdown-entry-util';
import { VisitorTokenService } from '../../services/visitor-token.service';
import { DailyPostsHelper } from '../../helpers/daily-posts-helper';
import { BlogPostService } from '../../services/blog-post.service';
import { BlogPostRegistry } from '../registry/blog-post-registry';
import { DisqusCommentComponent } from '../../comments/disqus/disqus-comment.component';


@Component({
  selector: 'app-ngblog-permalink',
  templateUrl: './ngblog-permalink.component.html',
  styleUrls: ['./ngblog-permalink.component.css']
})
export class NgBlogPermalinkComponent implements OnInit {

  @ViewChild("commonMarkEntry")
  commonMarkEntry: CommonMarkEntryComponent;

  contactWebsite: string = '';

  siteInfo: SiteInfo;
  contactInfo: ContactInfo;
  docEntry: MarkdownDocEntry;
  // imgPrefix: string;

  // temporary
  hostUrl: string;
  pageUrl: string;   // Should be the same as the permalink.
  emailSubject: string;
  emailBody: string;

  pageLinkPrefix: string = '';

  // temporary
  maxRetries: number = 1;
  retryInterval: number = 725;

  private appConfig: AppConfig;
  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private appConfig: AppConfig,
    private appConfigService: AppConfigService,
    private browserWindowService: BrowserWindowService,
    private lazyLoaderService: LazyLoaderService,
    private visitorTokenService: VisitorTokenService,
    private dailyPostsHelper: DailyPostsHelper,
    private blogPostService: BlogPostService,
    private blogPostRegistry: BlogPostRegistry,
  ) {
    this.appConfig = this.appConfigService.appConfig;

    if (this.browserWindowService.window) {
      this.hostUrl = this.browserWindowService.window.location.protocol + '//' + this.browserWindowService.window.location.host + '/';
      this.pageUrl = this.browserWindowService.window.location.href;
    } else {
      this.hostUrl = '/';   // ???
      this.pageUrl = '';    // ???
    }
    if (isDL()) dl.log(`hostUrl = ${this.hostUrl}; pageUrl = ${this.pageUrl}`);

    this.emailSubject = this.pageUrl;
    this.emailBody = this.emailSubject;

    this.siteInfo = new SiteInfo();
    this.contactInfo = new ContactInfo();

    this.docEntry = new MarkdownDocEntry();   // ???
    // this.imgPrefix = '';
  }

  get isRunningInBrowser(): boolean {
    return !!(this.browserWindowService.window);
  }
  get isDisqusEnabled(): boolean {
    // Return false if the page does not content.md ???
    if (!this.docEntry || !this.docEntry.contentUrl) {  // page does not exist? 
      return false;
    }
    return (this.browserWindowService.window) && this.appConfigService.enableDisqusComment;
  }
  get disqusPageIdentifier(): string {
    return (this.pageLinkPrefix) ? this.pageLinkPrefix
      : ((this.docEntry && this.docEntry.id) ? this.docEntry.id
        : 'post');   // ????
  }

  isContentLoaded: boolean = false;
  isEnoughTimePassed: boolean = false;
  ngOnInit() {
    if (isDL()) dl.log(">>> NgBlogPermalinkComponent::ngOnInit()");


    // Experimenting....
    // Routing trick with hash tags
    if (this.appConfigService.useHashLinkRedirect) {
      let pagePath = this.router.url;
      if (pagePath) {
        let h = pagePath.indexOf('#');
        if (h != -1) {
          pagePath = pagePath.substring(0, h);
        }
      }
      if (isDL()) dl.log(`>>> pagePath = ${pagePath}`);
      this.pageLinkPrefix = pagePath;

      this.activatedRoute.fragment.subscribe(fragment => {
        if (isDL()) dl.log(`>>> fragment = ${fragment}`);
        if (fragment) {
          // Treating the fragment as the redirect url path.
          // let redirectPath = decodeURIComponent(fragment);
          let redirectPath = fragment;
          let segments = fragment.split('/');
          Observable.timer(1).subscribe(i => {
            this.router.navigate(segments, { replaceUrl: true }).then(suc => {
              if (isDL()) dl.log(`Redirect navigate() suc = ${suc}; fragment-path = ${redirectPath}`);
            }).catch(err => {
              if (isDL()) dl.log(`Redirect navigate() err = ${err}}`);
            });
          });
        }
      });
    }
    // Routing trick with hash tags


    // let config = this.appConfig.all;
    // for (let k in config) {
    //   if(isDL()) dl.log(`:::config::: key = ${k}; value = ${config[k]}`);
    // }

    let sInfo = this.appConfig.get('site-info');
    if (sInfo) {
      this.siteInfo.copy(sInfo);
    } else {
      this.siteInfo.copy(defaultSiteInfo);
    }

    let cInfo = this.appConfig.get('contact-info');
    if (cInfo) {
      this.contactInfo.copy(cInfo);
    } else {
      this.contactInfo.copy(defaultContactInfo);
    }
    this.contactWebsite = (this.contactInfo.website) ? this.contactInfo.website : '';

    // TBD:
    // If the path is not the exact permalink,
    //    redirect to the permalink (canonical url) ????
    let permalinkPath = this.activatedRoute.snapshot.params['path'];
    let dateId = PermalinkPathUtil.getUniqueId(permalinkPath);
    if (isDL()) dl.log(`>>> date id = ${dateId}; permalinkPath = ${permalinkPath}`);
    // tbd
    // let canonialPath = PermalinkPathUtil.getPermalinkPath(entry.id, entry.title, entry.description);
    // compare canonicalPath with the input param path ????
    // ...

    // // // testing...
    // // this.imgPrefix = this.dailyPostsHelper.postFolder;
    // let postUrl = this.dailyPostsHelper.getPostUrl(dateId);
    // this.imgPrefix = postUrl;

    let entry = this.blogPostRegistry.getEntry(dateId);

    if (entry) {
      if (isDL()) dl.log(`>>> entry found in blogPostRegistry for dateId = ${dateId}`);

      // this.docEntry = docEntry.clone();
      // this.docEntry = MarkdownDocEntry.copy(this.docEntry, entry);
      // MarkdownDocEntry.copy(this.docEntry, entry);
      this.docEntry.copy(entry);
      this.emailSubject = encodeURIComponent(entry.title + ': ' + this.pageUrl);
      this.emailBody = encodeURIComponent(entry.title + ' - ' + entry.description + '\n' + this.pageUrl + '\n\n');

      // For article navigation
      if (this.docEntry.newerPostId) {
        this._newerArticleId = this.docEntry.newerPostId;
      } else {
        // tbd:
        // need to check if the newer post with content exists..
        // And, update this._newerArticleId.
        // ....
      }
      if (this.docEntry.olderPostId) {
        this._olderArticleId = this.docEntry.olderPostId;
      } else {
        // tbd:
        // need to check if the older post with content exists..
        // And, update this._olderArticleId.
        // ....
      }
      // For article navigation

      // //testing
      // entry.debugEnabled = true;
      // //testing

      // this.isContentLoaded = true;  // This seems to be too quick...
      Observable.timer(335).subscribe(o => {
        this.isContentLoaded = true;
      });
    } else {
      if (isDL()) dl.log(`>>> entry NOT found in blogPostRegistry for dateId = ${dateId}`);

      let postUrl = this.dailyPostsHelper.getPostUrl(dateId);
      let useCache = true;
      this.blogPostService.loadPostMetadata(postUrl, useCache).catch(err => {
        if (isDL()) dl.log(`loadPostMetadata() error. postUrl = ${postUrl}; err = ${err}`);

        // this.isContentLoaded = true;  // ???
        return Observable.of(null);
      }).subscribe(pm => {
        if (isDL()) dl.log(`post metadata = ${pm}`);
        if (pm) {
          let entry = MarkdownEntryUtil.buildFromPostMetadata(pm);
          if (isDL()) dl.log(`entry = ${entry}`);
          // this.docEntry = entry;
          // this.docEntry = MarkdownDocEntry.copy(this.docEntry, entry);
          // MarkdownDocEntry.copy(this.docEntry, entry);
          this.docEntry.copy(entry);
          this.emailSubject = encodeURIComponent(entry.title + ': ' + this.pageUrl);
          this.emailBody = encodeURIComponent(entry.title + ' - ' + entry.description + '\n' + this.pageUrl + '\n\n');

          // For article navigation
          if (this.docEntry.newerPostId) {
            this._newerArticleId = this.docEntry.newerPostId;
          } else {
            // tbd:
            // need to check if the newer post with content exists..
            // And, update this._newerArticleId.
            // ....
          }
          if (this.docEntry.olderPostId) {
            this._olderArticleId = this.docEntry.olderPostId;
          } else {
            // tbd:
            // need to check if the older post with content exists..
            // And, update this._olderArticleId.
            // ....
          }
          // For article navigation

          // //testing
          // entry.debugEnabled = true;
          // //testing

          // tbd:
          // Prepend the summary.md before content.md???

          let contentUrl = this.docEntry.contentUrl;
          if (contentUrl) {
            this.blogPostService.loadPostContentFromContentUrl(contentUrl, true).subscribe(pc => {
              if (pc && pc.content) {
                //testing
                // this.commonMarkEntry.setMarkdownInput(pc.content, entry.imgPrefix, true);
                // this.commonMarkEntry.setMarkdownInput(pc.content, entry.imgPrefix);
                this.commonMarkEntry.setMarkdownContent(pc.content, entry.imgPrefix, this.pageLinkPrefix, '', true);
                // this.commonMarkEntry.setMarkdownContent(pc.content, entry.imgPrefix, this.pageLinkPrefix);
                //testing
              } else {
                // ???
                // Keep the empy content. Nothing to do. ??
              }

              // this.isContentLoaded = true;  // This seems to be too quick...
              Observable.timer(335).subscribe(o => {
                this.isContentLoaded = true;
              });
            });
          } else {
            // this.isContentLoaded = true;  // This seems to be too quick...
            Observable.timer(335).subscribe(o => {
              this.isContentLoaded = true;
            });
          }
        } else {
          // ???? This should not happen.
          // this.docEntry.clear();
          this.docEntry.id = dateId;
          // ...

          // this.isContentLoaded = true;  // This seems to be too quick...
          Observable.timer(335).subscribe(o => {
            this.isContentLoaded = true;
          });
        }

        // this.isContentLoaded = true;
      });
    }
    if (isDL()) dl.log(`>>> this.docEntry = ${this.docEntry}`);

    // Failsafe.
    Observable.timer(1625).subscribe(o => {
      this.isEnoughTimePassed = true;
    });
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


  // temporary
  get displayContactWebsite(): boolean {
    return !!this.contactWebsite;
  }


  private _showShareViaEmail: boolean;
  get showShareViaEmail(): boolean {
    if (this._showShareViaEmail !== true && this._showShareViaEmail !== false) {
      this._showShareViaEmail = this.appConfig.getBoolean("show-share-via-email", false);
    }
    return this._showShareViaEmail;
  }

  private _showShareOnTwitter: boolean;
  get showShareOnTwitter(): boolean {
    if (this._showShareOnTwitter !== true && this._showShareOnTwitter !== false) {
      this._showShareOnTwitter = this.appConfig.getBoolean("show-share-on-twitter", false);
    }
    return this._showShareOnTwitter;
  }

  private _showShareOnFacebook: boolean;
  get showShareOnFacebook(): boolean {
    if (this._showShareOnFacebook !== true && this._showShareOnFacebook !== false) {
      this._showShareOnFacebook = this.appConfig.getBoolean("show-share-on-facebook", false);
    }
    return this._showShareOnFacebook;
  }

  private _showShareOnLinkedIn: boolean;
  get showShareOnLinkedIn(): boolean {
    if (this._showShareOnLinkedIn !== true && this._showShareOnLinkedIn !== false) {
      this._showShareOnLinkedIn = this.appConfig.getBoolean("show-share-on-linkedin", false);
    }
    return this._showShareOnLinkedIn;
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


  // For post/article navigation
  // Note that the navigation is only among the posts with hasContent == true.

  private _newerArticleId: (string | null) = null;
  get hasNewerArticle(): boolean {
    return !!(this._newerArticleId);
  }
  openNewerArticle() {
    if (this._newerArticleId) {
      this.router.navigate(['post', this._newerArticleId]).then(suc => {
        if (isDL()) dl.log(`openNewerArticle() suc = ${suc}`);
      });
    }
  }

  private _olderArticleId: (string | null) = null;
  get hasOlderArticle(): boolean {
    return !!(this._olderArticleId);
  }
  openOlderArticle() {
    if (this._olderArticleId) {
      this.router.navigate(['post', this._olderArticleId]).then(suc => {
        if (isDL()) dl.log(`openOlderArticle() suc = ${suc}`);
      });
    }
  }


}
