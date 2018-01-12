import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// import { NgCoreCoreModule } from '@ngcore/core';
// import { NgCoreBaseModule } from '@ngcore/base';
// import { NgCoreIdleModule } from '@ngcore/idle';
// import { NgCoreLinkModule } from '@ngcore/link';
// import { NgCoreMarkModule } from '@ngcore/mark';

// import { MaterialComponentsModule } from '../material-components.module';
import { CoreModule } from '../core/core.module';

import { AppConfig } from '@ngcore/core';

import { WeeklyDigestComponent } from './weekly-digest/weekly-digest.component';

import { NotFoundComponent } from '../errors/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WeeklyDigestComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: WeeklyDigestComponent
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
    // MaterialComponentsModule,
    CoreModule,
  ],
  declarations: [
    WeeklyDigestComponent,
    // NotFoundComponent
  ],
  providers: [
  ],
})
export class WeeklyDigestModule {
  constructor(private appConfig: AppConfig) {
    appConfig.load().then(o => {
      console.log("WeeklyDigestModule: App config loaded.");
    });
  }
}
