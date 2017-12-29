import { Injectable } from '@angular/core';

import { VisitorTokenRegistry } from '../visitors/visitor-token-registry';


// Tbd:

@Injectable()
export class VisitorTokenService {

  public static PARAM_VISITOR_TAG = 'v';

  constructor(private tokenRegistry: VisitorTokenRegistry) {
  }

  private _token: (string | null) = null;
  private _isTokenValid: boolean = false;
  private _isTokenNonBinary: boolean = false;

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

}
