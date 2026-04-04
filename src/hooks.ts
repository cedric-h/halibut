import React from 'react'

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = React.useRef(() => {});
 
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
 
    React.useEffect(() => {
        if (delay === null) return;

        let id = setInterval(() => savedCallback.current(), delay!);
        return () => clearInterval(id);
    }, [delay]);
}

export function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = React.useRef(() => {});
 
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
 
    React.useEffect(() => {
        if (delay === null) return;

        let id = setTimeout(() => savedCallback.current(), delay!);
        return () => clearTimeout(id);
    }, [delay]);
}
