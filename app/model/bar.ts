import {Beer} from "./beer";
/**
 * Created by ThaZalman on 08/09/2016.
 */
export class Bar {
    id: number;
    name: string;
    address: string;
    city: string;
    /*
    postalCode: string;
    latitude: number;
    longitude: number;
    */
    description: string;
    beers: Beer[];

    constructor()
    {
        this.id = 0;
        this.name = "";
        this.address = "";
        this.city = "";
        this.description = "";
        this.beers = [];
    }
}