import { Component, OnInit } from '@angular/core';
import { Input, ElementRef, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { BrowserWindowService } from '@ngcore/core';
// import { AppConfig } from '@ngcore/core';
import { AppConfigService } from '../../config/app-config.service';


// Based on a sample code found on SO.
@Component({
  selector: 'app-disqus-comment',
  template: '<div *ngIf="isRunningInBrowser" id="disqus_thread"></div>'
})
export class DisqusCommentComponent implements OnInit {

  @Input() public identifier: string = '';

  private shortname: string = '';

  // private appConfig: AppConfig;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private browserWindowService: BrowserWindowService,
    private appConfigService: AppConfigService,
  ) {
    // this.appConfig = this.appConfigService.appConfig;
  }

  get isRunningInBrowser(): boolean {
    return !!(this.browserWindowService.window);
  }

  ngOnInit() {
    if (isDL()) dl.log(`>>> DisqusCommentComponent::ngOnInit(). identifier = ${this.identifier}`);

    if (this.isRunningInBrowser) {
      this.shortname = this.appConfigService.disqusAuthorShortname;

      if (!(this.browserWindowService.window as any).DISQUS) {
        this.addScriptTag();
      } else {
        this.reset();
      }
    }
  }

  reset() {
    if (this.isRunningInBrowser) {
      (this.browserWindowService.window as any).DISQUS.reset({
        reload: true,
        config: this.getConfig()
      });
    }
  }

  addScriptTag() {
    if (this.isRunningInBrowser) {
      (this.browserWindowService.window as any).disqus_config = this.getConfig();

      if (this.browserWindowService.document && this.browserWindowService.document.body) {
        let script = this.renderer.createComment('script');
        script.src = `https://${this.shortname}.disqus.com/embed.js`;
        script.async = true;
        script.type = 'text/javascript';
        // script.setAttribute('data-timestamp', DateTimeUtil.getUnixEpochMillis());

        // this.renderer.appendChild(this.el.nativeElement, script);
        this.renderer.appendChild(this.browserWindowService.document.body, script);  //???
      }
    }
  }

  getConfig() {
    let _self = this;
    return function () {
      this.page.url = this.location.href;
      this.page.identifier = _self.identifier;
      this.language = 'en';
    };
  }
}
