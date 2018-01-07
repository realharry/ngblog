import { Component, OnInit, OnDestroy, ViewChild, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { BrowserWindowService } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/idle';

import { VisitorTokenService } from '../../services/visitor-token.service';


@Component({
  selector: 'app-amdin-panel',
  templateUrl: './amdin-panel.component.html',
  styleUrls: ['./amdin-panel.component.css']
})
export class AmdinPanelComponent implements OnInit {

  paramsSub: any;
  hasValidAdminToken: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appConfig: AppConfig,
    private browserWindowService: BrowserWindowService,
    private lazyLoaderService: LazyLoaderService,
    private visitorTokenService: VisitorTokenService
  ) {
  }

  ngOnInit(): void {
    console.log(">>> AmdinPanelComponent::ngOnInit()");

    // This is needed for pagination.
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.paramsSub = this.activatedRoute.queryParams
    .filter(params => VisitorTokenService.PARAM_VISITOR_TAG in params)
    .subscribe((params: Params) => {
      let v = params[VisitorTokenService.PARAM_VISITOR_TAG];
      console.log(`>>> Query param ${VisitorTokenService.PARAM_VISITOR_TAG} = ${v}`);

      this.visitorTokenService.visitorToken = v;
      this.hasValidAdminToken = this.visitorTokenService.hasValidAdminToken;
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }


  navigateHome() {
    this.router.navigate(['/']).then(suc => {
      console.log(`navigateHome() suc = ${suc}`);
    });
  }

  navigatePostWriter() {
    let qp = {};
    if(this.visitorTokenService.hasVisitorToken) {
      qp = {v: this.visitorTokenService.visitorToken};
    }
    this.router.navigate(['writer'], {queryParams: qp}).then(suc => {
      console.log(`navigatePostWriter() suc = ${suc}`);
    });
  }
  navigateSitemapGenerator() {
    let qp = {};
    if(this.visitorTokenService.hasVisitorToken) {
      qp = {v: this.visitorTokenService.visitorToken};
    }
    this.router.navigate(['sitemaps'], {queryParams: qp}).then(suc => {
      console.log(`navigateSitemapGenerator() suc = ${suc}`);
    });
  }
  
}
