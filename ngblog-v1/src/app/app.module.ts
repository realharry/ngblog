import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { OverlayContainer } from '@angular/cdk/overlay';

import { NgCoreCoreModule } from '@ngcore/core';
import { NgCoreBaseModule } from '@ngcore/base';
// import { NgCoreHuesModule } from '@ngcore/hues';
import { NgCoreIdleModule } from '@ngcore/idle';
import { NgCoreLinkModule } from '@ngcore/link';
import { NgCoreMarkModule } from '@ngcore/mark';
import { NgCoreTimeModule } from '@ngcore/time';

import { AppConfig } from '@ngcore/core';

import { environment } from '../environments/environment';

import { MaterialComponentsModule } from './material-components.module';

import { PageAccordionUiHelper } from './helpers/page-accordion-ui-helper';
import { DailyPostsHelper } from './helpers/daily-posts-helper';
import { VisitorTokenRegistry } from './visitors/visitor-token-registry';
import { GuestbookDataService } from './services/guestbook-data.service';
import { VisitorTokenService } from './services/visitor-token.service';
import { BlogPostService } from './services/blog-post.service';
import { PostListService } from './services/post-list.service';
import { BlogPostRegistry } from './docs/registry/blog-post-registry';
import { SitemapEntryRegistry } from './sitemap/sitemap-entry-registry';

import { AppComponent } from './app.component';
import { NgBlogSiteComponent } from './docs/ngblog-site/ngblog-site.component';
import { NgBlogPostComponent } from './docs/ngblog-post/ngblog-post.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

import { AppRoutingModule } from './app-routing.module';
import { SitemapGenComponent } from './admin/sitemap-gen/sitemap-gen.component';
import { PostWriterComponent } from './admin/post-writer/post-writer.component';


@NgModule({
  declarations: [
    AppComponent,
    NgBlogSiteComponent,
    NgBlogPostComponent,
    NotFoundComponent,
    SitemapGenComponent,
    PostWriterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    HttpModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot([
      // {
      //   path: '',
      //   component: AppComponent
      // }
      {
        path: '',
        pathMatch: 'full',
        component: NgBlogSiteComponent
      }
    ]),
    AppRoutingModule,
    NgCoreCoreModule.forRoot(),
    NgCoreBaseModule.forRoot(),
    // NgCoreHuesModule.forRoot(),
    NgCoreIdleModule.forRoot(),
    NgCoreLinkModule.forRoot(),
    NgCoreMarkModule.forRoot(),
    NgCoreTimeModule.forRoot(),
    MaterialComponentsModule,
  ],
  entryComponents: [
    // AppComponent,
  ],
  providers: [
    AppConfig,
    // { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load().then(o => { console.log("App config loaded."); }), deps: [AppConfig], multi: true },
    PageAccordionUiHelper,
    VisitorTokenRegistry,
    GuestbookDataService,
    VisitorTokenService,
    DailyPostsHelper,
    BlogPostService,
    PostListService,
    BlogPostRegistry,
    SitemapEntryRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private overlayContainer: OverlayContainer,
  ) {
    overlayContainer.getContainerElement().classList.add('my-dark-theme');
  }
}
