import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { NgCoreCoreModule } from '@ngcore/core';
import { NgCoreBaseModule } from '@ngcore/base';
import { NgCoreIdleModule } from '@ngcore/idle';
import { NgCoreLinkModule } from '@ngcore/link';
import { NgCoreMarkModule } from '@ngcore/mark';

// import { MaterialComponentsModule } from '../material-components.module';
import { CoreModule } from '../core/core.module';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { AppConfig } from '@ngcore/core';
import { AppConfigService } from '../config/app-config.service';
import { AdminSentinelService } from './sentinels/admin-sentinel.service';
import { SitemapGenComponent } from './sitemap-gen/sitemap-gen.component';
import { PostWriterComponent } from './post-writer/post-writer.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ConfigViewComponent } from './config-view/config-view.component';

import { NotFoundComponent } from '../errors/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminPanelComponent
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
    path: '**',
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forChild(routes),
    // NgCoreCoreModule.forRoot(),
    // NgCoreBaseModule.forRoot(),
    // NgCoreIdleModule.forRoot(),
    // NgCoreLinkModule.forRoot(),
    // NgCoreMarkModule.forRoot(),
    NgCoreCoreModule,
    NgCoreBaseModule,
    NgCoreIdleModule,
    NgCoreLinkModule,
    NgCoreMarkModule,
    // MaterialComponentsModule,
    CoreModule,
  ],
  declarations: [
    SitemapGenComponent,
    PostWriterComponent,
    AdminPanelComponent,
    ConfigViewComponent,
    // NotFoundComponent
  ],
  providers: [
    AdminSentinelService
  ],
})
export class AdminModule {
  constructor(
    // // private appConfig: AppConfig,
    // private appConfigService: AppConfigService
  ) {
    // // // TBD:
    // // // Why is the app.module AppConfig not shared???
    // if(isDL()) dl.log(">>> Loading AdminModule");
    // // // if(isDL()) dl.log(this.appConfig.all);   // this is always empty.
    // // // As a workaround, just reload it here.
    // // // But, this does not always work (because it's async loading).
    // // //   --> Need to fix this.
    // // appConfig.load().then(o => {
    // //   console.log("AdminModule: App config loaded.");
    // // });

    // // testing
    // let config = this.appConfigService.appConfig;
    // if(isDL()) dl.log(config.all);
    // // testing
  }
}
