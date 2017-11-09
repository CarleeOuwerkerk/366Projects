import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Document} from "../document.model";

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() document: Document;
  @Input() id: string;
  // @Output() documentSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    //
    //   this.documentService.documentChangedEvent.subscribe(
    //     (documents: Document[]) => {
    //       this.documents = documents;
    //     }
    //   );
    // }
    // onSelectedDocument(){
    //   this.documentSelected.emit();
    // }
  }

}
