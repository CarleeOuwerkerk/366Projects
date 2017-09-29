export class Contacts {
  public contactID: string;
  public name: string;
  public email: string;
  public phone: string;
  public imageURL: string;
/*  public group?: contacts[]; */

  constructor(contactID: string
              , name: string
              , email: string
              , phone: string
              , imageURL: string){
    this.contactID = contactID;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageURL = imageURL;
/*    this.group = contacts[5]; */
  }
}
