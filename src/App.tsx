import './App.css'
import React from 'react'

import RoomBrewery from "./RoomBrewery.tsx"
import RoomCounter from "./RoomCounter.tsx"
import RoomInventory from "./RoomInventory.tsx"

export default function App() {
    const [idx, setIdx] = React.useState(0);
    const allTabs = [
        <RoomBrewery key={0}/>,
        <RoomCounter key={1}/>,
        <RoomInventory key={2}/>
    ];
    const tabs = Array.from({ length: 3 }, (_, i) => allTabs[(i + idx) % 3]);

    return <div
        className="main-content"
        onScrollEnd={e => {
            const t = e.target as HTMLElement;
            const w = t.children[0].getBoundingClientRect().width;

            const scrollIdx = (Math.round(t.scrollLeft / w) + 2) % 3;
            const newIdx = (scrollIdx + idx) % 3;
            if (newIdx != idx) setIdx(newIdx);
        }}
        ref={el => {
            if (el)  {
                el.scrollLeft = el.children[0].getBoundingClientRect().width;
            }
        }}
    >
        {tabs}
    </div>
}
