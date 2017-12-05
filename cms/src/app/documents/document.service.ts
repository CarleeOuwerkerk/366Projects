import {EventEmitter, Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Document} from "./document.model";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/map";

@Injectable()
export class DocumentService {
  private documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: Http) {
    this.initDocuments();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    // addition below
    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    this.storeDocuments();
  }

  getMaxId() {
    let maxId: number = 0;
    for (let document of this.documents) {
      let currentId = parseInt(document.id)
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument == null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice()
    this.storeDocuments();

  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if ((originalDocument == null) || (newDocument == null)) {
      return;
    }
    let pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.storeDocuments();
  }

  storeDocuments() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://carleemurphycms.firebaseio.com/documents.json',
      this.getDocuments(),
      {headers})
      // JSON.stringify(this.documents)
      .subscribe(
        () => {
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  initDocuments() {
    this.http.get('https://carleemurphycms.firebaseio.com/documents.json')
      .map(
        (response: Response) => {
          const documents: Document[] = response.json();
          return documents;
        }
      )
      .subscribe(
        (documentsReturned: Document[]) => {
          this.documents = documentsReturned;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
        }
      )
  }
}
