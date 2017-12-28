export abstract class DocEntry {

  // tbd:
  // public content: string;
  public skipPrinting: boolean = false;
  public skipDisplay: boolean = false;

  // public detailLink: (string | null) = null;  
  public showDetail: boolean = false;
  
  constructor(
    public id = '',
    public title = '',
    public description: string = '')  {
  }

  public toString(): string {
    let str = '';
    str += `id:${this.id};`
    str += `title:${this.title};`
    str += `description:${this.description};`
    str += `skipPrinting:${this.skipPrinting};`
    str += `skipDisplay:${this.skipDisplay};`
    str += `hasDetail:${this.showDetail};`
    return str;
  }

}
