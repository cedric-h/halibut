import './App.css'
import React from 'react'

function Room({ children }: { children: React.ReactNode }) {
    return <div className="room">
        {children}
    </div>
}

export default function App() {
    const [idx, setIdx] = React.useState(0);
    const allTabs = [
        <Room key={0}> <h1> hi 0 </h1> </Room>,
        <Room key={1}> <h1> hi 1 </h1> </Room>,
        <Room key={2}> <h1> hi 2 </h1> </Room>
    ];
    const tabs = Array.from({ length: 3 }, (_, i) => allTabs[(i + idx) % 3]);
    console.log(idx, Array.from({ length: 3 }, (_, i) => (i + idx) % 3));

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
