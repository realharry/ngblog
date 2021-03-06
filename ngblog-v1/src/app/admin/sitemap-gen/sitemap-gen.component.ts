import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { AppConfigService } from '../../config/app-config.service';
import { BrowserWindowService } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/idle';

import { ChangeFrequency, SiteEntry } from '@ngcore/link';
import { PostListService } from '../../services/post-list.service';
import { SitemapEntryUtil } from '../../sitemap/util/sitemap-entry-util';
import { SitemapEntryRegistry } from '../../sitemap/sitemap-entry-registry';

import { VisitorTokenService } from '../../services/visitor-token.service';


// TBD:
// "Admin" components should really be put in a separate app.
// (At least admin pages should be guarded with auth.)
@Component({
  selector: 'app-sitemap-gen',
  templateUrl: './sitemap-gen.component.html',
  styleUrls: ['./sitemap-gen.component.css']
})
export class SitemapGenComponent implements OnInit {

  // @ViewChild("sitemapXML") sitemapXML;
  sitemapXML: string;

  // temporary
  hostUrl: string;
  siteEntries: SiteEntry[] = [];

  private appConfig: AppConfig;
  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private appConfig: AppConfig,
    private appConfigService: AppConfigService,
    private browserWindowService: BrowserWindowService,
    private lazyLoaderService: LazyLoaderService,
    private sitemapEntryRegistry: SitemapEntryRegistry,
    private visitorTokenService: VisitorTokenService
  ) {
    this.appConfig = this.appConfigService.appConfig;

    if (this.browserWindowService.window) {
      this.hostUrl = this.browserWindowService.window.location.protocol + '//' + this.browserWindowService.window.location.host + '/';
    } else {
      this.hostUrl = '/';   // ???
    }
    if (isDL()) dl.log(`hostUrl = ${this.hostUrl}`);

    this.sitemapXML = '';
  }

  ngOnInit() {
    if (isDL()) dl.log(">>> SitemapGenComponent::ngOnInit() >>>")

    // testing
    this.loadSiteEntries();
  }

  private loadSiteEntries() {
    this.sitemapEntryRegistry.buildEntryMap(this.hostUrl).subscribe(entries => {
      this.siteEntries = [];
      let size = (entries) ? entries.length : 0;
      if (size > 0) {
        for (let i = 0; i < size; i++) {
          let entry = entries[i];
          entry.pagePriority = Math.floor(((size - i) / size) * 10) / 10;  // Arbitrary...
          if (isDL()) dl.log(`>>> entry = ${entry}`);

          this.siteEntries.push(entry);
        }
      }
      if (isDL()) dl.log(">>> siteEntries loaded >>>")
      if (isDL()) dl.log(this.siteEntries);

      this.displaySitemap();
    });
  }

  private buildMainSiteEntryXML(): string {
    let entry = new SiteEntry(
      SitemapEntryUtil.buildAbsoluteUrl(this.hostUrl, '/'),
      DateTimeUtil.getUnixEpochMillis(),
      ChangeFrequency.daily,
      1.0,
      false
    );
    return entry.toXML();
  }

  private buildWeeklyDigestPageXML(): string {
    let entry = new SiteEntry(
      SitemapEntryUtil.buildAbsoluteUrl(this.hostUrl, '/week'),
      DateIdUtil.convertToEpochMillis(DateIdUtil.getYesterdayId()),
      ChangeFrequency.daily,
      0.95,
      true
    );
    // TBD: Include all recent weeks?
    return entry.toXML();
  }
  private buildMonthlyDigestPageXML(): string {
    let entry = new SiteEntry(
      SitemapEntryUtil.buildAbsoluteUrl(this.hostUrl, '/month'),
      DateIdUtil.convertToEpochMillis(DateIdUtil.getNthDayId(DateIdUtil.getTodayId(), -3)),
      ChangeFrequency.daily,
      0.95,
      true
    );
    // TBD: Include all recent months?
    return entry.toXML();
  }

  private buildSitemapXML(): string {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    xml += this.buildMainSiteEntryXML() + '\n';
    xml += this.buildWeeklyDigestPageXML() + '\n';
    xml += this.buildMonthlyDigestPageXML() + '\n';

    for (let entry of this.siteEntries) {
      xml += entry.toXML() + '\n';
    }

    xml += `</urlset>`;
    return xml;
  }
  private displaySitemap() {
    let xml = this.buildSitemapXML();
    this.sitemapXML = xml;
  }


  navigateAdminHome() {
    let qp = {};
    if (this.visitorTokenService.hasVisitorToken) {
      qp = { v: this.visitorTokenService.visitorToken };
    }
    this.router.navigate(['admin'], { queryParams: qp }).then(suc => {
      if (isDL()) dl.log(`navigateAdminHome() suc = ${suc}`);
    });
  }

}
