import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { PermalinkPathUtil } from '@ngcore/link';

import { DocEntry } from './doc-entry';
import { SitemapEntryUtil } from '../sitemap/util/sitemap-entry-util';


export class MarkdownDocEntry extends DocEntry {

  // tbd:
  // long content vs short content???

  public imgPrefix: (string | null) = null
  public permalinkPath: (string | null) = null

  public lazyLoaded: boolean = false;
  public debugEnabled: boolean = false;
  public rendererOptions: any = {};

  constructor(
    id: string = '',
    title: string = '',
    description: string = '',
    summaryContent: string = '',
    summaryUrl: string = '',
    contentUrl: (string | null) = null,
    public thumbnailUrl: (string | null) = null  // Thumbnail image is displayed with summary.
  ) {
    super(id, title, description, summaryContent, summaryUrl, contentUrl);
  }

  public get hasThumbnail(): boolean {
    return !!this.thumbnailUrl;
  }

  public showThumbnail(usePlaceholder: boolean = false) {
    if(usePlaceholder) {
      return true;
    } else {
      return this.hasThumbnail;
    }
  }

  public getThumbnail(placeholderUrl: (string | null) = null) {
    if(this.thumbnailUrl) {
      return this.thumbnailUrl;
    } else {
      if(placeholderUrl) {
        return placeholderUrl;
      } else {
        // ???
        return '';
      }
    }
  }

  public getPermalink(hostUrl: string): string {
    // return SitemapEntryUtil.buildAbsoluteUrl(hostUrl, this.permalinkPath);
    let permalink = '';
    if(hostUrl) {
      if(!hostUrl.endsWith('/')) {
        hostUrl += '/';
      }
      permalink = hostUrl;
    }
    if(this.permalinkPath) {  // permalinkPath does not start with '/'
      permalink += this.permalinkPath;
    }
    return permalink;
  }


  public toString(): string {
    let str = super.toString();

    str += `thumbnailUrl:${this.thumbnailUrl};`
    str += `imgPrefix:${this.imgPrefix};`
    str += `permalinkPath:${this.permalinkPath};`
    str += `lazyLoaded:${this.lazyLoaded};`
    str += `debugEnabled:${this.debugEnabled};`
    str += `rendererOptions:${JSON.stringify(this.rendererOptions)};`
    return str;
  }

  clone(): MarkdownDocEntry {
    let cloned = Object.assign(new MarkdownDocEntry(), this) as MarkdownDocEntry;
    return cloned;
  }
  static clone(obj: any): MarkdownDocEntry {
    let cloned = Object.assign(new MarkdownDocEntry(), obj) as MarkdownDocEntry;
    return cloned;
  }

  copy(obj: any) {
    // if(isDL()) dl.log(`### obj = ${obj}`);
    // // if(isDL()) dl.log(`### copy(): obj.id = ${obj.id}`);
    // // if(isDL()) dl.log(`### copy(): obj.title = ${obj.title}`);
    
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.summaryContent = obj.summaryContent;
    this.summaryUrl = obj.summaryUrl;
    this.contentUrl = obj.contentUrl;
    this.thumbnailUrl = obj.thumbnailUrl;
    this.date = obj.date;
    this.skipDisplay = obj.skipDisplay;
    this.showContent = obj.showContent;
    this.newerPostId = obj.newerPostId;
    this.olderPostId = obj.olderPostId;
    this.imgPrefix = obj.imgPrefix;
    this.permalinkPath = obj.permalinkPath;
    this.lazyLoaded = obj.lazyLoaded;
    this.debugEnabled = obj.debugEnabled;
    this.rendererOptions = Object.assign({}, obj.rendererOptions);

    // temporary
    if(isDL()) dl.log(`### copy(): ${this.toString()}`);
  }

  // static copy(target: MarkdownDocEntry, source: MarkdownDocEntry): MarkdownDocEntry {
  //   return Object.assign(target, source);
  // }
  // // static copy(target: MarkdownDocEntry, source: MarkdownDocEntry) {
  // static copy(target: MarkdownDocEntry, source: any) {
  //   target.id = source.id;
  //   target.title = source.title;
  //   target.description = source.description;
  //   target.summaryContent = source.summaryContent;
  //   target.summaryUrl = source.summaryUrl;
  //   target.contentUrl = source.contentUrl;
  //   target.lazyLoaded = source.lazyLoaded;
  //   target.debugEnabled = source.debugEnabled;
  //   target.rendererOptions = Object.assign({}, source.rendererOptions);
  // }

}
