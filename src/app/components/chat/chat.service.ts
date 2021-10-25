import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Message, MessageDto } from './chat.types';
import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class ChatService implements OnDestroy {
  private subscriptions: Subscription[] = [];
  constructor(private socket: Socket, private http: HttpClient) {
    this.socket.on('connection', () => {
      if (!environment.production) console.log('Socket connected');
    });
  }

  public sendMessage(message: MessageDto) {
    this.subscriptions.push(
      this.http.post<Message>(`${environment.apiUrl}/chat`, message).subscribe(
        () => {},
        (err) => {
          if (err.status >= 0) {
            alert('ha ocurrido un error, no se ha podido conectar al servidor');
          }
        }
      )
    );
  }

  public getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiUrl}/chat/list`);
  }

  public getMessagesRT(): Observable<Message[]> {
    return this.socket.fromEvent<Message[]>('message');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
