import React from 'react'
import { Item } from './item.ts'

export enum AppEventKind {
    FlyingItemRerender,
    FlyingItemIntoFrame,
    FlyingItemOutOfFrame,
}
export type AppEvent = { kind: AppEventKind.FlyingItemRerender } | {
    kind: AppEventKind.FlyingItemIntoFrame | AppEventKind.FlyingItemOutOfFrame,
    item: Item,
    x: number,
    y: number
};

export const AppDispatchContext = React.createContext<React.ActionDispatch<[_: AppEvent]>>(
    () => { debugger; }
);
