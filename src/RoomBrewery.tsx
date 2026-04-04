
import './RoomBrewery.css'
import bg from './assets/bg_brewery.png'
import spigotConnector from './assets/spigot_connector.png'
import './assets/spigot_end.png'
import shelf from './assets/brew_shelf.png'

import tank from './assets/brew_tank.png'
import tankArm from './assets/brew_tank_arm.png'
import tankL from './assets/brew_tank_L.png'
import tankConnector from './assets/brew_tank_connector.png'

import glass0 from './assets/glass_0p.png'
import glass40 from './assets/glass_40p_1.png'
import glass80 from './assets/glass_80p_1.png'
import boba from './assets/boba.png'

export default function RoomBrewery() {
    return <div className="room">
        <img className="room-bg" src={bg}/>

        <div className="tank">
            <img className="part-connector" src={tankConnector}/>
            <img className="part-L" src={tankL}/>
            <img className="part-tank" src={tank}/>
            <img className="part-arm" src={tankArm}/>
        </div>

        <div className="spigot-holder">

            <div className="spigot-shelf">

                <div className="spigot-row">
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={glass0}/>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={glass40}/>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={glass80}/>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={boba}/>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={boba}/>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={boba}/>
                    </div>
                </div>

                <img className="shelf" src={shelf}/>
            </div>

            <div className="spigot-shelf flip">
                <div className="spigot-row">
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={glass0}/>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={glass40}/>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={glass80}/>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={boba}/>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={boba}/>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}/>
                        <img className="drink" src={boba}/>
                    </div>
                </div>

                <img className="shelf" src={shelf}/>
            
            </div>

        </div>
    </div>
}

