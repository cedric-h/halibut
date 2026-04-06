import React from 'react'


export type AppEvent = { x: number, y: number };

export const AppDispatchContext = React.createContext<React.ActionDispatch<[_: AppEvent]>>(
    () => { debugger; }
);
