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
  private static POST_METADATA = "/post.json";

  // Note that the "endDate" is excluded.
  public getDailyPostUrls(
    dayCount: number,
    dateId: string = DateIdUtil.getTomorrowId()
  ): string[] {
    let urls: string[] = [];
    let dates = DateRangeUtil.getDates(dateId);
    if(dates) {
      for(let d of dates) {
        let post = DailyPostsHelper.POSTS_FOLDER + d + DailyPostsHelper.POST_METADATA;
        urls.push(post);
      }
    }
    return urls;
  }


}
