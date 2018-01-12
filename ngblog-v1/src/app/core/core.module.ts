import { NgModule } from '@angular/core';
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

import { NotFoundComponent } from '../errors/not-found/not-found.component';


@NgModule({
  imports: [
    CommonModule,
    // HttpClientModule,
    // HttpModule,
    NgCoreCoreModule.forRoot(),
    NgCoreBaseModule.forRoot(),
    NgCoreIdleModule.forRoot(),
    NgCoreLinkModule.forRoot(),
    NgCoreMarkModule.forRoot(),
    NgCoreNoteModule.forRoot(),
    NgCoreTimeModule.forRoot(),
    MaterialComponentsModule,
  ],
  exports: [
    NgCoreCoreModule,
    NgCoreBaseModule,
    NgCoreIdleModule,
    NgCoreLinkModule,
    NgCoreMarkModule,
    NgCoreNoteModule,
    NgCoreTimeModule,
    MaterialComponentsModule,
    NotFoundComponent,
  ],
  declarations: [
    NotFoundComponent
  ],
  providers: [
  ],
})
export class CoreModule { }
