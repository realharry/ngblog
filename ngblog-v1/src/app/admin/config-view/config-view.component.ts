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


@Component({
  selector: 'app-config-view',
  templateUrl: './config-view.component.html',
  styleUrls: ['./config-view.component.css']
})
export class ConfigViewComponent implements OnInit {

  // @ViewChild("configFileJSON") configFileJSON;
  configFileJSON: string;

  // // temporary
  // hostUrl: string;

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

    // if(this.browserWindowService.window) {
    //   this.hostUrl = this.browserWindowService.window.location.protocol + '//' + this.browserWindowService.window.location.host + '/';
    // } else {
    //   this.hostUrl = '/';   // ???
    // }
    // if(isDL()) dl.log(`hostUrl = ${this.hostUrl}`);

    this.configFileJSON = '';
  }

  ngOnInit() {
    if(isDL()) dl.log(">>> ConfigViewComponent::ngOnInit() >>>")

    // testing
    this.displayConfigJSON();
  }


  private displayConfigJSON() {
    let configData = this.appConfig.all;
    let json = JSON.stringify(configData, null, 2);
    this.configFileJSON = json;
  }


  navigateAdminHome() {
    let qp = {};
    if(this.visitorTokenService.hasVisitorToken) {
      qp = {v: this.visitorTokenService.visitorToken};
    }
    this.router.navigate(['admin'], {queryParams: qp}).then(suc => {
      if(isDL()) dl.log(`navigateAdminHome() suc = ${suc}`);
    });
  }

}
