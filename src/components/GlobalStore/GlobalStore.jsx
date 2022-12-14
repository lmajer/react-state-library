import React, {useMemo, useState} from 'react';
import {renderToReadableStream} from "react-dom/server";

class EventEmitter extends EventTarget {
    emit(stateKey) {
        this.dispatchEvent(new Event(stateKey))
    }
}
const createGlobalStore = (initialState = {}) => {
    const emitter = new EventEmitter();

    return (stateKey) => {
        const [count, setCount] = useState();

        useMemo(() => {
            emitter.addEventListener(stateKey, () => {
                setCount((a) => a+1);
            });
        }, [stateKey]);

        return [
            initialState[stateKey],
            (setStoreState) => {
                initialState[stateKey] = setStoreState(initialState[stateKey]);
                emitter.emit(stateKey);
            }
        ]
    }
}

export default createGlobalStore;