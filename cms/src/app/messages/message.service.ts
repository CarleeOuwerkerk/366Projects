import {EventEmitter, Injectable} from '@angular/core';
import {Message} from "./message.model";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class MessageService {
  private messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

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

  addMessage(message: Message){
    this.messages.push(message);
    this.storeMessages();
  }

  storeMessages() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://carleemurphycms.firebaseio.com/messages.json',
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
    this.http.get('https://carleemurphycms.firebaseio.com/messages.json')
      .map(
        (response: Response) => {
          const messages: Message[] = response.json();
          return messages;
        }
      )
      .subscribe(
        (messagesReturned: Message[]) => {
          this.messages = messagesReturned;
          this.maxMessageId = this.getMaxId();
          this.messageChangeEvent.next(this.messages.slice());
        }
      )
  }
}
