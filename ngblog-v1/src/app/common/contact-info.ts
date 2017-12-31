export class ContactInfo {

  constructor(
    public email: string = '',
    public phone: string = '',
    public website: string = '',
    public address: string = ''
  ) {
  }

  public toString(): string {
    let str = '';
    str += `email:${this.email};`
    str += `phone:${this.phone};`
    str += `website:${this.website};`
    str += `address:${this.address};`
    return str;
  }

  clone(): ContactInfo {
    let cloned = Object.assign(new ContactInfo(), this) as ContactInfo;
    return cloned;
  }
  static clone(obj: any): ContactInfo {
    let cloned = Object.assign(new ContactInfo(), obj) as ContactInfo;
    return cloned;
  }

  copy(obj: any) {
    this.email = obj.email;
    this.phone = obj.phone;
    this.website = obj.website;
    this.address = obj.address;
  }

}
