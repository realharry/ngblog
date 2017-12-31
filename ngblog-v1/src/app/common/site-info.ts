export class SiteInfo {
  
  constructor(
    public name = '',           // Blog name
    public title: string = '',  // Description
    // author, etc...
  ) {
  }

  public toString(): string {
    let str = '';
    str += `name:${this.name};`
    str += `title:${this.title};`
    return str;
  }

  clone(): SiteInfo {
    let cloned = Object.assign(new SiteInfo(), this) as SiteInfo;
    return cloned;
  }
  static clone(obj: any): SiteInfo {
    let cloned = Object.assign(new SiteInfo(), obj) as SiteInfo;
    return cloned;
  }

  copy(obj: any) {
    this.name = obj.name;
    this.title = obj.title;
  }

}
