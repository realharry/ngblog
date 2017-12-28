import { DetailEntry } from './detail-entry';


export class MarkdownDetailEntry extends DetailEntry {

  // tbd:
  public lazyLoaded: boolean = false;
  public debugEnabled?: boolean = false;
  public rendererOptions?: any = {};
  
  constructor(
    // public position = '',
    public label: string = '',
    public markdownContent: string = '',
    public markdownUrl: string = ''
  ) {
    super(label);
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
