import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MarkdownDetailInfo } from '../../detail/markdown-detail-info';
import { MarkdownDetailEntry } from '../../detail/markdown-detail-entry';
import { DetailInfoRegistry } from './registry/detail-info-registry';
// import { VisitorTokenRegistry } from '../../visitors/visitor-token-registry';
import { VisitorTokenService } from '../../services/visitor-token.service';


@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.css']
})
export class DetailDialogComponent implements OnInit {

  // private id: string;
  private detailInfo: MarkdownDetailInfo;

  constructor(
    private dialogRef: MatDialogRef<DetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private detailInfoRegistry: DetailInfoRegistry,
    // private visitorTokenRegistry: VisitorTokenRegistry  // tbd.
    private visitorTokenService: VisitorTokenService   // tbd.
  ) {
    // this.id = data.id;
    let id = data.id;
    this.detailInfo = this.detailInfoRegistry.getDetailInfo(id);
    if(! this.detailInfo) {
      this.detailInfo = new MarkdownDetailInfo(); // ???
    }
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeMe() {
    this.dialogRef.close();
  }

}
