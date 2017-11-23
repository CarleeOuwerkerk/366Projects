import { Component, OnInit } from '@angular/core';
import {DocumentService} from "../document.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { Document} from "../document.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  document: Document;
  originalDocument: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
      const id = params["id"];

      if (id == null){
        this.editMode = false;
      }

      this.originalDocument = this.documentService.getDocument(id);
      if (this.originalDocument == null){
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }

  onSubmit(form: NgForm){
    const values = form.value;
    const newDocument = new Document("7", values.name, values.description, values.url);

    if (this.editMode == true){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }
    else{
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents'], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate(['/documents'], {relativeTo: this.route});
  }
}
