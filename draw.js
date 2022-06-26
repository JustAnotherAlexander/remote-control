import robot from 'robotjs';

function draw_square(length) {
    let currentMousePosition = robot.getMousePos();
    robot.mouseToggle('down');
    robot.moveMouseSmooth(currentMousePosition.x, currentMousePosition.y-length);
    currentMousePosition = robot.getMousePos();
    robot.moveMouseSmooth(+length+currentMousePosition.x, currentMousePosition.y);
    currentMousePosition = robot.getMousePos();
    robot.moveMouseSmooth(currentMousePosition.x, +length+currentMousePosition.y);
    currentMousePosition = robot.getMousePos();
    robot.moveMouseSmooth(currentMousePosition.x-length, currentMousePosition.y);
    robot.mouseToggle('up');
    return 'draw_square';
}
function draw_rectangle(width, length) {
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
    return 'draw_rectangle';
}

function draw_circle(radius) {
    let currentMousePosition = robot.getMousePos();
    robot.moveMouseSmooth(+radius*0.8+currentMousePosition.x, currentMousePosition.y);
    robot.mouseToggle('down');
    for (let i = 0; i <= Math.PI * 2; i += 0.02) {
        const x = currentMousePosition.x + radius*0.8 * Math.cos(i);
        const y = currentMousePosition.y + radius*0.8 * Math.sin(i);
        robot.moveMouseSmooth(x, y);
      }
      
      robot.mouseToggle('up');
      return 'draw_circle';
}

export {
    draw_circle,
    draw_rectangle,
    draw_square
}
    
