import { DateTimeUtil, DateIdUtil } from '@ngcore/core';

import { ChangeFrequency, SiteEntry } from '@ngcore/link';

import { PostMetadata } from '../../blog/post-metadata';
import { DailyPostsHelper } from '../../helpers/daily-posts-helper';


export namespace SitemapEntryUtil {

  export function buildAbsoluteUrl(hostUrl: (string | null), path: string): string {
    // tbd:
    if (!hostUrl) {
      return path;
    }
    if (!path) {
      return hostUrl;   // ???
    }
    // Exclude absolute urls.
    if (path.startsWith('http')) {
      return path;
    } else {
      if (!hostUrl.endsWith('/')) {
        hostUrl += '/';
      }
      if (path.startsWith('/')) {
        path = path.substring(1);
      }

      let absUrl = hostUrl + path;
      console.log(`buildAbsoluteUrl(): absUrl = ${absUrl} from hostUrl = ${hostUrl}; path = ${path}`);
      return absUrl;
    }
  }

  // temporary
  export function buildFromPostMetadata(pm: PostMetadata, hostUrl: string): (SiteEntry | null) {
    if (!pm.hasContent) {
      return null;
    }
    let entry = new SiteEntry(
      // TBD:
      SitemapEntryUtil.buildAbsoluteUrl(hostUrl, `post/${pm.dateId}`),   // This should match the route definition.
      // pm.created,
      DateIdUtil.convertToEpochMillis(pm.dateId),
      ChangeFrequency.weekly,
      0.5,
      true
    );
    console.log(`entry = ${entry}`);
    return entry;
  }

}
