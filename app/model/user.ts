import {Beer} from "./beer";
/**
 * Created by ThaZalman on 15/10/2016.
 */
export class User {
    id: number;
    name: string;
    password: string;

    constructor()
    {
        this.id = 0;
        this.name = "";
        this.password = "";
    }
}