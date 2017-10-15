import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Document} from "../document.model";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1'
      , 'document1'
      , 'This is document1.'
      , 'https://images-na.ssl-images-amazon.com/images/I/51txnYl47mL._SX323_BO1,204,203,200_.jpg'),
    new Document('2'
      , 'document2'
      , 'This is document2.'
      , 'https://vignette.wikia.nocookie.net/harrypotter/images/1/17/Chamberofsecrets.jpg/revision/latest/scale-to-width-down/333?cb=20150208225435'),
    new Document('3'
      , 'document3'
      , 'This is document3.'
      , 'https://media.bloomsbury.com/rep/bj/9780747542155.jpg'),
    new Document('4'
      , 'document4'
      , 'This is document4.'
      , 'https://upload.wikimedia.org/wikipedia/en/c/c7/Harry_Potter_and_the_Goblet_of_Fire.jpg'),
    new Document('5'
      , 'document5'
      , 'This is document5.'
      , 'https://upload.wikimedia.org/wikipedia/en/7/70/Harry_Potter_and_the_Order_of_the_Phoenix.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }


}
