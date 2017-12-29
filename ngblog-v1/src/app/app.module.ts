import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';

import { NgCoreCoreModule } from '@ngcore/core';
import { NgCoreBaseModule } from '@ngcore/base';
import { NgCoreLazyModule } from '@ngcore/lazy';
import { NgCoreMarkModule } from '@ngcore/mark';
import { NgCoreTimeModule } from '@ngcore/time';

import { MaterialComponentsModule } from './material-components.module';

import { AccordionUiHelper } from './helpers/accordion-ui-helper';
import { DailyPostsHelper } from './helpers/daily-posts-helper';
import { VisitorTokenRegistry } from './visitors/visitor-token-registry';
import { GuestbookDataService } from './services/guestbook-data.service';
import { VisitorTokenService } from './services/visitor-token.service';
import { BlogPostService } from './services/blog-post.service';
import { PostListService } from './services/post-list.service';

import { AppComponent } from './app.component';
import { NgBlogSiteComponent } from './docs/ngblog-site/ngblog-site.component';
import { DetailDialogComponent } from './docs/detail-dialog/detail-dialog.component';
import { NgBlogPostComponent } from './docs/ngblog-post/ngblog-post.component';


@NgModule({
  declarations: [
    AppComponent,
    NgBlogSiteComponent,
    DetailDialogComponent,
    NgBlogPostComponent
  ],
  imports: [
    BrowserModule,
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
    NgCoreCoreModule.forRoot(),
    NgCoreBaseModule.forRoot(),
    NgCoreLazyModule.forRoot(),
    NgCoreMarkModule.forRoot(),
    NgCoreTimeModule.forRoot(),
    MaterialComponentsModule,
  ],
  entryComponents: [
    // AppComponent,
    DetailDialogComponent
  ],
  providers: [
    AccordionUiHelper,
    VisitorTokenRegistry,
    GuestbookDataService,
    VisitorTokenService,
    DailyPostsHelper,
    BlogPostService,
    PostListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('my-dark-theme');
  }
}
