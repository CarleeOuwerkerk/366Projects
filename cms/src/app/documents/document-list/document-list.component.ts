import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import {Document} from "../document.model";
import {DocumentService} from "../document.service";
import {Subscription} from "rxjs/Subscription";
import {subscriptionLogsToBeFn} from "rxjs/testing/TestScheduler";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
      this.documents = documents;
      }
    );

    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documentsList: Document[]) => {
      this.documents = documentsList;
      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
