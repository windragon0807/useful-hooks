import React from "react";
// Hook
export const useNotification = (title, options) => {
    if (!("Notification" in window)) {
        return;
    }
    const fireNotif = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(title, options);
                } else {
                    return;
                }
            });
        } else {
            new Notification(title, options);
        }
    };
    return fireNotif;
};
// Usage
const App = () => {
    const triggerNotif = useNotification("Can I steal your kimchi?", {
        body: "I love kimchi dont you"
    })
    return (
        <div className='App'>
            <button onClick={triggerNotif}>Hello</button>
        </div>
    );
}