import { DocEntry } from './doc-entry';


export class MarkdownDocEntry extends DocEntry {

  // tbd:
  // long content vs short content???

  public lazyLoaded: boolean = false;
  public debugEnabled: boolean = false;
  public rendererOptions: any = {};
  
  constructor(
    public id = '',
    public title: string = '',
    public description: string = '',
    public markdownContent: string = '',
    public markdownUrl: string = ''
  ) {
    super(id, title, description);
  }

  public toString(): string {
    let str = super.toString();
    // str += `markdownContent:${this.markdownContent};`
    str += `markdownUrl:${this.markdownUrl};`
    str += `lazyLoaded:${this.lazyLoaded};`
    str += `debugEnabled:${this.debugEnabled};`
    str += `rendererOptions:${JSON.stringify(this.rendererOptions)};`
    return str;
  }

}
