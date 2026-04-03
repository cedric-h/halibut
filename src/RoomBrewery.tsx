
import './RoomBrewery.css'
import bg from './assets/bg_brewery.png'
import spigotConnector from './assets/spigot_connector.png'
import spigotEnd from './assets/spigot_end.png'

export default function RoomBrewery() {
    return <div className="room">
        <img className="room-bg" src={bg}></img>
        <div className="spigot-holder">
            <div className="spigot-row">
                <img className="spigot" src={spigotConnector}></img>
                <img className="spigot" src={spigotConnector}></img>
                <img className="spigot" src={spigotConnector}></img>
                <img className="spigot" src={spigotConnector}></img>
                <img className="spigot" src={spigotEnd}></img>
            </div>
            <div className="spigot-row">
                <img className="spigot" src={spigotConnector}></img>
                <img className="spigot" src={spigotConnector}></img>
                <img className="spigot" src={spigotEnd}></img>
            </div>
        </div>
    </div>
}

