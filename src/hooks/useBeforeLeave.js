import React, { useEffect } from "react";

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

// const App = () => {
//     const begForLife = () => console.log("Pls dont leave");
//     useBeforeLeave(begForLife);
//     return (
//         <div className='App'>
//             <div>Hi</div>
//         </div>
//     )
// }