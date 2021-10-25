//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Installed
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

//  Components
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { environment } from 'src/environments/environment';

// Services
import { ChatService } from './components/chat/chat.service';
import { ChatMessagesComponent } from './shared/chat-messages/chat-messages.component';
const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

@NgModule({
  declarations: [AppComponent, ChatComponent, ChatMessagesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
