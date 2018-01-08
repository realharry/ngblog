import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../environments/environment';

import { AdminSentinelService } from './admin/sentinels/admin-sentinel.service';

import { NotFoundComponent } from './errors/not-found/not-found.component';

import { SitemapGenComponent } from './admin/sitemap-gen/sitemap-gen.component';
import { PostWriterComponent } from './admin/post-writer/post-writer.component';
import { ConfigViewComponent } from './admin/config-view/config-view.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { NgBlogSiteComponent } from './docs/ngblog-site/ngblog-site.component';
import { NgBlogPostComponent } from './docs/ngblog-post/ngblog-post.component';
import { NgBlogPermalinkComponent } from './docs/ngblog-permalink/ngblog-permalink.component';
import { AppComponent } from './app.component';


// temporary
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/app',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    pathMatch: 'full',
    component: NgBlogSiteComponent
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    // canActivate: [AdminSentinelService]   // this does not work when accessed directly via URL.
  },
  {
    path: 'writer',
    component: PostWriterComponent,
    canActivate: [AdminSentinelService]   // this should be accessed via admin.
  },
  {
    path: 'sitemaps',
    component: SitemapGenComponent,
    canActivate: [AdminSentinelService]   // this should be accessed via admin.
  },
  {
    path: 'config',
    component: ConfigViewComponent,
    canActivate: [AdminSentinelService]   // this should be accessed via admin.
  },
  {
    path: 'post/:id',
    component: NgBlogPostComponent
  },
  {
    path: ':path',
    component: NgBlogPermalinkComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];


// // Temporary
// var rmodule: ModuleWithProviders;
// if(environment.useHash) {
//   rmodule = RouterModule.forRoot(routes, {useHash: true});
// } else {
//   rmodule = RouterModule.forRoot(routes);
// }

@NgModule({
  imports: [
    // temporary.
    // rmodule
    // GitLab Pages does not support multiple paths.
    // Until we find more permanent hosting site,
    // Use hash strategy, for now.
    // RouterModule.forRoot(routes, {useHash: true})
    // (Note: We need to use path strategy to be able to enable SSR.)
    RouterModule.forRoot(routes)  // Default is using path strategy.
    // ...
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AdminSentinelService
  ]
})
export class AppRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutingModule,
      providers: [
        AdminSentinelService,
      ]
    };
  }
}
