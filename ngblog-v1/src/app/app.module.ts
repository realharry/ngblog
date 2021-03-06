import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { OverlayContainer } from '@angular/cdk/overlay';

import { NgCoreCoreModule } from '@ngcore/core';
import { NgCoreBaseModule } from '@ngcore/base';
import { NgCoreDataModule } from '@ngcore/data';
// import { NgCoreHuesModule } from '@ngcore/hues';
import { NgCoreIdleModule } from '@ngcore/idle';
import { NgCoreLinkModule } from '@ngcore/link';
import { NgCoreMarkModule } from '@ngcore/mark';
import { NgCoreNoteModule } from '@ngcore/note';
import { NgCoreTimeModule } from '@ngcore/time';

// import { ShareModule } from '@ngx-share/core';
// import { MaterialComponentsModule } from './material-components.module';
import { CoreModule } from './core/core.module';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { AppConfig } from '@ngcore/core';
import { AppConfigService } from './config/app-config.service';

import { environment } from '../environments/environment';

// import { AppConfigService } from './config/app-config.service';
// import { PageAccordionUiHelper } from './helpers/page-accordion-ui-helper';
// import { DailyPostsHelper } from './helpers/daily-posts-helper';
// import { VisitorTokenRegistry } from './visitors/visitor-token-registry';
// import { GuestbookDataService } from './services/guestbook-data.service';
// import { VisitorTokenService } from './services/visitor-token.service';
// import { BlogPostService } from './services/blog-post.service';
// import { PostListService } from './services/post-list.service';
// import { BlogPostRegistry } from './docs/registry/blog-post-registry';
// import { SitemapEntryRegistry } from './sitemap/sitemap-entry-registry';
// import { AdminSentinelService } from './admin/sentinels/admin-sentinel.service';

import { AppComponent } from './main/app.component';
import { RedirectSiteComponent } from './docs/redirect-site/redirect-site.component';
import { NgBlogSiteComponent } from './docs/ngblog-site/ngblog-site.component';
// import { NgBlogPostComponent } from './docs/ngblog-post/ngblog-post.component';
// import { NgBlogPermalinkComponent } from './docs/ngblog-permalink/ngblog-permalink.component';
// import { NotFoundComponent } from './errors/not-found/not-found.component';

import { AppRoutingModule } from './app-routing.module';
// import { SitemapGenComponent } from './admin/sitemap-gen/sitemap-gen.component';
// import { PostWriterComponent } from './admin/post-writer/post-writer.component';
// import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
// import { ConfigViewComponent } from './admin/config-view/config-view.component';
// import { WeeklyDigestComponent } from './digests/weekly-digest/weekly-digest.component';
// import { MonthlyDigestComponent } from './digests/monthly-digest/monthly-digest.component';



// We can potentially load config files from a remote server.
var configFileUrl: string;
if (environment.production) {
  configFileUrl = 'configs/app-config.json';
} else {
  configFileUrl = 'configs/app-config.dev.json';
}

export function loadAppConfig(config: AppConfig) {
  return () => {
    config.setConfigFile(configFileUrl);
    return config.load().then(o => {
      console.log("App config loaded.");
    });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NgBlogSiteComponent,
    RedirectSiteComponent,
    // NgBlogPostComponent,
    // NgBlogPermalinkComponent,
    // NotFoundComponent,
    // SitemapGenComponent,
    // PostWriterComponent,
    // AdminPanelComponent,
    // ConfigViewComponent,
    // WeeklyDigestComponent,
    // MonthlyDigestComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule, HttpClientJsonpModule,
    HttpModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule.forRoot(),
    NgCoreCoreModule.forRoot(),
    NgCoreBaseModule.forRoot(),
    NgCoreDataModule.forRoot(),
    // NgCoreHuesModule.forRoot(),
    NgCoreIdleModule.forRoot(),
    NgCoreLinkModule.forRoot(),
    NgCoreMarkModule.forRoot(),
    NgCoreNoteModule.forRoot(),
    NgCoreTimeModule.forRoot(),
    // ShareModule.forRoot(),
    // MaterialComponentsModule,
    CoreModule.forRoot(),
  ],
  entryComponents: [
    // AppComponent,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    // TBD:
    // Why is AppConfig not shared in lazy-loaded modules ????
    // As a workaround, we reload appConfig in every lazy-loaded module.
    // But, this does not always work (because it's async loading).
    //   --> Need to fix this.
    AppConfig,
    // {
    //   provide: APP_INITIALIZER, useFactory:
    //     (config: AppConfig) => () => config.load().then(o => { console.log("App config loaded."); }),
    //   deps: [AppConfig], multi: true
    // },
    { provide: APP_INITIALIZER, useFactory: loadAppConfig, deps: [AppConfig], multi: true },

    // AppConfigService,

    // PageAccordionUiHelper,
    // VisitorTokenRegistry,
    // GuestbookDataService,
    // VisitorTokenService,
    // DailyPostsHelper,
    // BlogPostService,
    // PostListService,
    // BlogPostRegistry,
    // SitemapEntryRegistry,
    // AdminSentinelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string,
    // private appConfig: AppConfig,
    private overlayContainer: OverlayContainer,
  ) {
    // if(isDL()) dl.log(">>> Loading AppModule");
    // if(isDL()) dl.log(this.appConfig.all);

    // For debugging only.
    if (isDL()) {
      const platform = isPlatformBrowser(platformId) ?
        'in the browser' : 'on the server';
      dl.log(`Running ${platform} with appId=${appId}`);
    }

    overlayContainer.getContainerElement().classList.add('my-dark-theme');
  }
}
