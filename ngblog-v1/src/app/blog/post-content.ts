import { PostStatus } from './core/post-status';
import { ContentFormat } from './core/content-format';


// Just use string???
export class PostContent {

  // post url.
  public url: (string | null) = null;

  // tbd:
  constructor(
    // public id = '',   // Post id.
    // public title = '',
    // public contentType = ContentType.Markdown,
    public content = '',
    // public contentUrl = '',
  )  {
  }

  public toString(): string {
    let str = '';
    // str += `id:${this.id};`
    // str += `title:${this.title};`
    // str += `contentType:${this.contentType};`
    str += `content:${this.content};`
    // str += `contentUrl:${this.contentUrl};`
    return str;
  }

}
