import {Beer} from "./beer";
/**
 * Created by ThaZalman on 15/10/2016.
 */
export class User {
    id: number;
    username: string;
    password: string;
    token: string;

    constructor()
    {
        this.id = 0;
        this.username = "";
        this.password = "";
        this.token = "";
    }
}