import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule, Routes } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';

import { NgCoreCoreModule } from '@ngcore/core';
import { NgCoreBaseModule } from '@ngcore/base';
import { NgCoreIdleModule } from '@ngcore/idle';
import { NgCoreLinkModule } from '@ngcore/link';
import { NgCoreMarkModule } from '@ngcore/mark';
import { NgCoreNoteModule } from '@ngcore/note';
import { NgCoreTimeModule } from '@ngcore/time';

import { MaterialComponentsModule } from '../material-components.module';

import { AppConfigService } from '../config/app-config.service';
import { PageAccordionUiHelper } from '../helpers/page-accordion-ui-helper';
import { DailyPostsHelper } from '../helpers/daily-posts-helper';
import { VisitorTokenRegistry } from '../visitors/visitor-token-registry';
import { GuestbookDataService } from '../services/guestbook-data.service';
import { VisitorTokenService } from '../services/visitor-token.service';
import { BlogPostService } from '../services/blog-post.service';
import { PostListService } from '../services/post-list.service';
import { BlogPostRegistry } from '../docs/registry/blog-post-registry';
import { SitemapEntryRegistry } from '../sitemap/sitemap-entry-registry';

import { DisqusCommentComponent } from '../comments/disqus/disqus-comment.component';
import { NotFoundComponent } from '../errors/not-found/not-found.component';


@NgModule({
  imports: [
    CommonModule,
    // HttpClientModule,
    // HttpModule,
    // NgCoreCoreModule.forRoot(),
    // NgCoreBaseModule.forRoot(),
    // NgCoreIdleModule.forRoot(),
    // NgCoreLinkModule.forRoot(),
    // NgCoreMarkModule.forRoot(),
    // NgCoreNoteModule.forRoot(),
    // NgCoreTimeModule.forRoot(),
    NgCoreCoreModule,
    NgCoreBaseModule,
    NgCoreIdleModule,
    NgCoreLinkModule,
    NgCoreMarkModule,
    NgCoreNoteModule,
    NgCoreTimeModule,
    MaterialComponentsModule,
  ],
  exports: [
    // NgCoreCoreModule,
    // NgCoreBaseModule,
    // NgCoreIdleModule,
    // NgCoreLinkModule,
    // NgCoreMarkModule,
    // NgCoreNoteModule,
    // NgCoreTimeModule,
    MaterialComponentsModule,
    DisqusCommentComponent,
    NotFoundComponent,
  ],
  declarations: [
    DisqusCommentComponent,
    NotFoundComponent
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AppConfigService,
        PageAccordionUiHelper,
        VisitorTokenRegistry,
        GuestbookDataService,
        VisitorTokenService,
        DailyPostsHelper,
        BlogPostService,
        PostListService,
        BlogPostRegistry,
        SitemapEntryRegistry,
      ]
    };
  }

}
