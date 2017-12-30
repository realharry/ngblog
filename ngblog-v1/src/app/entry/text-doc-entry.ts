import { DocEntry } from './doc-entry';


export class TextDocEntry extends DocEntry {

  constructor(
    public id = '',
    public title: string = '',
    public description: string = '',
    public summaryContent: string = '',
    public summaryUrl: string = '',
    public contentUrl: (string | null) = null
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
