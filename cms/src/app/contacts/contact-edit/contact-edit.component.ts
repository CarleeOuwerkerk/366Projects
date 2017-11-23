import { Component, OnInit } from '@angular/core';
import {Contact} from "../contact.model";
import {ContactService} from "../contact.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  originalContact: Contact;
  hasGroup: boolean = false;
  invalidGroupContact: boolean;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params["id"];

          if (id == null) {
            this.editMode = false;
          }

          this.originalContact = this.contactService.getContact(id);
          if (this.originalContact == null) {
            return;
          }

          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));

          if (this.groupContacts != null) {
            this.groupContacts = JSON.parse(JSON.stringify(this.groupContacts));
          }
        }
      );
  }

  onSubmit(form: NgForm){
    const values = form.value;
    const newContact = new Contact("7", values.name, values.email, values.phone, values.imageUrl, this.groupContacts);

    if (this.editMode == true){
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else{
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }

  isInvalidContact(newContact: Contact){
    if (!newContact){
      return true;
    }

    if (newContact.id == this.contact.id){
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any){
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact){
      this.invalidGroupContact = true;
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number){
    if (idx < 0 || idx >= this.groupContacts.length)
      return;

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
