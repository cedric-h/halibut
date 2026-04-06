import './App.css'

import React from 'react'
import { AppDispatchContext } from "./AppDispatchContext.ts"
import type { AppEvent } from "./AppDispatchContext.ts"

import RoomBrewery from "./brew/RoomBrewery.tsx"
import RoomCounter from "./RoomCounter.tsx"
import RoomInventory from "./RoomInventory.tsx"

/* by factoring the content into another component, app dispatches
 * can't cause rerenders that mess up the main app's scroll position */
function Content({ children }: { children: React.ReactNode[] }) {

    type FlyingItem = { x: string, y: string };

    const [flyingItems, dispatch] = React.useReducer<FlyingItem[], [_: AppEvent]>(
        (flyingItems, { x, y }) => {
            const vw1 = window.innerWidth/100;
            const vh1 = window.innerHeight/100;
            // see main.css
            const rem = 6 * Math.min(vw1, vh1 * (9/16));

            const main = document.querySelector("main#root");
            const mainBox = (main as HTMLElement)
                .getBoundingClientRect();

            /* coordinates relative to content window and
             * translated to rems so they respond to resizes */
            return [...flyingItems, {
                x: ((x - mainBox.x) / rem) + 'rem',
                y: ((y - mainBox.y) / rem) + 'rem',
            }];
        },
        []
    )

    return <AppDispatchContext value={dispatch}>
        {children}
        {flyingItems.map((item, i) => {
            return <div
                key={i}
                style={{ left: item.x, top: item.y }}
                className="flying-item"
            ></div>
        })}
    </AppDispatchContext>
}

export default function App() {
    return <div
        className="main-content"
        onScrollEnd={e => {
            /* when scroll ends, we need to snap you
             * into "the good zone" */
            const t = e.target as HTMLElement;
            const w = t.children[0].getBoundingClientRect().width;

            let scrollIdx = Math.round(t.scrollLeft / w);
            if (scrollIdx <= 0) scrollIdx = 3;
            if (scrollIdx >= 4) scrollIdx = 1;

            t.scrollLeft = w * scrollIdx;
        }}
        ref={el => {
            if (el)  {
                el.scrollLeft = el.children[0].getBoundingClientRect().width*2;
            }
        }}
    >
        <Content>
            <RoomInventory/>
            <RoomBrewery/>
            <RoomCounter/>
            <RoomInventory/>
            <RoomBrewery/>
        </Content>
    </div>
}
