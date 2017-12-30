import { Injectable } from '@angular/core';


// Tbd:
// It should really have been a "visitor token" not a token...
//....

@Injectable()
export class VisitorTokenRegistry {

  // token => note/info (e.g., like the name of the granted visitor, etc.)
  private tokenMap: {[token: string]: string} = {};

  constructor() {
    // tbd:
    // special binary tokens...
    this.tokenMap['000000'] = 'Demo token 1';
    this.tokenMap['011101'] = 'Demo token 2';
    // "Real" tokens....
    this.tokenMap['213141'] = 'Dev token';
    // ...
  }

  // temporary
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
