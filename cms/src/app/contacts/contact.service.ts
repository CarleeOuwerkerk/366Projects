import {EventEmitter, Injectable} from '@angular/core';

import { Contact} from "./contact.model";
import { MOCKCONTACTS} from "./MOCKCONTACTS";

@Injectable()
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>()


  currentContact = null;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.contacts = this.contacts.sort(this.sortContacts);
    this.currentContact = this.getContact(this.currentContact);
  }

  getContacts(): Contact[]{
    return this.contacts.slice();
  }

  getContact(id: string): Contact{
    for (let contact of this.contacts){
      if (contact.id == id){
        return contact;
      }
    }
    return null;
  }

  sortContacts(contactA: Contact, contactB: Contact){
    if (contactA.name < contactB.name){
      return -1;
    }
    else if (contactA.name > contactB.name){
      return 1;
    }
    else{
      return 0;
    }
  }

  deleteContact(contact: Contact){
    if (contact === null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
