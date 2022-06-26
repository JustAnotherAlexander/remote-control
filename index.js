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
        let value
        let command
        let width
        let length
        console.log(`recieved data from fromt: ${data}`);
          let fullCommand = data.toString('utf-8').split(' ');
          if (fullCommand.length === 2) {
             command = fullCommand[0];
             value = fullCommand[1];
          } else {
             command = fullCommand[0];
             width = fullCommand[1];
             length = fullCommand[2];
          }


        if (command === 'mouse_up') {
            let currentMousePosition = robot.getMousePos();
            robot.moveMouse(currentMousePosition.x, currentMousePosition.y-value);
            ws.send('mouse_up');
        }
        if (command === 'mouse_right') {
            let currentMousePosition = robot.getMousePos();
            robot.moveMouse(+value+currentMousePosition.x, currentMousePosition.y);
            ws.send('mouse_right');
        }
        if (command === 'mouse_left') {
            let currentMousePosition = robot.getMousePos();
            robot.moveMouse(currentMousePosition.x-value, currentMousePosition.y);
            ws.send('mouse_left');
        }
        if (command === 'mouse_down') {
            let currentMousePosition = robot.getMousePos();
            robot.moveMouse(currentMousePosition.x, +value+currentMousePosition.y);
            ws.send('mouse_down');
        }
        if (command === 'draw_square') {
            let currentMousePosition = robot.getMousePos();
            robot.mouseToggle('down');
            robot.moveMouseSmooth(currentMousePosition.x, currentMousePosition.y-value);
            currentMousePosition = robot.getMousePos();
            robot.moveMouseSmooth(+value+currentMousePosition.x, currentMousePosition.y);
            currentMousePosition = robot.getMousePos();
            robot.moveMouseSmooth(currentMousePosition.x, +value+currentMousePosition.y);
            currentMousePosition = robot.getMousePos();
            robot.moveMouseSmooth(currentMousePosition.x-value, currentMousePosition.y);
            robot.mouseToggle('up');
            ws.send('draw_square');
        }
        if (command === 'draw_rectangle') {
            let currentMousePosition = robot.getMousePos();
            robot.mouseToggle('down');
            robot.moveMouseSmooth(currentMousePosition.x, currentMousePosition.y-length);
            currentMousePosition = robot.getMousePos();
            robot.moveMouseSmooth(+width+currentMousePosition.x, currentMousePosition.y);
            currentMousePosition = robot.getMousePos();
            robot.moveMouseSmooth(currentMousePosition.x, +length+currentMousePosition.y);
            currentMousePosition = robot.getMousePos();
            robot.moveMouseSmooth(currentMousePosition.x-width, currentMousePosition.y);
            robot.mouseToggle('up');
            ws.send('draw_rectangle');
        }

        if (command === 'draw_circle') {
            let currentMousePosition = robot.getMousePos();
            robot.moveMouseSmooth(+value*0.8+currentMousePosition.x, currentMousePosition.y);
            robot.mouseToggle('down');
            for (let i = 0; i <= Math.PI * 2; i += 0.02) {
                const x = currentMousePosition.x + value*0.8 * Math.cos(i);
                const y = currentMousePosition.y + value*0.8 * Math.sin(i);
                robot.moveMouseSmooth(x, y);
              }
              
              robot.mouseToggle('up');
        }

    })

    
})

wss.on('close', ()=> {
    console.log('Connection closed!')
})