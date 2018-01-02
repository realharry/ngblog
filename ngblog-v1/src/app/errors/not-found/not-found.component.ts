import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { BrowserWindowService } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/lazy';

import { SiteInfo } from '../../common/site-info';
import { ContactInfo } from '../../common/contact-info';

import { defaultSiteInfo } from '../../docs/info/default-site-info';
import { defaultContactInfo } from '../../docs/info/default-contact-info';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  contactEmail: string = '';
  contactPhone: string = '';
  contactWebsite: string = '';

  siteInfo: SiteInfo;
  contactInfo: ContactInfo;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appConfig: AppConfig,
    private browserWindowService: BrowserWindowService,
    private lazyLoaderService: LazyLoaderService,
  ) {
    this.siteInfo = new SiteInfo();
    this.contactInfo = new ContactInfo();
  }

  ngOnInit() {
    let sInfo = this.appConfig.get('site-info');
    if (sInfo) {
      this.siteInfo.copy(sInfo);
    } else {
      this.siteInfo.copy(defaultSiteInfo);
    }

    let cInfo = this.appConfig.get('contact-info');
    if (cInfo) {
      this.contactInfo.copy(cInfo);
    } else {
      this.contactInfo.copy(defaultContactInfo);
    }

    this.contactEmail = (this.contactInfo.email) ? this.contactInfo.email : '';
    this.contactPhone = (this.contactInfo.phone) ? this.contactInfo.phone : '';
    this.contactWebsite = (this.contactInfo.website) ? this.contactInfo.website : '';
    console.log(`>>>>> this.contactEmail = ${this.contactEmail}`);

  }

  private _displayContactEmail: boolean;
  get displayContactEmail(): boolean {
    if (this._displayContactEmail !== true && this._displayContactEmail !== false) {
      let showContactEmail = this.appConfig.getBoolean("show-contact-email", false);
      console.log(`>>>>> showContactEmail = ${showContactEmail}`);
      this._displayContactEmail =
        !!(this.contactEmail) // tbd: validate email?
        &&
        this.appConfig.getBoolean("show-contact-email", false);
      console.log(`>>>>> this._displayContactEmail = ${this._displayContactEmail}`);
    }
    return this._displayContactEmail;
  }


  navigateHome() {
    // How to clear history stack???
    // this.location.clear();
    this.router.navigate(['/']).then(suc => {
      console.log(`navigate() suc = ${suc}`);
    });
  }

}
