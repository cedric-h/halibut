import Boba from './assets/boba.png'
import Urchin from './assets/urchin.png'
import Barnacle from './assets/barnacle.png'

export enum Item {
    Urchin,
    Barnacle,
    Boba,
}

export namespace Item {
    export function image(item: Item) {
        switch (item) {
            case Item.Urchin: return Urchin;
            case Item.Barnacle: return Barnacle;
            case Item.Boba: return Boba;
        }
    }
}
