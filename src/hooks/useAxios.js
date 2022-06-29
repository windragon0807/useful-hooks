import defaultAxios from "axios";
import { useState, useEffect } from "react";
/**
 * refetch 함수 실행 시, loading을 true로 설정하며 trigger를 업데이트한다.
 * trigger 업데이트 시, useEffect가 실행되며 loading을 false로 설정하는 Hook
 */
// Hook
export const useAxios = (opts, axiosInstance = defaultAxios) => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null
    });
    const [trigger, setTrigger] = useState(0);
    if (!opts.url) {
        return;
    }
    const refetch = () => {
        setState({
            ...state,
            loading: true
        });
        setTrigger(Date.now());
    };
    useEffect(() => {
        axiosInstance(opts).then(data => {
            setState({ ...state, loading: false, data });
        }).catch(error => {
            setState({ ...state, loading: false, error });
        });
    }, [trigger]);

    return { ...state, refetch };
};
// Usage
const App = () => {
    const { loading, data, error, refetch } = useAxios({
        url: "https://yts.am/api/v2/list_movies/json"
    });
    return (
        <div className='App'>
            <h1>{data && data.status}</h1>
            <h2>{loading && "Loading"}</h2>
            <button onClick={refetch}>Refetch</button>
        </div>
    );
}