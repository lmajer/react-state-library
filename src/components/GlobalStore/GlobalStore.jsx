import React, {useMemo, useState} from 'react';
const createGlobalStore = (initialState = {}) => {
    const EventEmitter = require('events');
    const eventEmitter = new EventEmitter();
    return (stateKey) => {

        const [, setCount] = useState(0);
        const forceUpdate = () => setCount((c) => c+1);

        useMemo(() => {
            eventEmitter.on(stateKey, () => {
                forceUpdate();
            });
        }, [stateKey]);

        return [
            initialState[stateKey],
            (setStoreState) => {
                initialState[stateKey] = setStoreState(initialState[stateKey]);
                eventEmitter.emit(stateKey)
            }
        ]
    }
}

export default createGlobalStore;