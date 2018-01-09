import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { DateTimeUtil, DateIdUtil, DateRange } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
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

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appConfig: AppConfig,
    private browserWindowService: BrowserWindowService,
    private lazyLoaderService: LazyLoaderService,
    private dailyPostsHelper: DailyPostsHelper,
    private postListService: PostListService,
    private blogPostService: BlogPostService,
    private blogPostRegistry: BlogPostRegistry,
  ) {
    this.siteInfo = new SiteInfo();
    this.contactInfo = new ContactInfo();
  }

  ngOnInit() {
    this.dateId = this.activatedRoute.snapshot.params['id'];
    if (isDL()) dl.log(`>>> Week id = ${this.dateId}.`);
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
  }

  private loadBlogPostEntries() {
    this.blogPostRegistry.buildEntryMap().subscribe(entries => {
      this.docEntries = [];
      // TBD: Need a more efficient algo.
      for (let entry of entries) {
        if (entry.id in this.weekDates) {
          this.docEntries.push(entry);
        }
      }
      if (isDL()) dl.log(this.docEntries);
      this.entryLength = this.docEntries.length;
    });
  }

  get isEmpty(): boolean {
    return (this.entryLength == 0);
  }


  get canDoNextWeek(): boolean {
    let todayId = DateIdUtil.getTodayId();
    return (todayId > this.dateId);
  }

  get canDoPreviousWeek(): boolean {
    return true;
  }

  navigateNextWeek() {
    let todayId = DateIdUtil.getTodayId();
    let nextWeekId = DateIdUtil.getNthDayId(this.dateId, 7);
    if(nextWeekId > todayId) {
      nextWeekId = todayId;
    }
    this.router.navigate(['weekly', nextWeekId]).then(suc => {
      if (isDL()) dl.log(`navigateNextWeek() suc = ${suc}; nextWeekId = ${nextWeekId}`);
    });
  }

  navigatePreviousWeek() {
    let prevWeekId = DateIdUtil.getNthDayId(this.dateId, -7);
    this.router.navigate(['weekly', prevWeekId]).then(suc => {
      if (isDL()) dl.log(`navigatePreviousWeek() suc = ${suc}; prevWeekId = ${prevWeekId}`);
    });
  }


  get weekDate(): string {
    return DateIdUtil.getISODateString(this.dateId, true);
    // return DateIdUtil.convertToDate(this.dateId).toLocaleDateString();
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


  navigateHome() {
    // How to clear history stack???
    // this.location.clear();
    this.router.navigate(['/']).then(suc => {
      if (isDL()) dl.log(`navigate() suc = ${suc}`);
    });
  }

}
