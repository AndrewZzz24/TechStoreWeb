import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    transports: ['websocket'],
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newSupportRequest')
  async handleMessage(client: Socket, payload: any) {
    console.log(payload);

    const answer = {
      postId: payload.id,
      title: payload.title,
    };

    this.server.emit('newSupportRequest', answer);
  }

  afterInit(server: Server): any {
    console.log('init');
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('client connected: ' + client.id);
  }

  handleDisconnect(client: any): any {
    console.log('client disconnected: ' + client.id);
  }
}