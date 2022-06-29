import { useState, useEffect } from "react";
// Hook
export const useNetwork = onChange => {
    const [status, setStatus] = useState(navigator.onLine);
    const handleChange = () => {
        if (typeof onChange === 'function') {
            onChange(navigator.onLine);
        }
        setStatus(navigator.onLine);
    }
    useEffect(() => {
        window.addEventListener('onLine', handleChange);
        window.addEventListener('offLine', handleChange);
        return () => {
            window.removeEventListener('onLine', handleChange);
            window.removeEventListener('offLine', handleChange);
        }
    }, []);
    return status;
}
// Usage
const App = () => {
    const handleNetworkChange = (online) => {
        console.log(online ? "We just went online" : "We are offline");
    }
    const onLine = useNetwork(handleNetworkChange);
    return (
        <div className='App'>
            <h1>{onLine ? "Online" : "Offline"}</h1>
        </div>
    )
}