import './App.css'

import RoomBrewery from "./brew/RoomBrewery.tsx"
import RoomCounter from "./RoomCounter.tsx"
import RoomInventory from "./RoomInventory.tsx"

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
        <RoomInventory/>
        <RoomBrewery/>
        <RoomCounter/>
        <RoomInventory/>
        <RoomBrewery/>
    </div>
}
