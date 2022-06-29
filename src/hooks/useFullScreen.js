import { useRef } from "react";
// Hook
export const useFullscreen = callback => {
    const element = useRef();
    const runCb = isFull => {
        if (callback && typeof callback === "function") {
            callback(isFull);
        }
    };
    const triggerFull = () => {
        if (element.current) {
            if (element.current.requestFullscreen) {
                element.current.requestFullscreen();
            } else if (element.current.mozRequestFullScreen) {
                element.current.mozRequestFullScreen();
            } else if (element.current.webkitRequestFullscreen) {
                element.current.webkitRequestFullscreen();
            } else if (element.current.msRequestFullscreen) {
                element.current.msRequestFullscreen();
            }
            runCb(true);
        }
    };
    const exitFull = () => {
        document.exitFullscreen();
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        runCb(false);
    };
    return { element, triggerFull, exitFull };
};
// Usage
const App = () => {
    const onChange = isFull =>
        console.log(isFull ? "We are in Fullscreen" : "We are not in Fullscreen");
    const { element, triggerFull, exitFull } = useFullscreen(onChange);
    return (
        <div ref={element}>
            <h1>Hello</h1>
            <button onClick={triggerFull}>Make this Fullscreen</button>
            <button onClick={exitFull}>Exit Fullscreen</button>
        </div>
    );
}