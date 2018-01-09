import { DevLogger as dl } from '@ngcore/core'; import isDL = dl.isLoggable;
import { DateIdUtil } from '@ngcore/core';
import { PermalinkPathUtil } from '@ngcore/link';

import { PostMetadata } from '../../blog/post-metadata';
import { MarkdownDocEntry } from '../markdown-doc-entry';
import { DailyPostsHelper } from '../../helpers/daily-posts-helper';


export namespace MarkdownEntryUtil {

  export function buildFromPostMetadata(pm: PostMetadata): (MarkdownDocEntry | null) {
    // if(!pm) {
    //   return null;   // ???
    // }
    // if(isDL()) dl.log(`post metadata = ${pm}`);
    let imgPrefix = DailyPostsHelper.getImgPrefix(pm.url);
    let entry = new MarkdownDocEntry(
      // (pm.dateId) ? pm.dateId : DailyPostsHelper.getDateId(pm.url),
      pm.dateId,
      pm.title,
      pm.description,
      "",
      DailyPostsHelper.getSummaryUrl(pm.url),
      (pm.hasContent) ? DailyPostsHelper.getContentUrl(pm.url) : null,
      // (pm.thumbnail) ? DailyPostsHelper.getImageUrl(imgPrefix, pm.thumbnail) : null
      (pm.thumbnail) ? DailyPostsHelper.getImageUrl(pm.url, pm.thumbnail) : null
    );
    entry.imgPrefix = imgPrefix;
    entry.permalinkPath = PermalinkPathUtil.getPermalinkPath(pm.dateId, pm.title, pm.description);
    entry.date = DateIdUtil.convertToDate(entry.id);  // For now, entry.id is dateId.
    if (pm.hasContent) {
      entry.showContent = true;
    }
    if(isDL()) dl.log(`entry = ${entry}`);
    return entry;
  }

}
