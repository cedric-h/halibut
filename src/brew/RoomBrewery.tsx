
// so tsc won't yell about setting a css var in a style attr
import 'src/types.d.ts'

import { useTimeout } from 'src/hooks.ts'
import { Item } from 'src/item.ts'
import { AppEventKind, AppDispatchContext } from "src/AppDispatchContext.ts"
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
        Brewing2,
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

            case BruRecipe.Boba:
                switch (state) {
                    case Stage.Empty: return "outline";
                    case Stage.Brewing0: return "glass0 brew-wobble";
                    case Stage.Brewing1: return "glass40";
                    case Stage.Brewing2: return "glass80";
                    case Stage.Brewed: return "boba";
                }

            case BruRecipe.None:
                return "outline";
        }
    }
}

type BruSlot = {
    recipe: BruRecipe,
    done: number, /* Date.now timestamp */
    nu: number, /* Date.now timestamp */
    id: number,
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
        const appDispatch = React.useContext(AppDispatchContext);

        let [untilRerender, state] = (() => {
            const duration = BruRecipe.duration(slot.recipe);
            const remaining = slot.done - Date.now();
            const brewStop0 = duration*0.2;
            const brewStop1 = duration*0.7;
            const elapsed = duration - remaining;

            if (slot.recipe == BruRecipe.None)
                return [0, BruRecipe.Stage.Empty];

            if (slot.done < Date.now())
                return [0, BruRecipe.Stage.Brewed];

            if (elapsed < brewStop0)
                return [brewStop0 - elapsed, BruRecipe.Stage.Brewing0];
            if (elapsed < brewStop1)
                return [brewStop1 - elapsed, BruRecipe.Stage.Brewing1];
            else
                return [remaining, BruRecipe.Stage.Brewing2];
        })();

        const timeTilOld = (slot.nu + 200) - Date.now();
        if ((timeTilOld > 0) && (timeTilOld < untilRerender))
            untilRerender = timeTilOld;

        useTimeout(rerender, (untilRerender > 0) ? untilRerender : null);

        const art = BruRecipe.art(slot.recipe, state);
        const nu = (timeTilOld > 0) ? "new " : "";

        switch (state) {
            case BruRecipe.Stage.Empty:
                return <img
                    className={"drink " + art}
                    onClick={ev => {
                        const box = (ev.target as HTMLElement)
                            .getBoundingClientRect();
                        appDispatch({
                            kind: AppEventKind.FlyingItemIntoFrame,
                            item: Item.Barnacle,
                            x: box.x,
                            y: box.y,
                        });

                        dispatch({
                            kind: BruEventKind.StartDrink,
                            recipe: BruRecipe.Boba,
                            id: slot.id,
                        });
                    }}
                />
                
            case BruRecipe.Stage.Brewed:
                return <img
                    className={"drink done " + nu + art}
                    onClick={ev => {
                        dispatch({
                            kind: BruEventKind.CollectDrink,
                            id: slot.id,
                        });
                        const box = (ev.target as HTMLElement)
                            .getBoundingClientRect();
                        appDispatch({
                            item: Item.Boba,
                            kind: AppEventKind.FlyingItemOutOfFrame,
                            x: box.x,
                            y: box.y,
                        });
                    }}
                />

            default:
                return <img
                    style={{
                        '--drink-brew-delay': `${-(Date.now()/1000 % 1)}s`,
                        '--drink-slide-in-delay': (slot.nu - Date.now()) + 'ms',
                    }}
                    className={"drink " + nu + art}
                />
        }
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
    StartDrink,
}
type BruEvent = { kind: BruEventKind.BuySpigot } |
    { kind: BruEventKind.CollectDrink, id: number } |
    { kind: BruEventKind.StartDrink, id: number, recipe: BruRecipe }
    ;

export default function RoomBrewery() {
    const [slots, dispatch] = React.useReducer(
        (slots: BruSlot[], ev: BruEvent) => {

            switch (ev.kind) {

                case BruEventKind.BuySpigot:
                    return [...slots, {
                        recipe: BruRecipe.None,
                        done: Date.now(),
                        id: slots.length,
                        nu: Date.now(),
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

                case BruEventKind.StartDrink:
                    return slots.map(s => {
                        if (s.id == ev.id)
                            return {
                                ...s,
                                nu: Date.now(),
                                recipe: ev.recipe,
                                done: Date.now() + BruRecipe.duration(
                                    ev.recipe
                                ),
                            };
                        return s;
                    });
            }
        },
        [
            {
                id: 0,
                recipe: BruRecipe.Boba,
                done: Date.now(),//+BruRecipe.duration(BruRecipe.Boba),
                nu: Date.now(),
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

