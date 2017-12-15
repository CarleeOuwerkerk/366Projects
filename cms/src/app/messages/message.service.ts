import {EventEmitter, Injectable} from '@angular/core';
import {Message} from "./message.model";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class MessageService {
  private messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;
  currentSender: string = '7';

  constructor(private http: Http) {
    this.initMessages()
  }

  getMaxId() {
    let maxId: number = 0;
    for (let message of this.messages) {
      let currentId = parseInt(message.id)
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages(): Message[]{
    return this.messages.slice();
  }

  getMessage(id: string): Message{
    for (let message of this.messages){
      if (message.id == id){
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message) {
    if (newMessage == null) {
      return;
    }
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    newMessage.id = '';
    // newMessage.sender = this.currentSender;
    const strMessage = JSON.stringify(newMessage);
    this.http.post('http://localhost:3000/messages/',
      strMessage,
      {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.messageChangeEvent.next(this.messages.slice());
        });
  }

  storeMessages() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('http://localhost:3000/messages',
      this.getMessages(),
      {headers})
    // JSON.stringify(this.documents)
      .subscribe(
        () => {
          this.messageChangeEvent.next(this.messages.slice());
        }
      );
  }

  initMessages() {
    this.http.get('http://localhost:3000/messages')
      .map(
        (response: Response) => {
          const messages: Message[] = response.json();
          return messages;
        }
      )
      .subscribe(
        (messagesReturned: any) => {
          this.messages = messagesReturned.obj;
          this.maxMessageId = this.getMaxId();
          this.messageChangeEvent.next(this.messages.slice());
        }
      )
  }
}
