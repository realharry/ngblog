import { DocEntry } from './doc-entry';


export class TextDocEntry extends DocEntry {

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


  clone(): TextDocEntry {
    let cloned = Object.assign(new TextDocEntry(), this) as TextDocEntry;
    return cloned;
  }
  static clone(obj: any): TextDocEntry {
    let cloned = Object.assign(new TextDocEntry(), obj) as TextDocEntry;
    return cloned;
  }

}
