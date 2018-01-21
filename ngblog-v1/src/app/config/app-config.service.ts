import { Injectable } from '@angular/core';

import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { AppConfig } from '@ngcore/core';


@Injectable()
export class AppConfigService {

  // testing
  // public appConfig: AppConfig;

  constructor(
    public appConfig: AppConfig,
  ) {
    // testing
    if (isDL()) dl.log(">>> Loading AppConfigService");
    if (isDL()) dl.log(this.appConfig.all);
    // testing
  }

  // TBD:
  // Move all config reading routines to here, if possible???


  // If set to true,
  // links starting with "#" in markdown will be interpreted as internal routerLinks.
  // Otherwise, the internal links will reload the app.
  private _useHashLinkRedirect: boolean;
  get useHashLinkRedirect(): boolean {
    if (this._useHashLinkRedirect !== true && this._useHashLinkRedirect !== false) {
      this._useHashLinkRedirect = this.appConfig.getBoolean("use-hash-link-redirect", false);
    }
    return this._useHashLinkRedirect;
  }

  private _enableDisqusComment: boolean;
  get enableDisqusComment(): boolean {
    if (this._enableDisqusComment !== true && this._enableDisqusComment !== false) {
      this._enableDisqusComment = this.appConfig.getBoolean("enable-disqus-comment", false);
    }
    return this._enableDisqusComment;
  }

  private _disqusWebsiteShortname: (string | null) = null;
  get disqusWebsiteShortname(): string {
    if (this._disqusWebsiteShortname == null) {
      this._disqusWebsiteShortname = this.appConfig.getString("disqus-website-shortname", '');
    }
    return this._disqusWebsiteShortname;
  }


  // 0 ~ 23.9
  private _dailyPostStartHour: number = -1;
  get dailyPostStartHour(): number {
    if (this._dailyPostStartHour == -1) {
      this._dailyPostStartHour = this.appConfig.getNumber("daily-post-start-hour", 0);
      this._dailyPostStartHour %= 24;
    }
    return this._dailyPostStartHour;
  }

}
