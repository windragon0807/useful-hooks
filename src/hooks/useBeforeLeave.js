import { useEffect } from "react";
/**
 * mouseleave의 y축 이벤트를 받아서 마우스가 창의 위쪽으로만 벗어났을 때,
 * 파라미터로 받은 onBefore 함수를 실행하는 Hook
*/
// Hook
export const useBeforeLeave = (onBefore) => {
    if (typeof onBefore !== 'function') {
        return;
    }
    const handle = event => {
        const { clientY } = event;
        if (clientY <= 0) {  // 마우스가 창의 위쪽으로만 벗어났을 때
            onBefore();
        }
    };
    useEffect(() => {
        document.addEventListener('mouseleave', handle);
        return () => document.removeEventListener('mouseleave', handle);
    }, []);
}
// Usage
const App = () => {
    const begForLife = () => console.log("Pls dont leave");
    useBeforeLeave(begForLife);
    return (
        <div className='App'>
            <div>Hi</div>
        </div>
    )
}