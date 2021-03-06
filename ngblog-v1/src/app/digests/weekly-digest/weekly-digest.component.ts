import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { DateTimeUtil, DateIdUtil, DateRange } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { AppConfigService } from '../../config/app-config.service';
import { BrowserWindowService } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/idle';
import { DateRangeUtil } from '@ngcore/time';

import { MarkdownDocEntry } from '../../entry/markdown-doc-entry';
import { MarkdownEntryUtil } from '../../entry/util/markdown-entry-util';

import { SiteInfo } from '../../common/site-info';
import { ContactInfo } from '../../common/contact-info';

import { defaultSiteInfo } from '../../docs/info/default-site-info';
import { defaultContactInfo } from '../../docs/info/default-contact-info';

import { DailyPostsHelper } from '../../helpers/daily-posts-helper';
import { PostListService } from '../../services/post-list.service';
import { BlogPostService } from '../../services/blog-post.service';
import { BlogPostRegistry } from '../../docs/registry/blog-post-registry';


@Component({
  selector: 'app-weekly-digest',
  templateUrl: './weekly-digest.component.html',
  styleUrls: ['./weekly-digest.component.css']
})
export class WeeklyDigestComponent implements OnInit {
  // TBD:
  // Weekly means (1) rolling 7 days?
  //           or (2) Calendar week???
  dateId: string = '';
  // weekRange: DateRange = new DateRange();
  // weekDates: string[] = [];
  weekDates: { [id: string]: string } = {};

  contactEmail: string = '';
  contactPhone: string = '';
  contactWebsite: string = '';

  siteInfo: SiteInfo;
  contactInfo: ContactInfo;

  docEntries: MarkdownDocEntry[] = [];
  entryLength: number = 0;

  // temporary
  delayInterval: number[] = [250, 750];

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
    private dailyPostsHelper: DailyPostsHelper,
    private postListService: PostListService,
    private blogPostService: BlogPostService,
    private blogPostRegistry: BlogPostRegistry,
  ) {
    this.appConfig = this.appConfigService.appConfig;

    this.siteInfo = new SiteInfo();
    this.contactInfo = new ContactInfo();
  }

  isContentLoaded: boolean = false;
  isEnoughTimePassed: boolean = false;
  ngOnInit() {
    if (isDL()) dl.log(">>> WeeklyDigestComponent::ngOnInit()");


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


    this.dateId = this.activatedRoute.snapshot.params['id'];
    if (isDL()) dl.log(`>>> Week id = ${this.dateId}.`);
    if (!this.dateId) {
      this.dateId = DateIdUtil.getTodayId();
    }
    let dates = DateRangeUtil.getDates(7, DateIdUtil.getNextDayId(this.dateId));
    for (let d of dates) {
      this.weekDates[d] = d;
    }
    if (isDL()) dl.log(Object.keys(this.weekDates));

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

    this.contactEmail = (this.contactInfo.email) ? this.contactInfo.email : '';
    this.contactPhone = (this.contactInfo.phone) ? this.contactInfo.phone : '';
    this.contactWebsite = (this.contactInfo.website) ? this.contactInfo.website : '';
    if (isDL()) dl.log(`>>>>> this.contactEmail = ${this.contactEmail}`);

    // Async.
    this.loadBlogPostEntries();

    // Failsafe.
    Observable.timer(1625).subscribe(o => {
      this.isEnoughTimePassed = true;
    });
  }

  private loadBlogPostEntries() {
    const maxDates = 7;
    let endDate = this.blogPostRegistry.getRangeEndDate(this.dateId);
    const oldPosts: string[] = [];  // It's important to set it to non-null, empty list
    this.blogPostRegistry.buildEntryMap(maxDates, endDate, oldPosts).subscribe(entries => {
      this.docEntries = [];
      // TBD: Need a more efficient algo.
      for (let entry of entries) {
        if (entry.id in this.weekDates) {
          this.docEntries.push(entry);
        }
      }
      if (isDL()) dl.log(this.docEntries);
      this.entryLength = this.docEntries.length;
      this._isEmpty = (this.entryLength == 0);
      if (this._isEmpty) {
        this.placeholderText = 'No posts found';
      }

      // this.isContentLoaded = true;  // This seems to be too quick...
      Observable.timer(335).subscribe(o => {
        this.isContentLoaded = true;
      });
    });
  }

  placeholderText: string = '';
  private _isEmpty: boolean = undefined;
  get isEmpty(): boolean {
    return this._isEmpty;
  }


  // temporary
  get displayContactWebsite(): boolean {
    return !!this.contactWebsite;
  }


  get canDoNextWeek(): boolean {
    let todayId = DateIdUtil.getTodayId();
    return (todayId > this.dateId);
  }
  get canDoNextDay(): boolean {
    let todayId = DateIdUtil.getTodayId();
    return (todayId > this.dateId);
  }
  get canDoPreviousDay(): boolean {
    return true;
  }
  get canDoPreviousWeek(): boolean {
    return true;
  }

  navigateNextWeek() {
    let todayId = DateIdUtil.getTodayId();
    let nextWeekId = DateIdUtil.getNthDayId(this.dateId, 7);
    if (nextWeekId > todayId) {
      nextWeekId = todayId;
    }
    this.router.navigate(['week', nextWeekId]).then(suc => {
      if (isDL()) dl.log(`navigateNextWeek() suc = ${suc}; nextWeekId = ${nextWeekId}`);
    });
  }
  navigateNextDay() {
    let todayId = DateIdUtil.getTodayId();
    let nextDayId = DateIdUtil.getNextDayId(this.dateId);
    if (nextDayId > todayId) {
      nextDayId = todayId;
    }
    this.router.navigate(['week', nextDayId]).then(suc => {
      if (isDL()) dl.log(`navigateNextDay() suc = ${suc}; nextDayId = ${nextDayId}`);
    });
  }
  navigatePreviousDay() {
    let prevDayId = DateIdUtil.getNthDayId(this.dateId, -1);
    this.router.navigate(['week', prevDayId]).then(suc => {
      if (isDL()) dl.log(`navigatePreviousDay() suc = ${suc}; prevDayId = ${prevDayId}`);
    });
  }
  navigatePreviousWeek() {
    let prevWeekId = DateIdUtil.getNthDayId(this.dateId, -7);
    this.router.navigate(['week', prevWeekId]).then(suc => {
      if (isDL()) dl.log(`navigatePreviousWeek() suc = ${suc}; prevWeekId = ${prevWeekId}`);
    });
  }


  get weekDateLabel(): string {
    let endDate = DateIdUtil.convertToDate(this.dateId).toLocaleDateString();
    let startId = DateIdUtil.getNthDayId(this.dateId, -6);
    let startDate = DateIdUtil.convertToDate(startId).toLocaleDateString();
    return `Week of ${startDate} - ${endDate}`;
  }

  private _displayContactEmail: boolean;
  get displayContactEmail(): boolean {
    if (this._displayContactEmail !== true && this._displayContactEmail !== false) {
      let showContactEmail = this.appConfig.getBoolean("show-contact-email", false);
      if (isDL()) dl.log(`>>>>> showContactEmail = ${showContactEmail}`);
      this._displayContactEmail =
        !!(this.contactEmail) // tbd: validate email?
        &&
        this.appConfig.getBoolean("show-contact-email", false);
      if (isDL()) dl.log(`>>>>> this._displayContactEmail = ${this._displayContactEmail}`);
    }
    return this._displayContactEmail;
  }


  openContentPage(idx: number) {
    if (isDL()) dl.log("openContentPage() idx = " + idx);

    let entry = this.docEntries[idx];  // TBD: validate idx ???
    if (isDL()) dl.log("openContentPage() entry = " + entry);

    if (entry.showContent) {
      let dateId = entry.id;

      let permalinkPath = entry.permalinkPath;
      this.router.navigate(['', permalinkPath]).then(suc => {
        if (isDL()) dl.log(`openContentPage() suc = ${suc}; permalinkPath = ${permalinkPath}`);
      });
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
