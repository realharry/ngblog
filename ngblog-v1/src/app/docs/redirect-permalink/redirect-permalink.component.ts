import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;


@Component({
  selector: 'app-redirect-permalink',
  template: ''
})
export class RedirectPermalinkComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (isDL()) dl.log(">>> RedirectPermalinkComponent::ngOnInit()");

    // Experimenting....
    // Routing trick with hash tags
    let pagePath = this.router.url;
    if (pagePath) {
      let h = pagePath.indexOf('#');
      if (h != -1) {
        pagePath = pagePath.substring(0, h);
      }
    }
    if (isDL()) dl.log(`>>> pagePath = ${pagePath}`);

    this.activatedRoute.fragment.subscribe(fragment => {
      let segments: string[] = [];
      if (fragment) {
        if (isDL()) dl.log(`>>> fragment = ${fragment}`);

        // Treating the fragment as the redirect url path.
        let redirectPath = fragment;
        segments = fragment.split('/');
      } else {
        // Use the original url
        // TBD: Is path enough? What about query params, etc. ???
        if (pagePath) {
          segments = pagePath.split('/');
        }
      }
      Observable.timer(1).subscribe(i => {
        this.router.navigate(segments, { replaceUrl: true }).then(suc => {
          if (isDL()) dl.log(`Redirect navigate() suc = ${suc}; url = ${pagePath}#${fragment}`);
        }).catch(err => {
          if (isDL()) dl.log(`Redirect navigate() err = ${err}}`);
        });
      });
    });
    // Routing trick with hash tags
  }

}
