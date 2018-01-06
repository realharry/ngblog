// DocEntry is a ViewModel (as in MVVM).
export abstract class DocEntry {
  // tbd.
  // public dateId: string;
  public date: Date;   // Date based on the id (which is a "dateId").

  // tbd:
  // public content: string;
  // public skipPrinting: boolean = false;
  public skipDisplay: boolean = false;

  // public detailLink: (string | null) = null;  
  public showContent: boolean = false;

  constructor(
    public id = '',   // "dateId" used for id. There can be no more than one entries per day.
    public title = '',
    public description: string = '',
    public summaryContent: string = '',
    public summaryUrl: string = '',
    public contentUrl: (string | null) = null
  )  {
  }

  // At this point,
  // this.hasContent == this.showContent
  // since during processing 
  //    contentUrl will be populated (regardless of whether the content.md actually exists) if showContent == true.
  public get hasContent(): boolean {
    return this.showContent && !!this.contentUrl;
  }

  public get isEmpty(): boolean {
    return (
      !this.title 
      && !this.description 
      && (!this.summaryContent && !this.summaryUrl)
      && !this.contentUrl
    );
  }


  public toString(): string {
    let str = '';
    str += `id:${this.id};`
    str += `title:${this.title};`
    str += `description:${this.description};`
    // str += `summaryContent:${this.summaryContent};`
    str += `summaryUrl:${this.summaryUrl};`
    str += `contentUrl:${this.contentUrl};`
    str += `date:${this.date};`
    // str += `skipPrinting:${this.skipPrinting};`
    str += `skipDisplay:${this.skipDisplay};`
    str += `showContent:${this.showContent};`
    return str;
  }

}
