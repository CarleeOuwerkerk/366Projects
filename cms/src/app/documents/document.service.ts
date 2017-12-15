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
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        });
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
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    newDocument.id = '';
    const strDocument = JSON.stringify(newDocument);
    this.http.post('http://localhost:3000/documents/',
      strDocument,
      {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if ((originalDocument == null) || (newDocument == null)) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const strDocument = JSON.stringify(newDocument);
    this.http.patch('http://localhost:3000/documents/' + originalDocument.id,
      strDocument,
      {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        });
  }

  // storeDocuments() {
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   return this.http.put('https://carleemurphycms.firebaseio.com/documents.json',
  //     this.getDocuments(),
  //     {headers})
  //     // JSON.stringify(this.documents)
  //     .subscribe(
  //       () => {
  //         this.documentListChangedEvent.next(this.documents.slice());
  //       }
  //     );
  // }

  initDocuments() {
    this.http.get('http://localhost:3000/documents')
      .map(
        (response: Response) => {
          const documents: Document[] = response.json();
          return documents;
        }
      )
      .subscribe(
        (documentsReturned: any) => {
          this.documents = documentsReturned.obj;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
        }
      )
  }
}
