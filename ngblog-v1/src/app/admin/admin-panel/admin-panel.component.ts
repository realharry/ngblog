import { Component, OnInit, OnDestroy, ViewChild, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { AppConfigService } from '../../config/app-config.service';
import { BrowserWindowService } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/idle';

import { VisitorTokenService } from '../../services/visitor-token.service';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  paramsSub: any;
  hasValidAdminToken: boolean = false;

  private appConfig: AppConfig;
  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private appConfig: AppConfig,
    private appConfigService: AppConfigService,
    private browserWindowService: BrowserWindowService,
    private lazyLoaderService: LazyLoaderService,
    private visitorTokenService: VisitorTokenService
  ) {
    this.appConfig = this.appConfigService.appConfig;
  }

  ngOnInit(): void {
    if (isDL()) dl.log(">>> AdminPanelComponent::ngOnInit()");

    // This is needed for pagination.
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.paramsSub = this.activatedRoute.queryParams
      .filter(params => VisitorTokenService.PARAM_VISITOR_TAG in params)
      .subscribe((params: Params) => {
        let v = params[VisitorTokenService.PARAM_VISITOR_TAG];
        if (isDL()) dl.log(`>>> Query param ${VisitorTokenService.PARAM_VISITOR_TAG} = ${v}`);

        this.visitorTokenService.visitorToken = v;
        this.hasValidAdminToken = this.visitorTokenService.hasValidAdminToken;
      });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }


  navigateHome() {
    this.router.navigate(['/']).then(suc => {
      if (isDL()) dl.log(`navigateHome() suc = ${suc}`);
    });
  }

  navigatePostWriter() {
    let qp = {};
    if (this.visitorTokenService.hasVisitorToken) {
      qp = { v: this.visitorTokenService.visitorToken };
    }
    this.router.navigate(['admin/writer'], { queryParams: qp }).then(suc => {
      if (isDL()) dl.log(`navigatePostWriter() suc = ${suc}`);
    });
  }
  navigateSitemapGenerator() {
    let qp = {};
    if (this.visitorTokenService.hasVisitorToken) {
      qp = { v: this.visitorTokenService.visitorToken };
    }
    this.router.navigate(['admin/sitemaps'], { queryParams: qp }).then(suc => {
      if (isDL()) dl.log(`navigateSitemapGenerator() suc = ${suc}`);
    });
  }
  navigateConfigView() {
    let qp = {};
    if (this.visitorTokenService.hasVisitorToken) {
      qp = { v: this.visitorTokenService.visitorToken };
    }
    this.router.navigate(['admin/config'], { queryParams: qp }).then(suc => {
      if (isDL()) dl.log(`navigateConfigView() suc = ${suc}`);
    });
  }

}
