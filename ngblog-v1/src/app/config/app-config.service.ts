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



}
