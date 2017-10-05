export class Contact {
  public contactID: string;
  public name: string;
  public email: string;
  public phone: string;
  public imageURL: string;
  public group: string[];

  constructor(contactID: string
              , name: string
              , email: string
              , phone: string
              , imageURL: string
              , group?: string[]
  ){
    this.contactID = contactID;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageURL = imageURL;
    this.group = group;
  }
}
