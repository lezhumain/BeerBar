import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {User} from "../model/user";
import {BaseService} from "./base.service";
/**
 * Created by ThaZalman on 15/10/2016.
 */
@Injectable()
export class UserService extends BaseService{
    private userUrl: string;  // URL to web api
    private static loggedIn = false;

    private static users: User[] = [
        {id: 1, username: 'lez', password: "123lol", token: "okok"},
        {id: 2, username: 'hum', password: "123lol", token: "okok"},
        {id: 3, username: 'ain', password: "123lol", token: "okok"}
    ];

    constructor(http: Http)
    {
        super(http);


        console.log("creation of UserService");
        //debugger;
        this.userUrl =  this.baseUrl + "/login";
    }

    // TODO: post
    login(name: string, pass: string): Promise<any>
    {
        var ok = false;
        var data = "{\"username\":\"" + name + "\",\"password\":\"" + pass + "\"}";

        return this.http
            .post(this.userUrl, data, {headers: this.headers, withCredentials: true})
            .toPromise()
            .then( res =>
            {
                UserService.loggedIn = true;
                return res.json();
            })
            .catch(this.handleError);
    }

    isLoggedIn(): boolean
    {
        return UserService.loggedIn;
    }
}