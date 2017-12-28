import { DateTimeUtil } from '@ngcore/core';


export class ExpansionStep {

  public staleAge = 24 * 3600 * 1000;  // 1 day by default.

  // Note;
  // timestamp==0 never becomes stale.
  constructor(
    public step: number = 0,
    public timestamp: number = 0
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
    str += `step:${this.step};`
    str += `timestamp:${this.timestamp};`
    str += `staleAge:${this.staleAge};`
    str += `isStale:${this.isStale};`
    str += `isFresh:${this.isFresh};`
    // ...
    return str;
  }

}
