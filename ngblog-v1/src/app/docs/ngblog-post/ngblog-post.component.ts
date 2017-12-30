import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/lazy';
import { CommonMarkUtil } from '@ngcore/mark';
import { CommonMarkEntryComponent } from '@ngcore/mark';

import { SiteInfo } from '../../common/site-info';
import { mySiteInfo } from '../ngblog-site/info/my-site-info';
import { MarkdownDocEntry } from '../../entry/markdown-doc-entry';
import { MarkdownEntryUtil } from '../../entry/util/markdown-entry-util';
import { VisitorTokenService } from '../../services/visitor-token.service';
import { DailyPostsHelper } from '../../helpers/daily-posts-helper';
import { BlogPostService } from '../../services/blog-post.service';


@Component({
  selector: 'app-ngblog-post',
  templateUrl: './ngblog-post.component.html',
  styleUrls: ['./ngblog-post.component.css']
})
export class NgBlogPostComponent implements OnInit {

  private siteInfo: SiteInfo;
  private docEntry: MarkdownDocEntry;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lazyLoaderService: LazyLoaderService,
    private visitorTokenService: VisitorTokenService,
    // private dailyPostsHelper: DailyPostsHelper,
    private blogPostService: BlogPostService,
  ) {
    // tbd:
    this.siteInfo = mySiteInfo;
    this.docEntry = new MarkdownDocEntry();   // ???
  }

  ngOnInit() {
    let dateId = this.activatedRoute.snapshot.params['id'];
    console.log(`>>> path id = ${dateId}.`);

    let entry = this.activatedRoute.snapshot.params['entry'];
    console.log(`>>> entry = ${entry}`);

    if(entry) {
      this.docEntry = entry.clone();
    } else {
      let postUrl = DailyPostsHelper.getInstance().getPostUrl(dateId);
      let useCache = true;
      this.blogPostService.loadPostMetadata(postUrl, useCache).subscribe(pm => {
        console.log(`post metadata = ${pm}`);
        if(pm) {
          let entry = MarkdownEntryUtil.buildFromPostMetadata(pm, this.visitorTokenService.hasValidVisitorToken);
          console.log(`entry = ${entry}`);
          this.docEntry = entry;
        } else {
          // ????
        }
      });
    }
  }

  navigateBack() {
    this.location.back();
  }

}
