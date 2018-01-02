import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../environments/environment';

import { NotFoundComponent } from './errors/not-found/not-found.component';

import { NgBlogSiteComponent } from './docs/ngblog-site/ngblog-site.component';
import { NgBlogPostComponent } from './docs/ngblog-post/ngblog-post.component';
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
    component: NgBlogSiteComponent,
    pathMatch: 'full'
  },
  {
    path: 'post/:id',
    component: NgBlogPostComponent
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
  ]
})
export class AppRoutingModule { }
