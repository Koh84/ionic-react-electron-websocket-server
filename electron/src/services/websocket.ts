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
        let serverAddress = 'ws:' + Config.serverIp + ':' + Config.serverPort;
        const ws = new WebSocket(serverAddress);

        ws.onopen = function open() {
            consoleService.log('connected');
            ws.send('A test message');
        };

        ws.onclose = function close() {
            consoleService.log('disconnected');
        };

        ws.onmessage = function incoming(data) {
            consoleService.log('Data ' + data.data);

            setTimeout(function timeout() {
                ws.send('A test message');
            }, 1000);
        };
    }
}

export const webSocket = new WebSocketService();