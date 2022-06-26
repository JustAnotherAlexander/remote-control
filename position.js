import robot from 'robotjs';

export function mouse_position() {
    let currentMousePosition = robot.getMousePos();
    return `mouse_position ${currentMousePosition.x} px,${currentMousePosition.y} px`;
}