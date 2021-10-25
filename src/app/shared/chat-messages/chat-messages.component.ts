import { Component, Input } from '@angular/core';
import { Message } from 'src/app/components/chat/chat.types';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
})
export class ChatMessagesComponent {
  @Input('message') message!: Message;

  constructor() {}

  public formatTime(date: Date) {
    date = new Date(date);

    // get hour
    let hours: number = date.getHours();
    let minutes: number | string = date.getMinutes();
    let meridian: string = hours >= 12 ? 'pm' : 'am';

    // change it to 12 hour clock convention
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const hour = `${hours}:${minutes} ${meridian}`;

    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} - ${hour}`;
  }
}
