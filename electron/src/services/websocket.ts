import { consoleService } from '../services/console-service';

let WebSocket = null;

// Config
const Config = {
    serverIp: '127.0.0.1',
    serverPort: '3030'
};

class WebSocketService {
    constructor() {
        WebSocket = require('isomorphic-ws');
    }

    setup() {
        consoleService.log('WebSocketService::setup');
        let serverAddress = 'wss:' + Config.serverIp + ':' + Config.serverPort;
        const ws = new WebSocket(serverAddress);

        ws.onopen = function open() {
            consoleService.log('connected');
            ws.send(Date.now());
        };

        ws.onclose = function close() {
            consoleService.log('disconnected');
        };

        ws.onmessage = function incoming(data) {
            consoleService.log(`Roundtrip time: ${Date.now() - data.data} ms`);

            setTimeout(function timeout() {
                ws.send(Date.now());
            }, 500);
        };
    }
}

export const webSocket = new WebSocketService();