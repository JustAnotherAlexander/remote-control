import {httpServer} from './src/http_server/index.js';
import { WebSocketServer } from 'ws';
import {call} from './router.js'
import Jimp from 'jimp';
import robot from 'robotjs';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);



const wss = new WebSocketServer({
    port: 8080,
});

wss.on('connection', ws => {
    ws.on('message', data => {
        let distance
        let command
        let length
        console.log(`recieved data from fromt: ${data}`);
          let fullCommand = data.toString('utf-8').split(' ');
          if (fullCommand.length === 2) {
             command = fullCommand[0];
             distance = fullCommand[1];
          } else {
             command = fullCommand[0];
             distance = fullCommand[1];
             length = fullCommand[2];
          }
          if (command === 'prnt_scrn') {            

                let currentMousePosition = robot.getMousePos();
                let buff = robot.screen.capture(currentMousePosition.x, currentMousePosition.y, 200, 200);
                
                new Jimp({ data: buff.image, width: 200, height: 200 }, async (err, image) => {
                    if (err) {
                        console.log('something went wrong');
                    }
            
                    let imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
                    ws.send(`prnt_scrn ${imgBuffer.toString('base64')}`);
                  });
                  
          } else {
            let result = call(command, distance, length);
            ws.send(result);
          }
    })

    
})

process.on('SIGINT', () => {
    process.stdout.write('Closing websocket...\n');
    wss.close();
    process.exit(0);
  });