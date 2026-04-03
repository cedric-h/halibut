import './App.css'
import React from 'react'

import RoomCounter from "./RoomCounter.tsx"

import bg1 from './assets/bg1.png'
import bg3 from './assets/bg3.png'

function Room({ children, bg }: { bg: string, children: React.ReactNode }) {
    return <div className="room">
        <img className="room-bg" src={bg}></img>
        {children}
    </div>
}

export default function App() {
    const [idx, setIdx] = React.useState(2);
    const allTabs = [
        <Room key={0} bg={bg1}> </Room>,
        <RoomCounter key={1}/>,
        <Room key={2} bg={bg3}> </Room>
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
