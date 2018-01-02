import { DateTimeUtil } from '@ngcore/core';


export class PageExpansionStep {

  // This does not have to be very long.
  // It just provides continuity in a single "session"
  //   (e.g., during navigation via back, etc.).
  // TBD: Read this from app config????
  private static DEFAULT_STALE_AGE = 6 * 3600 * 1000;  // 6 hours by default.
  private static _defaultStaleAge = PageExpansionStep.DEFAULT_STALE_AGE;
  public static getDefaultStaleAge(): number {
    return  PageExpansionStep._defaultStaleAge;
  }
  public static setDefaultStaleAge(_defaultStaleAge: number) {
    PageExpansionStep._defaultStaleAge = _defaultStaleAge;
  }

  // Note;
  // timestamp==0 never becomes stale.
  constructor(
    public page: number = 1,  // page count starts from 1.
    public step: number = 0,
    public timestamp: number = 0,
    public staleAge: number = PageExpansionStep.getDefaultStaleAge()
  ) {
  }

  public get isStale(): boolean {
    if (this.timestamp == 0) {
      return false;
    }
    let now = DateTimeUtil.getUnixEpochMillis();
    return (this.timestamp < now - this.staleAge);
  }

  public get isFresh(): boolean {
    if (this.timestamp == 0) {
      return true;
    }
    let now = DateTimeUtil.getUnixEpochMillis();
    return (this.timestamp >= now - this.staleAge);
  }


  public toString(): string {
    let str = '';
    str += `page:${this.page};`
    str += `step:${this.step};`
    str += `timestamp:${this.timestamp};`
    str += `staleAge:${this.staleAge};`
    // str += `isStale:${this.isStale};`
    // str += `isFresh:${this.isFresh};`
    // ...
    return str;
  }

}
