import { Component, OnInit, AfterViewInit, ViewChild, Input, Output } from '@angular/core';
import { HostListener } from '@angular/core';
// import { ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
// import { MatDialog } from '@angular/material';

import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { AppConfig } from '@ngcore/core';
import { BrowserWindowService } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/idle';
import { CommonMarkUtil } from '@ngcore/mark';
import { CommonMarkEntryComponent } from '@ngcore/mark';

import { environment } from '../../../environments/environment';

// import { ExpansionStep } from '../../helpers/core/expansion-step';
import { PageAccordionUiHelper } from '../../helpers/page-accordion-ui-helper';

import { SiteInfo } from '../../common/site-info';
import { ContactInfo } from '../../common/contact-info';

import { MarkdownDocEntry } from '../../entry/markdown-doc-entry';
import { MarkdownEntryUtil } from '../../entry/util/markdown-entry-util';
import { docEntryPlaceholder } from './entries/ngblog-placeholder';

import { defaultSiteInfo } from '../info/default-site-info';
import { defaultContactInfo } from '../info/default-contact-info';

import { VisitorTokenService } from '../../services/visitor-token.service';
import { DailyPostsHelper } from '../../helpers/daily-posts-helper';
import { PostListService } from '../../services/post-list.service';
import { BlogPostService } from '../../services/blog-post.service';
import { BlogPostRegistry } from '../registry/blog-post-registry';
// import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';


@Component({
  selector: 'app-ngblog-site',
  templateUrl: './ngblog-site.component.html',
  styleUrls: ['./ngblog-site.component.css']
})
export class NgBlogSiteComponent implements OnInit, AfterViewInit {

  // @ViewChild("entryNgAuthModules") entryNgAuthModules: CommonMarkEntryComponent;

  hasValidVisitorToken: boolean = false;
  hasNonBinaryVisitorToken: boolean = false;
  contactEmail: string = '';
  contactPhone: string = '';
  contactWebsite: string = '';

  siteInfo: SiteInfo;
  contactInfo: ContactInfo;
  // imgPrefix: string;

  docEntries: MarkdownDocEntry[] = [
    // docEntryNgBlogHeader,
    // // docEntryNgBlogFooter,
  ];

  // temporary
  // tbd: instead of loading randomly,
  // we should really load newer posts first and older posts later.
  delayInterval: number[] = [250, 2500];

  // For thumbnail image resizing
  private windowWidth: number = 0;
  private windowHeight: number = 0;
  // temporary
  private static WIDTH_THRESHOLD_0 = 460;
  private static WIDTH_THRESHOLD_1 = 520;
  private static WIDTH_THRESHOLD_2 = 640;
  // temporary

  // temporary
  hostUrl: string;

  constructor(
    // private dialog: MatDialog,
    // private elementRef: ElementRef,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appConfig: AppConfig,
    private browserWindowService: BrowserWindowService,
    private lazyLoaderService: LazyLoaderService,
    private accordionUiHelper: PageAccordionUiHelper,
    private visitorTokenService: VisitorTokenService,
    private dailyPostsHelper: DailyPostsHelper,
    private postListService: PostListService,
    private blogPostService: BlogPostService,
    private blogPostRegistry: BlogPostRegistry,
  ) {
    if(this.browserWindowService.window) {
      this.hostUrl = this.browserWindowService.window.location.protocol + '//' + this.browserWindowService.window.location.host + '/';
    } else {
      this.hostUrl = '/';   // ???
    }
    console.log(`hostUrl = ${this.hostUrl}`);

    this.siteInfo = new SiteInfo();
    this.contactInfo = new ContactInfo();
    // this.imgPrefix = '';
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event && event.target) {
      let newWidth = event.target.innerWidth;
      let newHeight = event.target.innerHeight;
      if (this.windowWidth != newWidth
        || this.windowHeight != newHeight
      ) {
        this.windowWidth = newWidth;
        this.windowHeight = newHeight;
        // console.log(`onResize() newWidth = ${newWidth}, newHeight = ${newHeight}`);
      }
    }
  }

  ngOnInit() {
    console.log(">>> ngOnInit()");

    if (this.browserWindowService.window) {
      this.windowWidth = this.browserWindowService.window.innerWidth;
      this.windowHeight = this.browserWindowService.window.innerHeight;
      console.log(`ngOnInit() this.windowWidth = ${this.windowWidth}, this.windowHeight = ${this.windowHeight}`);
    }

    // // This is needed for pagination.
    // // (Alternatively, we could reload the content after goToPreviousPage() and goToNextPage() calls.)
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // --> moved to AppComponent.

    // let config = this.appConfig.all;
    // for (let k in config) {
    //   console.log(`:::config::: key = ${k}; value = ${config[k]}`);
    // }

    let sInfo = this.appConfig.get('site-info');
    if (sInfo) {
      this.siteInfo.copy(sInfo);
    } else {
      this.siteInfo.copy(defaultSiteInfo);
    }

    let cInfo = this.appConfig.get('contact-info');
    if (cInfo) {
      this.contactInfo.copy(cInfo);
    } else {
      this.contactInfo.copy(defaultContactInfo);
    }

    // // testing...
    // this.imgPrefix = this.dailyPostsHelper.imgFolder;

    // TBD: For pagination
    let pageNumber = this.activatedRoute.snapshot.queryParams['page'];
    console.log(`>>> pageNumber = ${pageNumber}.`);
    if (pageNumber) {   // Note: 0 is an invalid pageNumber.
      // this._currentPage = +pageNumber;
      try {
        let p = parseInt(pageNumber);
        this._currentPage = p;
      } catch (ex) {
        // Just keep the current page number.
      }
    }

    // this.entryNgAuthModules.setMarkdownInput(this.docEntryNgAuthModules);

    this.hasValidVisitorToken = this.visitorTokenService.hasValidVisitorToken;
    this.hasNonBinaryVisitorToken = this.visitorTokenService.hasNonBinaryVisitorToken;

    // if (this.hasNonBinaryVisitorToken) {
    //   this.contactEmail = (this.contactInfo.email) ? this.contactInfo.email : '';
    //   this.contactPhone = (this.contactInfo.phone) ? this.contactInfo.phone : '';
    //   this.contactWebsite = (this.contactInfo.website) ? this.contactInfo.website : '';
    // } else {
    //   this.contactEmail = '';
    //   this.contactPhone = '';
    //   this.contactWebsite = '';
    // }
    this.contactEmail = (this.contactInfo.email) ? this.contactInfo.email : '';
    this.contactPhone = (this.contactInfo.phone) ? this.contactInfo.phone : '';
    this.contactWebsite = (this.contactInfo.website) ? this.contactInfo.website : '';
    console.log(`>>>>> this.contactEmail = ${this.contactEmail}`);

    // Async.
    this.loadBlogPostEntries();
  }

  private loadBlogPostEntries() {

    // this.blogPostRegistry.buildEntryMap().subscribe(map => {
    //   this.docEntries = [];
    //   for(let dateId in map) {
    //     this.docEntries.push(map[dateId]);
    //   }
    //   if (this.docEntries.length == 0) {
    //     this.docEntries.push(docEntryNgBlogHeader);  // Rename this to "placeholder"...
    //   }
    // });
    this.blogPostRegistry.buildEntryMap().subscribe(entries => {
      this.docEntries = [];
      // tbd: pagination here....
      if (this.isPaginationEnabled) {
        let listLength = entries.length;
        this._totalPages = Math.ceil(listLength / this.itemCountPerPage);
        if (this._totalPages == 0) {
          this._totalPages = 1;
        }
        if (!this.isPageNumberValid(this._currentPage)) {
          // ???
          this._currentPage = 1;
        }
        let startIdx = this.itemCountPerPage * (this._currentPage - 1);
        let maxIdx = startIdx + this.itemCountPerPage;
        let endIdx = (maxIdx < listLength) ? maxIdx : listLength;
        for (let i = startIdx; i < endIdx; i++) {
          let entry = entries[i];

          // // temporary
          // entry.debugEnabled = true;
          // // temporary

          this.docEntries.push(entry);
        }
      } else {
        for (let entry of entries) {
          this.docEntries.push(entry);
        }
      }
      if (this.docEntries.length == 0) {
        this.docEntries.push(docEntryPlaceholder);
      }
      let entryLength = this.docEntries.length;  // Should be > 0.

      // temporary
      this.delayInterval[0] = 250;
      this.delayInterval[1] = 500 + Math.floor(250 * Math.sqrt(entryLength));
    });

    // // tempoary
    // let maxDates = 30;
    // maxDates = this.appConfig.getNumber("max-post-age", maxDates);
    // this.postListService.getDailyPosts(maxDates).subscribe(posts => {
    //   for (let pm of posts) {
    //     console.log(`post metadata = ${pm}`);
    //     let entry = MarkdownEntryUtil.buildFromPostMetadata(pm, this.hasValidVisitorToken);
    //     // let entry = new MarkdownDocEntry(
    //     //   // (pm.dateId) ? pm.dateId : DailyPostsHelper.getDateId(pm.url),
    //     //   pm.dateId,
    //     //   pm.title,
    //     //   pm.description,
    //     //   "",
    //     //   DailyPostsHelper.getSummaryUrl(pm.url),
    //     //   (pm.hasContent) ? DailyPostsHelper.getContentUrl(pm.url) : null
    //     // );
    //     // entry.date = DateIdUtil.convertToDate(entry.id);  // For now, entry.id is dateId.
    //     // if (this.hasValidVisitorToken    // temporary
    //     //   && pm.hasContent) {
    //     //   entry.showContent = true;
    //     // }
    //     console.log(`entry = ${entry}`);
    //     this.docEntries.push(entry);
    //   }
    //   if (this.docEntries.length == 0) {
    //     this.docEntries.push(docEntryNgBlogHeader);  // Rename this to "placeholder"...
    //   }
    // });

    // tbd:
    // docEntryNgBlogHeader.debugEnabled = true;
    // // docEntryNgBlogHeader.rendererOptions = {safe: false};
    // ...
  }


  ngAfterViewInit() {
    console.log(">>> ngAfterViewInit()");
  }


  openAdminHome() {
    // tbd: if "v" param is already set in the URL, use that value???
    // this.visitorTokenService.visitorToken = this.visitorTokenService.adminToken;
    // let qParams = {v: this.visitorTokenService.visitorToken};
    let qParams = {v: this.visitorTokenService.adminToken};
    this.router.navigate(['admin'], {queryParams: qParams}).then(suc => {
      console.log(`openAdminHome() suc = ${suc}`);
    });
  }

  private _showAdminButton: boolean;
  get showAdminButton(): boolean {
    if(this._showAdminButton !== true && this._showAdminButton !== false) {
      this._showAdminButton = this.appConfig.getBoolean("show-admin-button", false);
    }
    return this._showAdminButton;
  }


  private _showPlaceholderThumbnail: boolean;
  get showPlaceholderThumbnail(): boolean {
    if (this._showPlaceholderThumbnail !== true && this._showPlaceholderThumbnail !== false) {
      this._showPlaceholderThumbnail = this.appConfig.getBoolean("show-placeholder-thumbnail", false);
      console.log(`>>>>> this._showPlaceholderThumbnail = ${this._showPlaceholderThumbnail}`);
    }
    return this._showPlaceholderThumbnail;
  }

  // temporary
  get thumbnailWidth(): number {
    return this._thumbnailSize;
  }
  get thumbnailHeight(): number {
    // Note that we are using width not height for comparison...
    return this._thumbnailSize;
  }
  private get _thumbnailSize(): number {
    if (this.windowWidth == 0 || this.windowWidth > NgBlogSiteComponent.WIDTH_THRESHOLD_2) {
      return 160;
    } else if (this.windowWidth > NgBlogSiteComponent.WIDTH_THRESHOLD_1) {
      return 120;
    } else if (this.windowWidth > NgBlogSiteComponent.WIDTH_THRESHOLD_0) {
      return 80;
    } else {
      return 60;
    }
  }
  get thumbnailMargin(): string {
    let gap = Math.floor(this._thumbnailSize / 10);
    return `16px ${gap}px 8px 0px`;
  }
  get thumbnailPadding(): string {
    let pad = Math.floor(this._thumbnailSize / 20);
    return `8px ${pad}px ${pad}px ${pad}px`;
  }

  getPlaceholderThumbnail(entryTitle: (string | null) = null): string {
    // TBD:
    return `http://via.placeholder.com/${this.thumbnailWidth}x${this.thumbnailHeight}`;
  }


  private _displayContactEmail: boolean;
  get displayContactEmail(): boolean {
    if (this._displayContactEmail !== true && this._displayContactEmail !== false) {
      let showContactEmail = this.appConfig.getBoolean("show-contact-email", false);
      console.log(`>>>>> showContactEmail = ${showContactEmail}`);
      this._displayContactEmail =
        !!(this.contactEmail) // tbd: validate email?
        &&
        showContactEmail;
      console.log(`>>>>> this._displayContactEmail = ${this._displayContactEmail}`);
    }
    return this._displayContactEmail;
  }


  // Accordion UI.

  get step(): number {
    return this.accordionUiHelper.getStep(this._currentPage);
  }
  set step(index: number) {
    this.accordionUiHelper.setStep(this._currentPage, index);
  }

  // TBD:
  // Remove the stored step if "collapse" happens???

  nextStep() {
    this.accordionUiHelper.incrementStep(this._currentPage, this.docEntries.length);
  }
  prevStep() {
    this.accordionUiHelper.decrementStep(this._currentPage);
  }


  // TBD:
  // Pagination support

  private _itemCountPerPage = 0;
  get itemCountPerPage(): number {
    if (this._itemCountPerPage == 0) {
      const defaultItemCount = 10;  // temporary
      // this._itemCountPerPage = this.appConfig.getNumber("item-count-per-page", -1);
      this._itemCountPerPage = this.appConfig.getNumber("item-count-per-page", defaultItemCount);
    }
    return this._itemCountPerPage;
  }

  private _isPaginationEnabled: boolean;
  get isPaginationEnabled(): boolean {
    if (this._isPaginationEnabled !== true && this._isPaginationEnabled !== false) {
      this._isPaginationEnabled = (this.itemCountPerPage > 0);
    }
    return this._isPaginationEnabled;
  }

  private isPageNumberValid(pageNumber: number): boolean {
    return (pageNumber >= 1) && (pageNumber <= this.totalPages);
  }

  private _currentPage: number = 1;
  get currentPage(): number {
    return this._currentPage;
  }
  private _totalPages: number = 1;
  get totalPages(): number {
    return this._totalPages;
  }
  // tbd:
  // if pagination is not enabled,
  // display "step/entry-length" instead???
  get pageIndicia(): string {
    return `${this.currentPage}/${this.totalPages}`;
  }

  get nextPage(): number {
    return (this.currentPage >= this.totalPages) ? this.totalPages : this.currentPage + 1;
  }
  get previousPage(): number {
    return (this.currentPage <= 1) ? 1 : this.currentPage - 1;
  }

  // temporary
  get isInFirstPage(): boolean {
    return (this.currentPage == 1);
  }
  get isInLastPage(): boolean {
    return (this.currentPage == this.totalPages);
  }

  goToPreviousPage() {
    console.log("goToPreviousPage()");

    this.router.navigate(['/'], { queryParams: { page: this.previousPage } }).then(suc => {
      console.log(`goToPreviousPage() suc = ${suc}`);
      if (suc) {
        // reload the content.
      }
    });
  }
  goToNextPage() {
    console.log("goToNextPage()");

    this.router.navigate(['/'], { queryParams: { page: this.nextPage } }).then(suc => {
      console.log(`goToNextPage() suc = ${suc}`);
      if (suc) {
        // reload the content.
      }
    });
  }



  // // Markdown button click handlers
  // onClickNgBlogHeaderIntroduction() {
  //   console.log("onClickNgBlogHeaderIntroduction() ");
  // }


  // showContentDialog(idx: number) {
  //   if(this.step === idx) {
  //     console.log("showContentDialog() idx = " + idx);
  //     // Open the dialog.
  //   } else {
  //     // ignore
  //   }
  // }

  openContentPage(idx: number) {
    console.log("showContentDialog() idx = " + idx);

    let entry = this.docEntries[idx];  // TBD: validate idx ???
    console.log("showContentDialog() entry = " + entry);

    // tbd:
    // Use config option:
    // Using dialog vs using full nav component.....
    // For SEO reasons, "page" is probably better than a dialog.

    // let dialogRef = this.dialog.open(DetailDialogComponent, {
    //   width: '640px',
    //   height: '480px',
    //   data: { id: entry.id }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed. result = ' + result);
    // });

    if (entry.showContent) {
      let dateId = entry.id;
      // let contentUrl = entry.contentUrl;

      // // let routeUrl = `post/${dateId}`;
      // // this.router.navigateByUrl(routeUrl);
      // this.router.navigate(['/post', dateId]).then(suc => {
      //   console.log(`navigate() suc = ${suc}`);
      // });
      // // this.router.navigate(['/post', dateId, { entry: JSON.stringify(entry) }]).then(suc => {
      // //   console.log(`navigate() suc = ${suc}`);
      // // });

      let permalinkPath = entry.permalinkPath;
      this.router.navigate(['', permalinkPath]).then(suc => {
        console.log(`navigate() suc = ${suc}; permalinkPath = ${permalinkPath}`);
      });
    }

  }

}
