import Fullscreen from "./fullscreen.js"

const dragMe = document.querySelector('.dragMe');
const menuBar = document.querySelector('.menuBar');

if (!globalThis.electronAPI && !globalThis.nw) {
    dragMe.classList.remove("drag");
    dragMe.classList.add("no-drag");
    menuBar.classList.add("hide");
    menuBar.classList.remove("show");
}

Fullscreen.onOpen = () => {
    if (globalThis.electronAPI || globalThis.nw) {
        dragMe.classList.remove("drag");
        dragMe.classList.add("no-drag");
        menuBar.classList.add("hide");
        menuBar.classList.remove("show");
    }
}

Fullscreen.onClose = () => {
    if (globalThis.electronAPI || globalThis.nw) {
        dragMe.classList.remove("no-drag");
        dragMe.classList.add("drag");
        menuBar.classList.remove("hide");
        menuBar.classList.add("show");
    }
}

globalThis.click_icon_fullscreen = () => {
    Fullscreen.toggleFullscreen();
}

globalThis.click_icon_x = () => {
    if (globalThis.electronAPI && globalThis.electronAPI.doAppQuit) {
        globalThis.electronAPI.doAppQuit();
    } else if (globalThis.nw) {
        globalThis.nw.App.quit();
    } else {
        globalThis.close();
    }
}