export abstract class DetailInfo {

  // tbd:
  // tab-entries...
  
  constructor(
    public id = '',
    public title = '')  {
  }

  public toString(): string {
    let str = '';
    str += `id:${this.id};`
    str += `title:${this.title};`
    return str;
  }

}
