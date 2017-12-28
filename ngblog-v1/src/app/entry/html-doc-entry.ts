import { DocEntry } from './doc-entry';


export class HtmlDocEntry extends DocEntry {

  constructor(
    public id = '',
    public title: string = '',
    public description: string = '',
    public htmlContent: string = '') {
    super(id, title, description);
  }

}
