
import css from './RoomBrewery.module.css'
import bg from './assets/bg_brewery.png'

enum BruRecipe {
    None,
    Boba,
}
namespace BruRecipe {
    export enum State {
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
    export function art(recipe: BruRecipe, state: State): string {
        switch (recipe) {
            case BruRecipe.None:
                return css.glass0;

            case BruRecipe.Boba:
                switch (state) {
                    case State.Empty: return css.glass0;
                    case State.Brewing0: return css.glass0;
                    case State.Brewing1: return css.glass80;
                    case State.Brewed: return css.boba;
                }
        }
    }
}

type BruSlot = {
    recipe: BruRecipe,
    done: number, /* Date.now timestamp */
}

type BruSlotRow = {
    slots: BruSlot[],
    maxCount: number,
}

function SpigotRow(
    { row }: {
        row: BruSlotRow,
    }
) {
    function BruStation({ slot }: { slot: BruSlot }) {
        const state = (() => {

            if (slot.recipe == BruRecipe.None)
                return BruRecipe.State.Empty;

            if (slot.done < Date.now())
                return BruRecipe.State.Brewed;

            const duration = BruRecipe.duration(slot.recipe);
            const elapsed = duration - (slot.done - Date.now());

            if ((elapsed/duration) < 0.4)
                return BruRecipe.State.Brewing0;
            else
                return BruRecipe.State.Brewing1;
        })();

        const art = BruRecipe.art(slot.recipe, state);
        const done = (state == BruRecipe.State.Brewed) ? css.done : '';
        return <div className={css.brewStation}>
            <img className={css.spigot}/>
            <img className={[css.drink, art, done].join(' ')}/>
        </div>
    }

    function BruStationOutline() {
        return <div className={css.brewStation}>
            <img className={[css.spigot, css.outline].join(' ')}/>
            <img className={[css.drink, css.outline].join(' ')}/>
        </div>
    }

    return <div className={css.spigotRow}>
        {row.slots.map((x, i) => {
            return <BruStation key={i} slot={x}/>
        })}
        {(row.slots.length != row.maxCount) &&
                <BruStationOutline/>}
    </div>

    // return <div className="spigot-row">
    //     <div className="brew-station">
    //         <img className="spigot"/>
    //         <img className="drink" src={glass0}/>
    //     </div>
    //     <div className="brew-station">
    //         <img className="spigot"/>
    //         <img className="drink wobble40" src={glass40}/>
    //     </div>
    //     <div className="brew-station">
    //         <img className="spigot"/>
    //         <img className="drink wobble80" src={glass80}/>
    //     </div>
    //     <div className="brew-station">
    //         <img className="spigot"/>
    //         <img className="drink" src={boba}/>
    //     </div>
    //     <div className="brew-station">
    //         <img className="spigot"/>
    //         <img className="drink" src={boba}/>
    //     </div>
    //     <div className="brew-station">
    //         <img className="spigot"/>
    //         <img className="drink" src={boba}/>
    //     </div>
    // </div>
}

export default function RoomBrewery() {
    const rows = [
        {
            maxCount: 7,
            slots: [
                { recipe: BruRecipe.Boba, done: Date.now() },
                { recipe: BruRecipe.Boba, done: Date.now() + 10_000 },
                { recipe: BruRecipe.Boba, done: Date.now() +  2_000 },
                { recipe: BruRecipe.Boba, done: 0 },
            ]
        },
    ]; 
    return <div className={["room", css.roomBrewery].join(' ')}>
        <img className="room-bg" src={bg}/>

        <div className={css.tank}>
            <img className={css.partL}/>
            <img className={css.partTank}/>
            <img className={css.partArm}/>
        </div>

        <div className={css.spigotHolder}>

            <div className={css.spigotShelf}>
                <SpigotRow row={rows[0]}/>
                <img className={css.shelf}/>
            </div>

            {/*
            <div className="spigot-shelf flip">
                <SpigotRow slots={[]}/>
                <img className="shelf"/>
            </div>*/}

        </div>

        {(rows[0].slots.length == rows[0].maxCount) &&
                <img className={css.tankPartConnector}/>}
    </div>
}

