import { NgModule } from '@angular/core';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatTabsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatCardModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatStepperModule
} from '@angular/material';
import {
  MatExpansionModule
} from '@angular/material/expansion';

@NgModule({
  imports: [
    // NoopAnimationsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatStepperModule,
    MatExpansionModule
  ],
  exports: [
    // NoopAnimationsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatStepperModule,
    MatExpansionModule
  ],
})
export class MaterialComponentsModule { }
