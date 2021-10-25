import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ApiResponse,
  instanceOfApiResponse,
} from 'src/app/core/generics/generics.type';
import { ChatService } from './chat.service';
import { Message } from './chat.types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements AfterViewInit {
  // Elements
  @ViewChild('list')
  private ulElement!: ElementRef;

  // variables
  public chat: Message[] = [];
  public message: string = '';
  public currentSender: string = '';

  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor(private serivice: ChatService) {
    this.currentSender =
      typeof localStorage.getItem('user') === 'string'
        ? localStorage.getItem('user')!
        : 'John Doe';

    this.subscriptions.push(
      this.serivice
        .getMessages()
        .subscribe(this.subscriptionController, this.errorHandler),
      this.serivice
        .getMessagesRT()
        .subscribe(this.subscriptionController, this.errorHandler)
    );
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  public sendMessage(): void {
    if (!this.message) return;
    this.serivice.sendMessage({
      sender: this.currentSender,
      message: this.message,
    });
    this.message = '';
    this.scrollToBottom();
  }

  public changeSender(): void {
    localStorage.setItem('user', this.currentSender);
  }

  public trackByID(index: number, message: Message): string {
    return message._id;
  }

  private scrollToBottom(): void {
    try {
      this.ulElement.nativeElement.scrollTop =
        this.ulElement.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * handler of subscriptions to api (http get or websocket connection)
   * @param value messages from database
   */
  private subscriptionController = (
    value: Message[] | ApiResponse<Message>
  ): void => {
    if (instanceOfApiResponse(value)) {
      this.chat = Array.isArray(value.message)
        ? value.message
        : [value.message];
    } else {
      this.chat = value;
    }
    this.scrollToBottom();
  };

  /**
   * handler error of subscriptions to api (http get or websocket connection)
   * @param err error from Request
   */
  private errorHandler(err: unknown): void {
    console.log(err); //TODO FINISH THIS
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
