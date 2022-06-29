import { useState } from 'react'
// Hook
export const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const onChange = event => {
        // const value = event.target.value;
        const {
            target: { value }
        } = event;
        let willUpdate = true; 
        if (typeof validator === "function") {
            willUpdate = validator(value);
        }
        if (willUpdate) {
            setValue(value);
        }
    };
    return { value, onChange };
};
// Usage
const App = () => {
    const maxLen = value => value.length < 10;
    const name = useInput("Mr. ", maxLen);
    return (
        <div className='App'>
            <h1>Hello</h1>
            <input placeholder='Name' {...name} />
        </div>
    )
}