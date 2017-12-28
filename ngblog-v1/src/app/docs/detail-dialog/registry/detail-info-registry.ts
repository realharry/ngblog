import { Injectable } from '@angular/core';

import { MarkdownDetailInfo } from '../../../detail/markdown-detail-info';
import { MarkdownDetailEntry } from '../../../detail/markdown-detail-entry';

import { detailInfoNgBlogHeader } from '../details/ngblog-header';


@Injectable()
export class DetailInfoRegistry {

  private infoMap: {[id: string]: MarkdownDetailInfo} = {};

  constructor() {
    // tbd.
    for(let ety of detailInfoNgBlogHeader.entries) {
      ety.debugEnabled = true;
      // ety.rendererOptions = {safe: false};
    }
    // ...

    this.infoMap[detailInfoNgBlogHeader.id] = detailInfoNgBlogHeader;
    // ...
  }

  hasDetailInfo(id: string): boolean {
    return (id in this.infoMap);
  }

  getDetailInfo(id: string): (MarkdownDetailInfo | null) {
    if(id in this.infoMap) {
      return this.infoMap[id];
    } else {
      return null;
    }
  }

}
