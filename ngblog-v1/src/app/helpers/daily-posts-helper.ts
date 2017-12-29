import { Injectable } from '@angular/core';
import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { LocalStorageService } from '@ngcore/core';
import { DateRangeUtil } from '@ngcore/time';


@Injectable()
export class DailyPostsHelper {
  // // Singleton.
  // private static _Instance: (DailyPostsHelper | null) = null;
  constructor(
    private localStorageService: LocalStorageService
  ) { }
  // public static getInstance(): DailyPostsHelper {
  //   return this._Instance || (this._Instance = new DailyPostsHelper());
  // }


  // tbd:
  private static POSTS_FOLDER = "posts/";

  // tbd:
  private static URL_POST_METADATA = "post.json";
  private static URL_POST_SUMMARY = "summary.md";
  private static URL_POST_CONTENT = "content.md";

  public getMetadataUrl(postUrl: string): string {
    return postUrl + DailyPostsHelper.URL_POST_METADATA;
  }
  public getSummaryUrl(postUrl: string): string {
    return postUrl + DailyPostsHelper.URL_POST_SUMMARY;
  }
  public getContentUrl(postUrl: string): string {
    return postUrl + DailyPostsHelper.URL_POST_CONTENT;
  }

  // Note that the "endDate" is excluded.
  public getDailyPostUrls(
    dayCount: number,
    dateId: string = DateIdUtil.getTomorrowId()
  ): string[] {
    console.log(`>>>> getDailyPostUrls() dayCount = ${dayCount}; dateId = ${dateId}`);

    let urls: string[] = [];
    let dates = DateRangeUtil.getDates(dayCount, dateId).reverse();
    console.dir(dates);
    if(dates) {
      for(let d of dates) {
        // let url = DailyPostsHelper.POSTS_FOLDER + d + '/' + DailyPostsHelper.URL_POST_METADATA;
        let url = DailyPostsHelper.POSTS_FOLDER + d + '/';
        // console.log(`>>>> date = ${d}; url = ${url}`);
        urls.push(url);
      }
    }
    return urls;
  }


}
