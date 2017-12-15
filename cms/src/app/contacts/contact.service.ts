import {EventEmitter, Injectable} from '@angular/core';
import { Contact} from "./contact.model";
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

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contacts = this.contacts.sort(this.sortContacts);
          this.contactListChangedEvent.next(this.contacts.slice());
        });
  }

  getMaxId(){
    let maxId: number = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact == null) {
      return;
    }
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    newContact.id = '';
    const strContact = JSON.stringify(newContact);
    this.http.post('http://localhost:3000/contacts/',
      strContact,
      {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contacts = this.contacts.sort(this.sortContacts);
          this.contactListChangedEvent.next(this.contacts.slice());
        });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if ((originalContact == null) || (newContact == null)) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const strContact = JSON.stringify(newContact);
    this.http.patch('http://localhost:3000/contacts/' + originalContact.id,
      strContact,
      {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contacts = this.contacts.sort(this.sortContacts);
          this.contactListChangedEvent.next(this.contacts.slice());
        });
  }

  // storeContacts() {
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   return this.http.put('https://carleemurphycms.firebaseio.com/contacts.json',
  //     this.getContacts(),
  //     {headers})
  //   // JSON.stringify(this.documents)
  //     .subscribe(
  //       () => {
  //         this.contactListChangedEvent.next(this.contacts.slice());
  //       }
  //     );
  // }

  initContacts() {
    this.http.get('http://localhost:3000/contacts')
      .map(
        (response: Response) => {
          const contacts: Contact[] = response.json();
          return contacts;
        }
      )
      .subscribe(
        (contactsReturned: any) => {
          this.contacts = contactsReturned.obj;
          this.contacts = this.contacts.sort(this.sortContacts);
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      )
  }
}
