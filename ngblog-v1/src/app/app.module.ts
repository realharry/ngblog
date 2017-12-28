import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';

import { NgCoreCoreModule } from '@ngcore/core';
import { NgCoreBaseModule } from '@ngcore/base';
import { NgCoreLazyModule } from '@ngcore/lazy';
import { NgCoreMarkModule } from '@ngcore/mark';

import { MaterialComponentsModule } from './material-components.module';

import { AccordionUiHelper } from './helpers/accordion-ui-helper';
import { DetailInfoRegistry } from './docs/detail-dialog/registry/detail-info-registry';
import { VisitorTokenRegistry } from './visitors/visitor-token-registry';
import { GuestbookDataService } from './services/guestbook-data.service';
import { VisitorTokenService } from './services/visitor-token.service';

import { AppComponent } from './app.component';
import { NgBlogSiteComponent } from './docs/ngblog-site/ngblog-site.component';
import { DetailDialogComponent } from './docs/detail-dialog/detail-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NgBlogSiteComponent,
    DetailDialogComponent
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
        component: NgBlogSiteComponent
      }
    ]),
    NgCoreCoreModule.forRoot(),
    NgCoreBaseModule.forRoot(),
    NgCoreLazyModule.forRoot(),
    NgCoreMarkModule.forRoot(),
    MaterialComponentsModule,
  ],
  entryComponents: [
    // AppComponent,
    DetailDialogComponent
  ],
  providers: [
    AccordionUiHelper,
    DetailInfoRegistry,
    VisitorTokenRegistry,
    GuestbookDataService,
    VisitorTokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('my-dark-theme');
  }
}
