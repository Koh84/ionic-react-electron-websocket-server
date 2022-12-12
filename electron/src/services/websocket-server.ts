import { consoleService } from '../services/console-service';

let WebSocket = null;

// Config
const Config = {
    socket_port: '3030'
};

class WebSocketServer {
    constructor() {
        WebSocket = require('isomorphic-ws');
    }

    setup() {
        consoleService.log('WebSocketServer::setup');
        const wss = new WebSocket.Server({port: Config.socket_port});
        
        wss.getUniqueID = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
        
            return s4() + s4() + '-' + s4();
        };

        wss.on('connection', function connection(ws, req) {
            ws.id = wss.getUniqueID();
        
            ws.on('close', function close() {
                consoleService.log('[SERVER]: Client disconnected.');
            });
        
            ws.on('message', function incoming(recieveData) {
                consoleService.log('[SERVER] Message:' + recieveData);
        
                // Example use
                // send(recieveData);
        
                sendAll(recieveData);
            });
        
            // Send back to client
            function send(data) {
                data = JSON.stringify(data);
                ws.send(data);
            }
        
            // Send to all clients
            function sendAll(data) {
                data = JSON.stringify(data);
        
                wss.clients.forEach(function each(client) {
                    client.send(data);
                });
            }
        });
    }
}

export const webSocketServer = new WebSocketServer();