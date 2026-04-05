import { useTimeout } from 'src/hooks.ts'
import React from 'react'

import './RoomBrewery.css'
import bg from 'src/assets/bg_brewery.png'

enum BruRecipe {
    None,
    Boba,
}
namespace BruRecipe {
    export enum Stage {
        Empty,
        Brewing0,
        Brewing1,
        Brewed
    }

    /* returns time in milliseconds */
    export function duration(recipe: BruRecipe): number {
        switch (recipe) {
            case BruRecipe.None:
                return 0;
            case BruRecipe.Boba:
                return 10_000;
        }
    }

    /* returns CSS class name */
    export function art(recipe: BruRecipe, state: Stage): string {
        switch (recipe) {
            case BruRecipe.None:
                return "glass0";

            case BruRecipe.Boba:
                switch (state) {
                    case Stage.Empty: return "glass0";
                    case Stage.Brewing0: return "glass40";
                    case Stage.Brewing1: return "glass80";
                    case Stage.Brewed: return "boba";
                }
        }
    }
}

type BruSlot = {
    recipe: BruRecipe,
    done: number, /* Date.now timestamp */
    id: number,
    nu: boolean,
}

type BruSlotRow = {
    slots: BruSlot[],
    full: boolean,
}

function DrinkRow(
    { row, dispatch }: {
        row: BruSlotRow,
        dispatch: React.ActionDispatch<[_: BruEvent]>,
    }
) {
    function Drink({ slot }: { slot: BruSlot }) {
        const [_, rerender] = React.useReducer(n => n + 1, 0);

        const duration = BruRecipe.duration(slot.recipe);
        const remaining = slot.done - Date.now();
        const elapsed = duration - remaining;

        useTimeout(() => rerender(), (remaining > 0) ? remaining : null);

        const state = (() => {
            if (slot.recipe == BruRecipe.None)
                return BruRecipe.Stage.Empty;

            if (slot.done < Date.now())
                return BruRecipe.Stage.Brewed;

            if ((elapsed/duration) < 0.4)
                return BruRecipe.Stage.Brewing0;
            else
                return BruRecipe.Stage.Brewing1;
        })();

        const art = BruRecipe.art(slot.recipe, state);
        const nu = slot.nu ? "new " : "";

        let drink = <img className={"drink " + nu + art}/>;
        if (state == BruRecipe.Stage.Brewed) {
            drink = <img
                className={"drink done " + nu + art}
                onClick={() => dispatch({
                    kind: BruEventKind.CollectDrink,
                    id: slot.id,
                })}
            />
        }

        return drink;
    }

    // function BruStationOutline() {
    //     return <div className="brew-station">
    //         <img
    //             className="spigot outline"
    //             onClick={() => dispatch({ kind: BruEventKind.BuySpigot })}
    //         />
    //         <img className="drink outline"/>
    //     </div>
    // }
    // {(row.slots.length != row.maxCount) &&
    //         <BruStationOutline/>}

    return <>
        {row.slots.map((x, i) => {
            return <Drink key={i} slot={x}/>
        })}
        {(!row.full) &&
            <img className="drink outline"/>}
    </>
}

enum BruEventKind {
    BuySpigot,
    CollectDrink,
}
type BruEvent = { kind: BruEventKind.BuySpigot } |
                { kind: BruEventKind.CollectDrink, id: number };

export default function RoomBrewery() {
    const [slots, dispatch] = React.useReducer(
        (slots: BruSlot[], ev: BruEvent) => {
            slots = slots.map(x => ({ ...x, nu: false }));

            switch (ev.kind) {
                case BruEventKind.BuySpigot:
                    return [...slots, {
                        recipe: BruRecipe.None,
                        done: Date.now(),
                        id: slots.length,
                        nu: true,
                    }];
                case BruEventKind.CollectDrink:
                    return slots.map(s => {
                        if (s.id == ev.id)
                            return {
                                ...s,
                                recipe: BruRecipe.None,
                                done: Date.now(),
                            };
                        return s;
                    });
            }
        },
        [
            {
                id: 1,
                recipe: BruRecipe.Boba,
                done: Date.now()+10_000*Math.random(),
                nu: true,
            },
        ]
    ); 

    const rows = [
        {
            full: slots.slice(0, 6).length == 6,
            slots: slots.slice(0, 6),
        },
        {
            full: slots.slice(6, 12).length == 6,
            slots: slots.slice(6, 12),
        }
    ];

    function SpigotRow({row}: { row: BruSlotRow }) {
        return <>
            {row.slots.map((_, i) => {
                return <img key={i} className="spigot"/>
            })}
            {(!row.full) &&
                <img
                    className="spigot outline"
                    onClick={() => dispatch({ kind: BruEventKind.BuySpigot })}
                />}
        </>
    }

    return <div className="room room-brewery">
        <img className="room-bg" src={bg}/>

        <div className="tank">
            <img className="part-L"/>
            <img className="part-tank"/>
            <img className="part-arm"/>

            <div className="spigot-row-wrapper">
                <div className="spigot-row">
                    <SpigotRow row={rows[0]}/>
                </div>
                {(rows[0].full) && <div className="spigot-row flip">
                    <SpigotRow row={rows[1]}/>
                </div>}
            </div>

            {(rows[0].full) && <img className="tank-part-connector"/>}
        </div>

        <div className="spigot-holder">

            <div className="drink-shelf-wrapper">
                <div className="drink-shelf">
                    <div className="drink-row">
                        <DrinkRow dispatch={dispatch} row={rows[0]}/>
                    </div>
                    <img className="shelf"/>
                </div>
                <div className="drink-shelf flip">
                    <div className="drink-row">
                        {(rows[0].full) &&
                            <DrinkRow dispatch={dispatch} row={rows[1]}/>}
                    </div>
                    <img className="shelf"/>
                </div>
            </div>

        </div>
    </div>
}

