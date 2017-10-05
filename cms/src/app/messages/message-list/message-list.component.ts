import { Component, OnInit } from '@angular/core';
import {Message} from "../message.model";

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message('1'
      , 'Test'
      , 'This is a test.'
      , 'Carlee'),
    new Message('2'
      , 'Test'
      , 'This is another test.'
      , 'Sam'),
    new Message('3'
      , 'Test'
      , 'This is the third test.'
      , 'Carlee'),
  ];
  constructor() { }

  ngOnInit() {
  }

  onMessageAdded(message: Message){
    this.messages.push(message);
  }
}
