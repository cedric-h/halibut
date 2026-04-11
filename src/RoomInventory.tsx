import './RoomInventory.css'

import bg from './assets/bg_inventory.png'

import PileUrchin from './assets/pile_urchin.png'
import PileBarnacle from './assets/pile_barnacle.png'

export default function RoomInventory() {
    return <div className="room room-inventory">
        <img className="room-bg" src={bg}/>
        <div className="top-row">
            <div className="labeled-pile">
                <img src={PileUrchin}/>
                <span className="quantity">x5</span>
            </div>
            <div className="labeled-pile">
                <img src={PileBarnacle}/>
                <span className="quantity">x5</span>
            </div>
        </div>
    </div>
}

