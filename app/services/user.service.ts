import {Headers, Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Bar} from "../model/bar";
import {User} from "../model/user";
/**
 * Created by ThaZalman on 15/10/2016.
 */
@Injectable()
export class UserService {
    private userUrl = 'app/login';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    private loggedIn = false

    private static users: User[] = [
        {id: 1, name: 'lez', password: "123lol"},
        {id: 2, name: 'hum', password: "123lol"},
        {id: 3, name: 'ain', password: "123lol"},

    ];

    constructor(private http: Http) { }

    // TODO: post
    login(name: string, pass: string): Promise<boolean>
    {
        //return this.http.get(this.barsUrl)
        //    .toPromise()
        //    .then(response => response.json().data as Bar[])
        //    .catch(this.handleError);

        var ok = false;
        UserService.users.forEach(function(elem, index)
        {
            // console.log(elem);
            if(elem.name === name && elem.password === pass)
            {
                ok = true;
                return;
            }
        });

        this.loggedIn = ok;
        return Promise.resolve(ok);
    }

    isLoggedIn(): boolean
    {
        return this.loggedIn;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}