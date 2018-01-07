import { Injectable } from '@angular/core';
import { DateRange, DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
// import { LocalStorageService } from '@ngcore/core';
import { CommonLinkUtil } from '@ngcore/link';
import { DateRangeUtil } from '@ngcore/time';


@Injectable()
export class DailyPostsHelper {
  // // Singleton.
  // private static _Instance: (DailyPostsHelper | null) = null;
  constructor(
    private appConfig: AppConfig,
    // private localStorageService: LocalStorageService
  ) { }
  // public static getInstance(): DailyPostsHelper {
  //   return this._Instance || (this._Instance = new DailyPostsHelper());
  // }


  // // temporary
  // public static DEFAULT_MAX_DATES = 100;
  // // private static MAX_POSTS = 100;
  // tbd:
  private static DEFAULT_POST_FOLDER = "posts/";

  private _postFolder: (string | null) = null;
  public get postFolder(): string {
    if (!this._postFolder) {
      let folder = this.appConfig.getString("blog-post-folder", DailyPostsHelper.DEFAULT_POST_FOLDER);
      this._postFolder = (folder.endsWith('/')) ? folder : folder + "/";
      console.log(`this._postFolder = ${this._postFolder}`);
    }
    return this._postFolder;
  }


  // tbd:
  // Read this from config.
  private static URL_POST_METADATA = "post.json";
  private static URL_POST_SUMMARY = "summary.md";
  private static URL_POST_CONTENT = "content.md";

  public getPostUrl(dateId: string): string {
    let url = this.postFolder + dateId + '/';
    return url;
  }

  // temporary
  public getImgFolder(dateId: string): string {
    // return this.postFolder;
    return DailyPostsHelper.getImgPrefix(this.getPostUrl(dateId));
  }

  // tbd: Make img folder relative to posts Url???
  public static getImgPrefix(postUrl: string): string {
    return postUrl;
  }
  
  public static getImageUrl(postUrl: string, image: string): string {
    let imgPrefix = DailyPostsHelper.getImgPrefix(postUrl);
    let imgUrl = CommonLinkUtil.buildImageUrl(imgPrefix, image);
    return imgUrl;
  }
  // public static getImageUrl(imgPrefix: string, image: string): string {
  //   // TBD: Need to support ".."? e.g. image = "../image/thumbnail.jpg", ...
  //   return imgPrefix + image;
  // }


  public static getMetadataUrl(postUrl: string): string {
    if(!postUrl) {
      return '';  // ???
    }
    return postUrl + DailyPostsHelper.URL_POST_METADATA;
  }
  public static getPostUrlFromMetadataUrl(metadataUrl: string): (string | null) {
    if(!metadataUrl) {
      return null;   // ???
    }
    let postUrl = metadataUrl.substr(0, metadataUrl.length - DailyPostsHelper.URL_POST_METADATA.length);
    console.log(`getPostUrlFromMetadataUrl() metadataUrl = ${metadataUrl}; postUrl = ${postUrl}`);
    return postUrl;
  }

  public static getSummaryUrl(postUrl: string): string {
    if(!postUrl) {
      return '';  // ???
    }
    return postUrl + DailyPostsHelper.URL_POST_SUMMARY;
  }
  public static getPostUrlFromSummaryUrl(summaryUrl: string): (string | null) {
    if(!summaryUrl) {
      return null;   // ???
    }
    let postUrl = summaryUrl.substr(0, summaryUrl.length - DailyPostsHelper.URL_POST_SUMMARY.length);
    console.log(`getPostUrlFromSummaryUrl() summaryUrl = ${summaryUrl}; postUrl = ${postUrl}`);
    return postUrl;
  }

  public static getContentUrl(postUrl: string): string {
    if(!postUrl) {
      return '';  // ???
    }
    return postUrl + DailyPostsHelper.URL_POST_CONTENT;
  }
  public static getPostUrlFromContentUrl(contentUrl: string): (string | null) {
    if(!contentUrl) {
      return null;   // ???
    }
    let postUrl = contentUrl.substr(0, contentUrl.length - DailyPostsHelper.URL_POST_CONTENT.length);
    console.log(`getPostUrlFromContentUrl() contentUrl = ${contentUrl}; postUrl = ${postUrl}`);
    return postUrl;
  }

  // It is assumed that
  //    postUrl has the following format: "..../yyyymmdd/"
  // tbd: We need more robust/more flexible implementation.
  public static getDateId(postUrl: string): string {
    // tbd: validate?
    let dateId = postUrl.substr(postUrl.length - 9, 8);
    console.log(`getDate() dateId = ${dateId}; postUrl = ${postUrl}`);
    return dateId;
  }
  public static getDate(postUrl: string): Date {
    let dateId = this.getDateId(postUrl);
    let date = DateIdUtil.convertToDate(dateId);
    console.log(`getDate() dateId = ${dateId}; date = ${date}`);
    return date;
  }

  // Note that the "endDate" is excluded.
  public getDailyPostUrls(
    dayCount: number,  // = DailyPostsHelper.DEFAULT_MAX_DATES,
    endDate: string,   // = DateIdUtil.getTomorrowId(),
    oldPosts: (string[] | null) = null
  ): string[] {
    console.log(`>>>> getDailyPostUrls() dayCount = ${dayCount}; endDate = ${endDate}`);

    if (oldPosts && oldPosts.length > 0) {
      oldPosts = oldPosts.sort().reverse();
      let dateId = DateIdUtil.getNextDayId(oldPosts[0]);
      let count = new DateRange(dateId, endDate).dayCount;
      if (count < dayCount) {
        dayCount = count;
      }
    }

    let urls: string[] = [];
    let dates = DateRangeUtil.getDates(dayCount, endDate).reverse();
    if (oldPosts && oldPosts.length > 0) {
      dates = dates.concat(oldPosts);
    }
    console.dir(dates);

    if (dates) {
      for (let d of dates) {
        // let url = DailyPostsHelper.POSTS_FOLDER + d + '/' + DailyPostsHelper.URL_POST_METADATA;
        // let url = DailyPostsHelper.POSTS_FOLDER + d + '/';
        let url = this.getPostUrl(d);
        // console.log(`>>>> date = ${d}; url = ${url}`);
        urls.push(url);
      }
    }
    return urls;
  }

}
