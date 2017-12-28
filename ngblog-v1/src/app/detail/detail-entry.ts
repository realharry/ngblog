export abstract class DetailEntry {

  // tbd:
  
  constructor(
    // public position: number,
    public label = ''
  )  {
  }

  public toString(): string {
    let str = '';
    // str += `position:${this.position};`
    str += `label:${this.label};`
    return str;
  }

}
