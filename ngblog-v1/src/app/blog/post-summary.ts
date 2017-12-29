import { PostStatus } from './core/post-status';


// Just use string???
export class PostSummary {

  // post url.
  public url: (string | null) = null;

  // tbd:
  constructor(
    // public id = '',   // Post id.
    // public title = '',
    public summary = '',
  )  {
  }

  public toString(): string {
    let str = '';
    // str += `id:${this.id};`
    // str += `title:${this.title};`
    str += `summary:${this.summary};`
    return str;
  }

}
