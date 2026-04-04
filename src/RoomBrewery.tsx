
import './RoomBrewery.css'
import bg from './assets/bg_brewery.png'
import spigotConnector from './assets/spigot_connector.png'
import './assets/spigot_end.png'
import shelf from './assets/brew_shelf.png'

import glass0 from './assets/glass_0p.png'
import glass40 from './assets/glass_40p_1.png'
import glass80 from './assets/glass_80p_1.png'
import boba from './assets/boba.png'

export default function RoomBrewery() {
    return <div className="room">
        <img className="room-bg" src={bg}></img>

        <div className="spigot-holder">

            <div className="spigot-shelf">

                <div className="spigot-row">
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={glass0}></img>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={glass40}></img>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={glass80}></img>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={boba}></img>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={boba}></img>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={boba}></img>
                    </div>
                </div>

                <img className="shelf" src={shelf}></img>
            </div>

            <div className="spigot-shelf flip">
                <div className="spigot-row">
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={glass0}></img>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={glass40}></img>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={glass80}></img>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={boba}></img>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={boba}></img>
                    </div>
                    <div className="brew-station">
                        <img className="spigot" src={spigotConnector}></img>
                        <img className="drink" src={boba}></img>
                    </div>
                </div>

                <img className="shelf" src={shelf}></img>
            
            </div>

        </div>
    </div>
}

