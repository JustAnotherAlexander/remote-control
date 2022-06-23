import Jimp from 'jimp';
import {httpServer} from './src/http_server/index.js';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);



const wss = new WebSocketServer({
    port: 8080,
});

wss.on('connection', ws => {
    ws.on('message', data => {
        console.log(`recieved data from fromt: ${data}`);
          let fullCommand = data.toString('utf-8').split(' ');
        let command = fullCommand[0];
        let value = fullCommand[1];
        console.log(value)

        if (command === 'mouse_up') {
            let currentMousePosition = robot.getMousePos();
            robot.moveMouse(currentMousePosition.x, currentMousePosition.y-value);
        }
        if (command === 'mouse_right') {
            let currentMousePosition = robot.getMousePos();
            robot.moveMouse(+value+currentMousePosition.x, currentMousePosition.y);
        }
        if (command === 'mouse_left') {
            let currentMousePosition = robot.getMousePos();
            robot.moveMouse(currentMousePosition.x-value, currentMousePosition.y);
        }
        if (command === 'mouse_down') {
            let currentMousePosition = robot.getMousePos();
            robot.moveMouse(currentMousePosition.x, +value+currentMousePosition.y);
        }

    })

    ws.send('something');
})

wss.on('close', ()=> {
    console.log('Connection closed!')
})