import { Injectable } from '@angular/core';
import { DateTimeUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { LocalStorageService } from '@ngcore/core';
import { ExpansionStep } from './core/expansion-step';


// TBD:
// Need to include page info...

@Injectable()
export class AccordionUiHelper {
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
  private static KEY_EXPANSION_STEP = "expansion-step";


  // For Accordion UI.
  // Note that this get/set (and increment/decrement) API should be sufficient for most use cases.
  // Other public methods defined below generally need not be used.
  public get step(): number {
    let exstep = this.getExpansionStep();
    return exstep.step;
  }
  public set step(_step: number) {  // tbd: validate _step? but how?
    let now = DateTimeUtil.getUnixEpochMillis();
    // if(this._expansion_step && this._expansion_step.step == _step) {
    //   this._expansion_step.timestamp = now;
    // } else {
    //   this._expansion_step = new ExpansionStep(_step, now);
    // }
    if (this._expansion_step) {
      this._expansion_step.step = _step;
      this._expansion_step.timestamp = now;
    } else {
      this._expansion_step = new ExpansionStep(_step, now);
    }
    this.storeExpansionStep();
  }

  public incrementStep(stepCount: number = -1) {
    // this.step++;   // ???
    let s = this.step + 1;
    if (stepCount >= 0 && s >= stepCount) {
      s = stepCount - 1;
    }
    this.step = s;
  }
  public decrementStep() {
    // this.step--;   // ???
    let s = this.step - 1;
    if (s < 0) {
      s = 0;
    }
    this.step = s;
  }


  // Cache.
  private _expansion_step: (ExpansionStep | null) = null;

  public getExpansionStep(): ExpansionStep {
    if (!this._expansion_step) {
      // Pick a random expansion_step of the day.
      // TBD: Initially, read it from user settings.
      let storedExpansionStep: ExpansionStep = this.getStoredExpansionStep();
      // console.log(`>>> storedExpansionStep = ${storedExpansionStep.toString()}`);
      if (storedExpansionStep && storedExpansionStep.isFresh) {
        this._expansion_step = storedExpansionStep;
      } else {
        this._expansion_step = new ExpansionStep(0); // default value step==0.
      }
    }
    return this._expansion_step;
  }

  public hasStoredExpansionStep(): boolean {
    let storedExpansionStep = this.getStoredExpansionStep();
    return (!!storedExpansionStep);
  }
  public getStoredExpansionStep(): (ExpansionStep | null) {
    let storedExpansionStep: ExpansionStep;
    // if (this.localStorageService.hasStorage) {
    // storedExpansionStep = this.localStorageService.get(AccordionUiHelper.KEY_EXPANSION_STEP) as ExpansionStep;
    let exstep = this.localStorageService.get(AccordionUiHelper.KEY_EXPANSION_STEP);
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
  public storeExpansionStep() {
    if (this._expansion_step) {
      // if (this.localStorageService.hasStorage) {
      this.localStorageService.set(AccordionUiHelper.KEY_EXPANSION_STEP, this._expansion_step);
      // }
    } else {
      // ignore.
      // (or, remove the stored expansion_step??)
    }
  }

  public removeStoredExpansionStep() {
    // if (this.localStorageService.hasStorage) {
    this.localStorageService.removeItem(AccordionUiHelper.KEY_EXPANSION_STEP);
    // }
  }

}
