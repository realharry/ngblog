import { Injectable } from '@angular/core';

// import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { AppConfigService } from '../config/app-config.service';


// Tbd:
// We need to use full auth
//    (although that's not strictly needed for client-side-only apps like this...)
//....
@Injectable()
export class VisitorTokenRegistry {

  // token => note/info (e.g., like the name of the granted visitor, etc.)
  private tokenMap: {[token: string]: string} = {};

  private appConfig: AppConfig;
  constructor(
    // private appConfig: AppConfig,
    private appConfigService: AppConfigService,
  ) {
    this.appConfig = this.appConfigService.appConfig;

    // tbd:
    // special binary tokens...
    this.tokenMap['000000'] = 'Demo token 1';
    this.tokenMap['011101'] = 'Demo token 2';
    // "Real" tokens....
    this.tokenMap['213141'] = 'Dev token';
    // ...
  }

  // This is not for security!
  // It merely provides an alternative way to access (part of) the app.
  // (Note that the config file is publicly accessible via non-protected HTTP.)
  private _adminToken: (string | null) = null;
  get adminToken(): string {
    if(this._adminToken == null) {
      this._adminToken = this.appConfig.getString("admin-visitor-token", '');
    }
    return this._adminToken;
  }
  get hasAdminToken(): boolean {
    return !! this.adminToken;
  }
  isAdminVisitor(token: string): boolean {
    // Note that if this.adminToken is not set (''),
    // isAdminVisitor() always returns false.
    return (!!token) && (this.adminToken == token);
  }

  // temporary
  // (This does not make sense. We should really return key not value...)
  get devToken(): string {
    return this.tokenMap['213141'];
  }

  hasToken(token: string): boolean {
    return (token in this.tokenMap);
  }

  isNonBinary(token: string): boolean {
    if(token in this.tokenMap) {  // Has to be valid first.
      return !(/^[01]+$/.test(token));
    } else {
      return false;
    }
  }

  getInfo(token: string): (string | null) {
    if(token in this.tokenMap) {
      return this.tokenMap[token];
    } else {
      return null;
    }
  }  

}
