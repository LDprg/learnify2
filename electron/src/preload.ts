import { Titlebar, Color } from './custom-electron-titlebar/dist';
require('./rt/electron-rt');
//////////////////////////////
// User Defined Preload scripts below
console.log('User Preload!');

window.addEventListener('DOMContentLoaded', () => {
    new Titlebar({
        backgroundColor: Color.fromHex('#222428'),
    });
    
    // ...
})
