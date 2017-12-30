import { DocEntry } from './doc-entry';


export class HtmlDocEntry extends DocEntry {

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


  clone(): HtmlDocEntry {
    let cloned = Object.assign(new HtmlDocEntry(), this) as HtmlDocEntry;
    return cloned;
  }
  static clone(obj: any): HtmlDocEntry {
    let cloned = Object.assign(new HtmlDocEntry(), obj) as HtmlDocEntry;
    return cloned;
  }

}
