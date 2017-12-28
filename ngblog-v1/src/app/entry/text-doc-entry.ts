import { DocEntry } from './doc-entry';


export class TextDocEntry extends DocEntry {

  constructor(
    public id = '',
    public title: string = '',
    public description: string = '',
    public textContent: string = '') {
    super(id, title, description);
  }

}
