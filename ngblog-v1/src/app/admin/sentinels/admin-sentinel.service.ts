import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { VisitorTokenService } from '../../services/visitor-token.service';


@Injectable()
export class AdminSentinelService implements CanActivate {

  constructor(
    private visitorTokenService: VisitorTokenService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // TBD:
    // Unfornately, visitorTokenService cannot be used this way
    // because when the routing rule determined,
    // The visitor token (via the query param) has not been set yet...
    // let isAdmin = this.visitorTokenService.hasValidAdminToken;
    // console.log(`canActivate() isAdmin = ${isAdmin}`)
    // return isAdmin;

    // This does not work.
    // When the url is directly typed in the address bar,
    // route/queryParams is always null at this point....
    if (route && route.queryParams) {
      let v = route.queryParams[VisitorTokenService.PARAM_VISITOR_TAG];
      console.log(`canActivate() Query param ${VisitorTokenService.PARAM_VISITOR_TAG} = ${v}`);
      console.dir(v);

      // This should be done here
      // since canActivate() is called before AppComponent is initialized.
      this.visitorTokenService.visitorToken = v;
    } else {
      console.log(`canActivate() queryParams is not set.`)
    }
    let isAdmin = this.visitorTokenService.hasValidAdminToken;
    console.log(`canActivate() isAdmin = ${isAdmin}`)
    return isAdmin;

    // return Observable.create(o => {
    //   console.log(`canActivate() queryParams is not set.`)
    //   let isAdmin = this.visitorTokenService.hasValidAdminToken;
    //   console.log(`canActivate() isAdmin = ${isAdmin}`)
    //   o.next(isAdmin);
    // });
  }

}
