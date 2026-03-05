import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { retry, timer, Observable } from 'rxjs';
import { EmployeeSocketEvent } from '../models/employeeSocketevent.model';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

  private socket$: WebSocketSubject<EmployeeSocketEvent>;

  messages$: Observable<EmployeeSocketEvent>;

  constructor() {
    this.socket$ = webSocket<EmployeeSocketEvent>('ws://localhost:3000');

    this.messages$ = this.socket$.pipe(
      retry({
        delay: (_, retryCount) =>
          timer(Math.min(1000 * 2 ** retryCount, 30000))
      })
    );
  }
}