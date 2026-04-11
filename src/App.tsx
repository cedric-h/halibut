import './App.css'

import React from 'react'
import { AppEventKind, AppDispatchContext } from "./AppDispatchContext.ts"
import type { AppEvent } from "./AppDispatchContext.ts"
import { Item } from './item.ts'
import { useTimeout } from 'src/hooks.ts'

import RoomBrewery from "./brew/RoomBrewery.tsx"
import RoomCounter from "./RoomCounter.tsx"
import RoomInventory from "./RoomInventory.tsx"

let flyingItemIdGen = 0;

/* by factoring the content into another component, app dispatches
 * can't cause rerenders that mess up the main app's scroll position */
function Content({ children }: { children: React.ReactNode[] }) {

    type FlyingItem = {
        id: number,
        img: string,
        x: string,
        y: string,
        pushX: string,
        pushY: string,
        spin: boolean,
        animation: string,
        ttl: number,
        dieAt: number, /* Date.now() timestamp */
    };

    const [flyingItems, dispatch] = React.useReducer<FlyingItem[], [_: AppEvent]>(
        (flyingItems, ev) => {

            const remainingItems = flyingItems.filter(x => x.dieAt > Date.now());
            console.log(`${flyingItems.length} -> ${remainingItems.length}`);

            if (ev.kind == AppEventKind.FlyingItemIntoFrame ||
                ev.kind == AppEventKind.FlyingItemOutOfFrame) {
                const { kind, item, x, y } = ev;
                const vw1 = window.innerWidth/100;
                const vh1 = window.innerHeight/100;
                // see main.css
                const rem = 6 * Math.min(vw1, vh1 * (9/16));

                const main = document.querySelector("main#root");
                const mainBox = (main as HTMLElement)
                    .getBoundingClientRect();

                /* coordinates relative to content window and
                 * translated to rems so they respond to resizes */
                const xRem = ((x - mainBox.x) / rem);
                const yRem = ((y - mainBox.y) / rem);
                
                const outsideX = -5;
                const outsideY = 10;

                let newItem;
                {
                    let animation, fromX, fromY, gotoX, gotoY, spin;
                    switch (kind) {
                        case AppEventKind.FlyingItemOutOfFrame:
                            fromX = xRem
                            fromY = yRem
                            gotoX = outsideX
                            gotoY = outsideY
                            spin = true
                            animation = 'out-of-frame-kickflip'
                            break;
                        case AppEventKind.FlyingItemIntoFrame:
                            fromX = outsideX
                            fromY = outsideY
                            gotoX = xRem
                            gotoY = yRem
                            spin = false
                            animation = 'into-frame-kickflip'
                            break;
                    }
                    newItem = {
                        id: flyingItemIdGen++,
                        img: Item.image(item),
                        x: fromX + 'rem',
                        y: fromY + 'rem',
                        pushX: (gotoX - fromX) + 'rem',
                        pushY: (gotoY - fromY) + 'rem',
                        spin,
                        animation,
                        dieAt: Date.now() + 1200,
                        ttl: 1200,
                    }
                }

                return [
                    ...remainingItems,
                    newItem
                ];
            }

            return remainingItems;
        },
        []
    )

    const nextDeath = flyingItems.reduce(
        (a, x) => Math.min(a, 100 + x.dieAt - Date.now()),
        Infinity,
    );
    console.log(nextDeath);
    useTimeout(
        () => dispatch({ kind: AppEventKind.FlyingItemRerender }),
        isFinite(nextDeath) ? nextDeath : null
    )

    return <AppDispatchContext value={dispatch}>
        {children}
        {flyingItems.map(item => {
            return <div
                key={item.id}
                style={{
                    left: item.x,
                    top: item.y,
                    '--flying-item-ttl': item.ttl + 'ms',
                    '--flying-item-animation': item.animation,
                    '--flying-item-spin-speed': item.spin ? '0.5s' : '0s',
                    '--flying-item-push-x': item.pushX,
                    '--flying-item-push-y': item.pushY,
                    '--flying-item-img': `url(${item.img})`,
                }}
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
