import { Injectable } from '@angular/core';
import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { DateTimeUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { LocalStorageService } from '@ngcore/core';
import { ExpansionStep } from './core/expansion-step';
// import { PageExpansionStep } from './core/page-expansion-step';


// TBD:
// Need to include page info...

@Injectable()
export class PageAccordionUiHelper {
  // // Singleton.
  // private static _Instance: (AccordionUiHelper | null) = null;
  constructor(
    private appConfig: AppConfig,
    private localStorageService: LocalStorageService
  ) {
    let staleAge = this.appConfig.getNumber("accordion-ui-stale-age", ExpansionStep.getDefaultStaleAge());
    ExpansionStep.setDefaultStaleAge(staleAge);
  }
  // public static getInstance(): AccordionUiHelper {
  //   return this._Instance || (this._Instance = new AccordionUiHelper());
  // }

  // TBD:
  // We should really use the post id/dateId rather than the step.
  // But, since the posts are created once a day maximum,
  // using steps is fine for a short duration....

  // temporary
  // (assuming there is only one accordion UI in the app.)
  private static PREFIX_EXPANSION_STEP = "expansion-step-page-";
  private static keyExpansionStep(page: number = 1) {
    return PageAccordionUiHelper.PREFIX_EXPANSION_STEP + page;
  }


  // For Accordion UI.
  // Note that this get/set (and increment/decrement) API should be sufficient for most use cases.
  // Other public methods defined below generally need not be used.
  public getStep(page: number = 1): number {
    let exstep = this.getExpansionStep(page);
    return exstep.step;
  }
  public setStep(page: number = 1, _step: number = 0) {  // tbd: validate _step? but how?
    let now = DateTimeUtil.getUnixEpochMillis();
    // if(this._expansion_step && this._expansion_step.step == _step) {
    //   this._expansion_step.timestamp = now;
    // } else {
    //   this._expansion_step = new ExpansionStep(_step, now);
    // }
    if (page in this._expansion_steps) {
      this._expansion_steps[page].step = _step;
      this._expansion_steps[page].timestamp = now;
    } else {
      this._expansion_steps[page] = new ExpansionStep(_step, now);
    }
    this.storeExpansionStep(page);
  }

  public incrementStep(page: number = 1, stepCount: number = -1) {
    // this.step++;   // ???
    let s = this.getStep(page) + 1;
    if (stepCount >= 0 && s >= stepCount) {
      s = stepCount - 1;
    }
    this.setStep(page, s);
  }
  public decrementStep(page: number = 1) {
    // this.step--;   // ???
    let s = this.getStep(page) - 1;
    if (s < 0) {
      s = 0;
    }
    this.setStep(page, s);
  }


  // Cache.
  // private _expansion_step: (ExpansionStep | null) = null;
  private _expansion_steps: {[page: number]: ExpansionStep} = {}

  public getExpansionStep(page: number = 1): ExpansionStep {
    if (!(page in this._expansion_steps)) {
      // Pick a random expansion_step of the day.
      // TBD: Initially, read it from user settings.
      let storedExpansionStep: ExpansionStep = this.getStoredExpansionStep(page);
      // console.log(`>>> storedExpansionStep = ${storedExpansionStep.toString()}`);
      if (storedExpansionStep && storedExpansionStep.isFresh) {
        this._expansion_steps[page] = storedExpansionStep;
      } else {
        this._expansion_steps[page] = new ExpansionStep(0); // default value step==0.
      }
    }
    return this._expansion_steps[page];
  }

  public hasStoredExpansionStep(page: number = 1): boolean {
    let storedExpansionStep = this.getStoredExpansionStep(page);
    return (!!storedExpansionStep);
  }
  public getStoredExpansionStep(page: number = 1): (ExpansionStep | null) {
    let storedExpansionStep: ExpansionStep;
    let exstep = this.localStorageService.get(PageAccordionUiHelper.keyExpansionStep(page));
    if (exstep) {
      storedExpansionStep = Object.assign(new ExpansionStep(), exstep);
    }
    // }
    if (storedExpansionStep && storedExpansionStep.isFresh) {
      return storedExpansionStep;
    } else {
      return null;
    }
  }
  // Save the current expansion_step.
  public storeExpansionStep(page: number = 1) {
    if (this._expansion_steps[page]) {
      this.localStorageService.set(PageAccordionUiHelper.keyExpansionStep(page), this._expansion_steps[page]);
    } else {
      // ignore.
      // (or, remove the stored expansion_steps[page]??)
    }
  }

  public removeStoredExpansionStep(page: number = 1) {
    this.localStorageService.removeItem(PageAccordionUiHelper.keyExpansionStep(page));
  }

}
