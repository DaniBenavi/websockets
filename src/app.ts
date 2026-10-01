import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

console.log('Client conected');

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  console.log('hola');

  ws.on('message', function message(data) {
    console.log('received: %s', data);

    const payload = JSON.stringify({
      message: 'message-customer',
      payload: data.toString(),
    });

    // todos - incluyente

    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }
    // });

    //  todos - excluyente

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });

    //ws.send(JSON.stringify(payload));
  });

  ws.on('close', () => {
    console.log('client disconected');
  });

  // ws.send('Hello from server');
});
