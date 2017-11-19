import {Injectable} from "@angular/core";

@Injectable()
export class Contact {

  constructor(public id: string,
              public name: string,
              public email: string,
              public phone: string,
              public imageUrl: string,
              public group?: Contact[]){

  }

  // ){
  //   this.contactID = contactID;
  //   this.name = name;
  //   this.email = email;
  //   this.phone = phone;
  //   this.imageURL = imageURL;
  //   this.group = group;
  // }
}
