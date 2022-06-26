import robot from 'robotjs';

function mouse_up(distance) {
    let currentMousePosition = robot.getMousePos();
    robot.moveMouse(currentMousePosition.x, currentMousePosition.y-distance);
    return 'mouse_up';
}
function mouse_right(distance) {
    let currentMousePosition = robot.getMousePos();
    robot.moveMouse(+distance+currentMousePosition.x, currentMousePosition.y);
    return 'mouse_right';
}
function mouse_left(distance) {
    let currentMousePosition = robot.getMousePos();
    robot.moveMouse(currentMousePosition.x-distance, currentMousePosition.y);
    return 'mouse_left';
}
function mouse_down(distance) {
    let currentMousePosition = robot.getMousePos();
    robot.moveMouse(currentMousePosition.x, +distance+currentMousePosition.y);
    return 'mouse_down';
}


export {
    mouse_up,
    mouse_down,
    mouse_right,
    mouse_left
}