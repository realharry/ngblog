import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { BrowserWindowService } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/idle';

import { VisitorTokenService } from '../../services/visitor-token.service';


// TBD:
// "Admin" components should really be put in a separate app.
// (At least admin pages should be guarded with auth.)
@Component({
  selector: 'app-post-writer',
  templateUrl: './post-writer.component.html',
  styleUrls: ['./post-writer.component.css']
})
export class PostWriterComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appConfig: AppConfig,
    private browserWindowService: BrowserWindowService,
    private lazyLoaderService: LazyLoaderService,
    private visitorTokenService: VisitorTokenService
  ) {
  }

  ngOnInit() {
    console.log(">>> PostWriterComponent::ngOnInit() >>>")
  }


  navigateAdminHome() {
    let qp = {};
    if(this.visitorTokenService.hasVisitorToken) {
      qp = {v: this.visitorTokenService.visitorToken};
    }
    this.router.navigate(['admin'], {queryParams: qp}).then(suc => {
      console.log(`navigateAdminHome() suc = ${suc}`);
    });
  }

}
