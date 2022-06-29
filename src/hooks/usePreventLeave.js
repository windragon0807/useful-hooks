/*
    현재 창에서 벗어나려고 할 때,
    Protect 버튼을 누른 후, 창을 나가면 크롬 메시지가 등장하며,
    Unprotect 버튼을 누른 후, 창을 나가면 크롬 메시지가 등장하지 않는다.
*/
// Hook
export const usePreventLeave = () => {
    const listener = (event) => {
        event.preventDefault();
        event.returnValue = "";
    };
    const enablePrevent = () => window.addEventListener('beforeunload', listener);
    const disablePrevent = () => window.removeEventListener('beforeunload', listener);
    return { enablePrevent, disablePrevent };
}
// Usage
const App = () => {
    const { enablePrevent, disablePrevent } = usePreventLeave();
    return (
        <div className='App'>
            <button onClick={enablePrevent}>Protect</button>
            <button onClick={disablePrevent}>Unprotect</button>
        </div>
    )
}