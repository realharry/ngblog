import { PostStatus } from './core/post-status';
import { ContentFormat } from './core/content-format';


// TBD:
// Support multiple posts for a day???
export class PostMetadata {
  public label = '';   // tag?
  public contentType = ContentFormat.Markdown;
  public status = PostStatus.Draft;

  // This is not generally included in "post.json" file.
  // Web service/client will populate this field.
  public url: (string | null) = null;   // Post (folder) URL.

  // For now, string dateId is used.
  // (Note that dateId may not actually be the same as the date/time due to timezone differences.)
  // public date: Date;
  public dateId: string;

  // Summary is required, and
  // Content is optional.
  public hasContent: boolean = false;

  // If present, the image will be displayed in the summary section.
  public thumbnail: (string | null) = null;

  // tbd:
  constructor(
    // public id = '',   // Post id.
    public title = '',
    public description = '',
    // public label = '',   // tag?
    // public contentType = ContentType.Markdown,
    // public status = PostStatus.Draft,
    // Timestamps are not being used.
    // For now, just use dateId.
    public created = 0,
    public posted = 0,
    public deleted = 0,
  )  {
  }

  public toString(): string {
    let str = '';
    // str += `id:${this.id};`
    str += `title:${this.title};`
    str += `description:${this.description};`
    str += `label:${this.label};`
    str += `contentType:${this.contentType};`
    str += `status:${this.status};`
    str += `url:${this.url};`
    str += `dateId:${this.dateId};`
    str += `hasContent:${this.hasContent};`
    str += `thumbnail:${this.thumbnail};`
    str += `created:${this.created};`
    str += `posted:${this.posted};`
    str += `deleted:${this.deleted};`
    return str;
  }

  clone(): PostMetadata {
    let cloned = Object.assign(new PostMetadata(), this) as PostMetadata;
    return cloned;
  }
  static clone(obj: any): PostMetadata {
    let cloned = Object.assign(new PostMetadata(), obj) as PostMetadata;
    return cloned;
  }

}
