import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { DateTimeUtil, DateIdUtil } from '@ngcore/core';
import { BrowserWindowService } from '@ngcore/core';
import { LazyLoaderService } from '@ngcore/lazy';
import { CommonMarkUtil } from '@ngcore/mark';
import { CommonMarkEntryComponent } from '@ngcore/mark';

import { environment } from '../../../environments/environment';

import { ExpansionStep } from '../../helpers/core/expansion-step';
import { AccordionUiHelper } from '../../helpers/accordion-ui-helper';

import { SiteInfo } from '../../common/site-info';
import { ContactInfo } from '../../common/contact-info';

import { MarkdownDocEntry } from '../../entry/markdown-doc-entry';
import { MarkdownEntryUtil } from '../../entry/util/markdown-entry-util';
import { docEntryNgBlogHeader } from './entries/ngblog-header';
// import { docEntryNgBlogFooter } from './entries/ngblog-footer';

import { mySiteInfo } from './info/my-site-info';
import { myContactInfo } from './info/my-contact-info';

import { VisitorTokenService } from '../../services/visitor-token.service';
import { DailyPostsHelper } from '../../helpers/daily-posts-helper';
import { PostListService } from '../../services/post-list.service';
import { BlogPostService } from '../../services/blog-post.service';
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

  docEntries: MarkdownDocEntry[] = [
    // docEntryNgBlogHeader,
    // // docEntryNgBlogFooter,
  ];

  // temporary
  // tbd: instead of loading randomly,
  // we should really load newer posts first and older posts later.
  delayInterval: number[] = [250, 2500];

  constructor(
    private dialog: MatDialog,
    private elementRef: ElementRef,
    private router: Router,
    private browserWindowService: BrowserWindowService,
    private lazyLoaderService: LazyLoaderService,
    private accordionUiHelper: AccordionUiHelper,
    private visitorTokenService: VisitorTokenService,
    // private dailyPostsHelper: DailyPostsHelper,
    private postListService: PostListService,
    private blogPostService: BlogPostService,
  ) {
    // tbd:
    this.siteInfo = mySiteInfo;
    this.contactInfo = myContactInfo;
  }

  ngOnInit() {
    // this.entryNgAuthModules.setMarkdownInput(this.docEntryNgAuthModules);

    this.hasValidVisitorToken = this.visitorTokenService.hasValidVisitorToken;
    this.hasNonBinaryVisitorToken = this.visitorTokenService.hasNonBinaryVisitorToken;

    if (this.hasNonBinaryVisitorToken) {
      this.contactEmail = this.contactInfo.email;
      this.contactPhone = this.contactInfo.phone;
      this.contactWebsite = this.contactInfo.website;
    } else {
      this.contactEmail = '';
      this.contactPhone = '';
      this.contactWebsite = '';
    }

    // tempoary
    let maxDates = 30;
    this.postListService.getDailyPosts(maxDates).subscribe(posts => {
      for (let pm of posts) {
        console.log(`post metadata = ${pm}`);
        let entry = MarkdownEntryUtil.buildFromPostMetadata(pm, this.hasValidVisitorToken);
        // let entry = new MarkdownDocEntry(
        //   // (pm.dateId) ? pm.dateId : DailyPostsHelper.getInstance().getDateId(pm.url),
        //   pm.dateId,
        //   pm.title,
        //   pm.description,
        //   "",
        //   DailyPostsHelper.getInstance().getSummaryUrl(pm.url),
        //   (pm.hasContent) ? DailyPostsHelper.getInstance().getContentUrl(pm.url) : null
        // );
        // entry.date = DateIdUtil.convertToDate(entry.id);  // For now, entry.id is dateId.
        // if (this.hasValidVisitorToken    // temporary
        //   && pm.hasContent) {
        //   entry.showContent = true;
        // }
        console.log(`entry = ${entry}`);
        this.docEntries.push(entry);
      }
      if(this.docEntries.length == 0) {
        this.docEntries.push(docEntryNgBlogHeader);  // Rename this to "placeholder"...
      }
    });



    // tbd:
    // docEntryNgBlogHeader.debugEnabled = true;
    // // docEntryNgBlogHeader.rendererOptions = {safe: false};
    // ...

    // // For now,
    // // Enable detail dialogs only in devel.
    // if (environment.detailEnabled
    //   && this.hasValidVisitorToken) {
    //   // tbd:
    //   docEntryNgBlogHeader.showContent = true;

    //   // // Just to make sure.
    //   // // If the detail content does not exist, set showContent to false.
    //   // for (let ety of this.docEntries) {
    //   //   let id = ety.id;
    //   //   ety.showContent = (ety.showContent && this.detailInfoRegistry.hasDetailInfo(id));
    //   // }
    // }

    // tbd:
    docEntryNgBlogHeader.skipPrinting = true;
    // docEntryNgBlogFooter.skipPrinting = true;

    // // tbd:
    // if (!this.hasNonBinaryVisitorToken) {
    //   // Note: This actually does not remove the entry.
    //   // It only hides the content of the entry.
    //   docEntryContactInfo.skipDisplay = true;
    // }


    // tbd:
    // load/pre-cache all entry content here ????
    // (It should not be necessary since CommonMarkEntryComponent uses useCache==true ???)
    // for (let mde of this.docEntries) {
    //   if (mde.markdownUrl) {
    //     this.lazyLoaderService.loadText(mde.markdownContent, true).subscribe(content => {
    //       // console.log(`url = ${mde.markdownUrl}; content = ${content}`);
    //     });
    //   }
    // }
    // ...

  }

  ngAfterViewInit() {
    // ???
    // let b = document.getElementById('button1');
    // b.onclick = this.onClickNgBlogHeaderIntroduction;
    // // b.setAttribute('click', 'onClickNgBlogHeaderIntroduction');
    // ???

    // let b = this.elementRef.nativeElement.getElementById('button1');
    // b.onclick = this.onClickNgBlogHeaderIntroduction;

    // // this.elementRef.nativeElement.querySelector('button').addEventListener('click', this.onClickNgBlogHeaderIntroduction());
    // this.elementRef.nativeElement.querySelector('button').addEventListener('click', this.onClickNgBlogHeaderIntroduction.bind(this));

  }


  // private _generateMarkdownForPrinting(): string {
  //   let mark = '';
  //   for (let mde of this.docEntries) {
  //     if (!mde.skipPrinting) {
  //       // markdownContent takes precedence over markdownUrl.
  //       if (mde.summaryContent) {
  //         mark += mde.summaryContent;
  //       } else {
  //         if (mde.summaryUrl) {
  //           // tbd: async will not work here...
  //           // this.lazyLoaderService.loadText(mde.markdownUrl, true).subscribe(content => {
  //           //   mark += content;
  //           // });
  //           let text = this.lazyLoaderService.getText(mde.summaryUrl);
  //           if (text) {
  //             mark += text;
  //           }
  //         } else {
  //           // Nothing to print.
  //         }
  //       }
  //       // tbd: add line breaks between sections???
  //     }
  //   }
  //   return mark;
  // }

  // private _generateHTMLForPrinting(): string {
  //   let mark = this._generateMarkdownForPrinting();
  //   let html = CommonMarkUtil.convertToHTML(mark);
  //   return html;
  // }

  // handlePrint() {
  //   console.log("handlePrint() clicked.");

  //   let html = `<div style="padding: 16px;">`;

  //   html += `<div style="padding-top: 4px; padding-bottom: 4px;">`;
  //   html += `<span style="font-weight: bold; font-size: 1.2em;">${this.siteInfo.name}, ${this.siteInfo.title}</span><br>`;
  //   html += `<span style="font-style: italic;">Email: ${this.contactEmail}</span>`;
  //   if (this.contactPhone) {
  //     html += `<span style="font-style: italic;">;&nbsp; Phone: ${this.contactPhone}</span>`;
  //   }
  //   html += `<hr>`;
  //   html += `</div>`;

  //   html += `<div style="padding-bottom: 4px;">`;
  //   html += this._generateHTMLForPrinting();
  //   html += `</div>`;

  //   html += `<div style="padding-top: 4px; padding-bottom: 4px;">`;
  //   html += `<hr>`;
  //   if (this.contactWebsite) {
  //     html += `<span style="font-style: italic; font-size: 0.95em;">Website: ${this.contactWebsite}</span><br>`;
  //   }
  //   html += `</div>`;

  //   html += `</div>`;



  //   // console.log(">>> html = \n" + html);

  //   if (this.browserWindowService.window) {
  //     let win = this.browserWindowService.window;
  //     var popup = win.open("", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=720,top=100,left=200");
  //     popup.document.body.innerHTML = html;
  //   }

  // }


  // Accordion UI.
  // private _step = 0;
  get step(): number {
    // return this._step;
    return this.accordionUiHelper.step;
  }
  // set step(_step: number) {
  //   this._step = _step;
  // }

  // TBD:
  // Remove the stored step if "collapse" happens???

  setStep(index: number) {
    // this.step = index;
    this.accordionUiHelper.step = index;
  }
  nextStep() {
    // this.step++;
    this.accordionUiHelper.incrementStep(this.docEntries.length);
  }
  prevStep() {
    // this.step--;
    this.accordionUiHelper.decrementStep();
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

  openContentDialog(idx: number) {
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

    if(entry.showContent) {
      let dateId = entry.id;
      let contentUrl = entry.contentUrl;

      // let routeUrl = `post/${dateId}`;
      // this.router.navigateByUrl(routeUrl);
      // this.router.navigate(['/post', dateId]).then(suc => {
      //   console.log(`navigate() suc = ${suc}`);
      // });
      this.router.navigate(['/post', dateId, {entry: JSON.stringify(entry)}]).then(suc => {
        console.log(`navigate() suc = ${suc}`);
      });
    }

  }

}
