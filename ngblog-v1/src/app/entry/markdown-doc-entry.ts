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
    public summaryContent: string = '',
    public summaryUrl: string = '',
    public contentUrl: (string | null) = null
  ) {
    super(id, title, description);
  }

  public toString(): string {
    let str = super.toString();
    // str += `summaryContent:${this.summaryContent};`
    str += `summaryUrl:${this.summaryUrl};`
    str += `contentUrl:${this.contentUrl};`
    str += `lazyLoaded:${this.lazyLoaded};`
    str += `debugEnabled:${this.debugEnabled};`
    str += `rendererOptions:${JSON.stringify(this.rendererOptions)};`
    return str;
  }

}
