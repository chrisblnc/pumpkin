import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message.model';
import * as firebase from 'firebase';

@Injectable()
export class MessageService {

  messages: Message[] = [];
  messagesSubject = new Subject<Message[]>();

  constructor() {
    this.getMessages();
  }

  emitMessages() {
    this.messagesSubject.next(this.messages);
  }

  saveMessages() {
    firebase.database().ref('/messages').set(this.messages);
  }

  getMessages() {
    firebase.database().ref('/messages')
    .on('value', (data: firebase.database.DataSnapshot) => {
      this.messages = data.val() ? data.val() : [];
      this.emitMessages();
    });
  }

  createNewMessage(newMessage: Message) {
    this.messages.push(newMessage);
    this.saveMessages();
    this.emitMessages();
  }

  removeMessage(message: Message) {
    const messageIndexToRemove = this.messages.findIndex(
      (messageE1) => {
        if (messageE1 == message) {
          return true;
        }
      }
    );
    this.messages.splice(messageIndexToRemove, 1);
    this.saveMessages();
    this.emitMessages();
  }
}
