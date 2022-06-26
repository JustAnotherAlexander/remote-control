import {
    draw_circle,
    draw_rectangle,
    draw_square
} from './draw.js'

import {
    mouse_up,
    mouse_down,
    mouse_left,
    mouse_right,
} from './mouseMovement.js'

import {
    mouse_position
} from './position.js'

export function call(command, distance, length) {
    let result = '';
    switch(command) {
        case 'mouse_up':
            result = mouse_up(distance);
        break;
        case 'mouse_down':
            result = mouse_down(distance);
        break;
        case 'mouse_right':
            result = mouse_right(distance);
        break;
        case 'mouse_left':
            result = mouse_left(distance);
        break;
        case 'mouse_position':
            result = mouse_position();
        break;
        case 'draw_circle':
            result = draw_circle(distance);
        break;
        case 'draw_rectangle':
            result = draw_rectangle(distance, length);
        break;
        case 'draw_square':
            result = draw_square(distance);
        break;
        case 'prnt_scrn':
            result = prnt_scrn();
        break;
    }
    return result;
}