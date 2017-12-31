import { DateIdUtil } from '@ngcore/core';

import { PostMetadata } from '../../blog/post-metadata';
import { MarkdownDocEntry } from '../markdown-doc-entry';
import { DailyPostsHelper } from '../../helpers/daily-posts-helper';


export namespace MarkdownEntryUtil {

  export function buildFromPostMetadata(pm: PostMetadata, hasValidVisitorToken: boolean = false): (MarkdownDocEntry | null) {
    // if(!pm) {
    //   return null;   // ???
    // }
    // console.log(`post metadata = ${pm}`);
    let entry = new MarkdownDocEntry(
      // (pm.dateId) ? pm.dateId : DailyPostsHelper.getInstance().getDateId(pm.url),
      pm.dateId,
      pm.title,
      pm.description,
      "",
      DailyPostsHelper.getInstance().getSummaryUrl(pm.url),
      (pm.hasContent) ? DailyPostsHelper.getInstance().getContentUrl(pm.url) : null
    );
    entry.date = DateIdUtil.convertToDate(entry.id);  // For now, entry.id is dateId.
    if (
      // hasValidVisitorToken &&   // temporary
      pm.hasContent) {
      entry.showContent = true;
    }
    console.log(`entry = ${entry}`);
    return entry;
  }

}
