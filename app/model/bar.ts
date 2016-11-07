import {Beer} from "./beer";
/**
 * Created by ThaZalman on 08/09/2016.
 */
export class Bar {
    barId: number;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    description: string;
    listBeer: Beer[];

    constructor()
    {
        this.barId = 0;
        this.name = "";
        this.address = "";
        this.city = "";
        this.postalCode = "";
        this.latitude = 0;
        this.longitude = 0;
        this.description = "";
        this.listBeer = [];
    }
}