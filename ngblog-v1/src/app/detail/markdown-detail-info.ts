import { DetailInfo } from './detail-info';
import { MarkdownDetailEntry } from './markdown-detail-entry';


export class MarkdownDetailInfo extends DetailInfo {

  // tbd:
  // public entries: MarkdownDetailEntry[] = [];

  constructor(
    public id = '',
    public title: string = '',
    public entries: MarkdownDetailEntry[] = []
  ) {
    super(id, title);
  }

  public toString(): string {
    let str = super.toString();
    str += '['
    for (let e of this.entries) {
      str += '}'
      str += e.toString();
      str += '},'
    }
    str += ']'
    return str;
  }

}
