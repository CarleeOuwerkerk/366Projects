import {EventEmitter, Injectable} from '@angular/core';
import { Contact} from "./contact.model";
import { MOCKCONTACTS} from "./MOCKCONTACTS";
import {Subject} from "rxjs/Subject";
import {isNullOrUndefined} from "util";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  currentContact = null;

  constructor(private http: Http) {
    this.initContacts()
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
    let contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  getMaxId(){
    let maxId: number = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id)
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact){
    if (isNullOrUndefined(newContact)){
      return;
    }
    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice()
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if ((isNullOrUndefined(originalContact)) || (isNullOrUndefined(newContact))){
      return;
    }

    let pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  storeContacts() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://carleemurphycms.firebaseio.com/contacts.json',
      this.getContacts(),
      {headers})
    // JSON.stringify(this.documents)
      .subscribe(
        () => {
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  initContacts() {
    this.http.get('https://carleemurphycms.firebaseio.com/contacts.json')
      .map(
        (response: Response) => {
          const contacts: Contact[] = response.json();
          return contacts;
        }
      )
      .subscribe(
        (contactsReturned: Contact[]) => {
          this.contacts = contactsReturned;
          this.contacts = this.contacts.sort(this.sortContacts);
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      )
  }
}
