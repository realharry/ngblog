import { Component, OnInit, OnDestroy, ViewChild, Input, Output } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { AppConfig } from '@ngcore/core';
import { AppConfigService } from '../config/app-config.service';
import { VisitorTokenService } from '../services/visitor-token.service';
import { NgBlogSiteComponent } from '../docs/ngblog-site/ngblog-site.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Harry - NgBlog';

  // @ViewChild("appSetupDoc") appSetupDoc: NgBlogDocComponent;

  paramsSub: any;
  hasValidVisitorToken: boolean = false;

  private appConfig: AppConfig;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private appConfig: AppConfig,
    private appConfigService: AppConfigService,
    private visitorTokenService: VisitorTokenService
  ) {
    this.appConfig = this.appConfigService.appConfig;

    // // testing
    // if(isDL()) dl.log(">>> Loading AppComponent");
    // if(isDL()) dl.log(this.appConfig.all);
    // // // this.appConfigService.appConfig = this.appConfig;
    // // // // this.appConfigService.appConfig = Object.assign({}, this.appConfig);
    // // this.appConfigService.mainConfig = Object.assign({}, this.appConfig);
    // let config = this.appConfigService.appConfig;
    // if(isDL()) dl.log(config.all);
    // // testing
  }

  ngOnInit(): void {
    if(isDL()) dl.log(">>> AppComponent::ngOnInit()");

    // This is needed for pagination.
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.paramsSub = this.activatedRoute.queryParams
    .filter(params => VisitorTokenService.PARAM_VISITOR_TAG in params)
    .subscribe((params: Params) => {
      let v = params[VisitorTokenService.PARAM_VISITOR_TAG];
      if(isDL()) dl.log(`>>> Query param ${VisitorTokenService.PARAM_VISITOR_TAG} = ${v}`);

      // This should be done in the entry component.
      // (And, no need to do this again in the route path component.)
      this.visitorTokenService.visitorToken = v;
      this.hasValidVisitorToken = this.visitorTokenService.hasValidVisitorToken;
    });
  }

  ngAfterViewInit() {
    // this.paramsSub = this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   let a = params['a'];
    //   if(isDL()) dl.log(`a = ${a}`);
    // });

    if(isDevMode()) {
      let dtoken = this.visitorTokenService.getDevToken();
      if(isDL()) dl.log(`>>> Dev token = ${dtoken}`);
    }
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
