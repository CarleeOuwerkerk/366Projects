import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Message} from "../message.model";
import {MessageService} from "../message.service";

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') messageInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = "1";
  id: string = "1";

  constructor(private messageService: MessageService, ) {
  }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const message = this.messageInputRef.nativeElement.value;
    const newMessage = new Message(this.id, subject, message, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = " ";
    this.messageInputRef.nativeElement.value = " ";
  }
}


