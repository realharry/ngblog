import { DocEntry } from './doc-entry';


export class MarkdownDocEntry extends DocEntry {

  // tbd:
  // long content vs short content???

  public lazyLoaded: boolean = false;
  public debugEnabled: boolean = false;
  public rendererOptions: any = {};

  constructor(
    id = '',
    title: string = '',
    description: string = '',
    summaryContent: string = '',
    summaryUrl: string = '',
    contentUrl: (string | null) = null
  ) {
    super(id, title, description, summaryContent, summaryUrl, contentUrl);
  }

  public toString(): string {
    let str = super.toString();

    // let str = '';
    // str += `id:${this.id};`
    // str += `title:${this.title};`
    // str += `description:${this.description};`
    // // str += `summaryContent:${this.summaryContent};`
    // str += `summaryUrl:${this.summaryUrl};`
    // str += `contentUrl:${this.contentUrl};`
    // str += `skipPrinting:${this.skipPrinting};`
    // str += `skipDisplay:${this.skipDisplay};`
    // str += `showContent:${this.showContent};`

    str += `lazyLoaded:${this.lazyLoaded};`
    str += `debugEnabled:${this.debugEnabled};`
    str += `rendererOptions:${JSON.stringify(this.rendererOptions)};`
    return str;
  }

  clone(): MarkdownDocEntry {
    let cloned = Object.assign(new MarkdownDocEntry(), this) as MarkdownDocEntry;
    return cloned;
  }
  static clone(obj: any): MarkdownDocEntry {
    let cloned = Object.assign(new MarkdownDocEntry(), obj) as MarkdownDocEntry;
    return cloned;
  }

  copy(obj: any) {
    // console.log(`### obj = ${obj}`);
    // // console.log(`### copy(): obj.id = ${obj.id}`);
    // // console.log(`### copy(): obj.title = ${obj.title}`);
    
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.summaryContent = obj.summaryContent;
    this.summaryUrl = obj.summaryUrl;
    this.contentUrl = obj.contentUrl;
    this.lazyLoaded = obj.lazyLoaded;
    this.debugEnabled = obj.debugEnabled;
    this.rendererOptions = Object.assign({}, obj.rendererOptions);

    // temporary
    console.log(`### copy(): ${this.toString()}`);
  }

  // static copy(target: MarkdownDocEntry, source: MarkdownDocEntry): MarkdownDocEntry {
  //   return Object.assign(target, source);
  // }
  // // static copy(target: MarkdownDocEntry, source: MarkdownDocEntry) {
  // static copy(target: MarkdownDocEntry, source: any) {
  //   target.id = source.id;
  //   target.title = source.title;
  //   target.description = source.description;
  //   target.summaryContent = source.summaryContent;
  //   target.summaryUrl = source.summaryUrl;
  //   target.contentUrl = source.contentUrl;
  //   target.lazyLoaded = source.lazyLoaded;
  //   target.debugEnabled = source.debugEnabled;
  //   target.rendererOptions = Object.assign({}, source.rendererOptions);
  // }

}
