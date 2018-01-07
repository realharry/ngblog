import { Injectable } from '@angular/core';

import { VisitorTokenRegistry } from '../visitors/visitor-token-registry';


// "Poor man's auth"
// TBD: Need to use real auth? Maybe or maybe not....

@Injectable()
export class VisitorTokenService {

  public static PARAM_VISITOR_TAG = 'v';

  private _token: (string | null) = null;
  private _isTokenValid: boolean = false;
  private _isTokenNonBinary: boolean = false;
  private _isAdminToken: boolean = false;

  constructor(private tokenRegistry: VisitorTokenRegistry) {
  }

  // TBD:
  // This service may be used before setVisitorToken() is called
  //    (the token is set from app.component.ngOnInit().)

  // temporary
  get adminToken(): string {
    return this.tokenRegistry.adminToken;
  }

  // temporary
  public getDevToken(): string {
    return this.tokenRegistry.devToken;
  }

  get visitorToken(): (string | null) {
    return this._token;
  }
  set visitorToken(_token: (string | null)) {
    this._token = _token;
    this._isTokenValid = this.tokenRegistry.hasToken(this._token);
    this._isTokenNonBinary = this.tokenRegistry.isNonBinary(this._token);
    this._isAdminToken = this.tokenRegistry.isAdminVisitor(this._token);
  }

  get hasVisitorToken(): boolean {
    return !!(this._token);
  }
  get hasValidVisitorToken(): boolean {
    return this._isTokenValid;
  }
  get hasNonBinaryVisitorToken(): boolean {
    return this._isTokenNonBinary;
  }

  get hasValidAdminToken(): boolean {
    return this._isAdminToken;
  }

}
