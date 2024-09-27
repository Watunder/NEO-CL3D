const Fullscreen = {
    onOpen() { },
    onClose() { },
    toggleFullscreen() {
        fullscreen ? closeFullscreen() : openFullscreen();
    }
}

const openFullscreen = () => {
    document.documentElement.requestFullscreen();

    if (typeof Fullscreen.onOpen === 'function')
        Fullscreen.onOpen();
}

const closeFullscreen = () => {
    document.exitFullscreen();

    if (typeof Fullscreen.onClose === 'function')
        Fullscreen.onClose();
}

let fullscreen = false;

const isFullscreen = () => {
    return fullscreen;
}

const handleFullscreen = () => {
    fullscreen = !fullscreen;
}

/**
 * @param {WindowEventMap['keydown']} event 
 */
const handleKeydown = (event) => {
    if (event.key === 'F11') {
        event.preventDefault();
        event.stopPropagation();

        //toggle fullscreen
        fullscreen ? closeFullscreen() : openFullscreen();
    }
}

globalThis.addEventListener('fullscreenchange', handleFullscreen);
globalThis.addEventListener('keydown', handleKeydown, true);

export { Fullscreen as default, openFullscreen, closeFullscreen, isFullscreen };