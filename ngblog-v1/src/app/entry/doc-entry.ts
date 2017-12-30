// DocEntry is a ViewModel (as in MVVM).
export abstract class DocEntry {
  // tbd.
  // public dateId: string;
  public date: Date;   // Date based on the id (which is a "dateId").

  // tbd:
  // public content: string;
  public skipPrinting: boolean = false;
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

  // public id = '';   // "dateId" used for id. There can be no more than one entries per day.
  // public title = '';
  // public description: string = '';
  // public summaryContent: string = '';
  // public summaryUrl: string = '';
  // public contentUrl: (string | null) = null;
  // constructor(
  //   id = '',   // "dateId" used for id. There can be no more than one entries per day.
  //   title = '',
  //   description: string = '',
  //   summaryContent: string = '',
  //   summaryUrl: string = '',
  //   contentUrl: (string | null) = null
  // ) {
  //   this.id = id;
  //   this.title = title;



  // }


  public toString(): string {
    let str = '';
    str += `id:${this.id};`
    str += `title:${this.title};`
    str += `description:${this.description};`
    // str += `summaryContent:${this.summaryContent};`
    str += `summaryUrl:${this.summaryUrl};`
    str += `contentUrl:${this.contentUrl};`
    str += `skipPrinting:${this.skipPrinting};`
    str += `skipDisplay:${this.skipDisplay};`
    str += `showContent:${this.showContent};`
    return str;
  }

}
