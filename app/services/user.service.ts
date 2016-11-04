import {Headers, Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Bar} from "../model/bar";
import {User} from "../model/user";
/**
 * Created by ThaZalman on 15/10/2016.
 */
@Injectable()
export class UserService {
    private userUrl = 'http://192.168.1.108:8080/login';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    private static loggedIn = false;

    private static users: User[] = [
        {id: 1, name: 'lez', password: "123lol"},
        {id: 2, name: 'hum', password: "123lol"},
        {id: 3, name: 'ain', password: "123lol"},

    ];

    constructor(private http: Http) {
        console.log("creation of UserService");
        //debugger;
    }

    // TODO: post
    login(name: string, pass: string): Promise<boolean>
    {
        //return this.http.get(this.barsUrl)
        //    .toPromise()
        //    .then(response => response.json().data as Bar[])
        //    .catch(this.handleError);

        var ok = false;
        var data = "{\"username\":\"" + name + "\",\"password\":\"" + pass + "\"}";
        debugger;
        //UserService.users.forEach(function(elem, index)
        //{
        //    // console.log(elem);
        //    if(elem.name === name && elem.password === pass)
        //    {
        //        ok = true;
        //        return;
        //    }
        //});

        return this.http
            .post(this.userUrl, data, {headers: this.headers})
            .toPromise()
            .then( res =>
            {
                console.log(res);

                UserService.loggedIn = ok;

                return res.json();
            })
            .catch(this.handleError);


        //return Promise.resolve(UserService.loggedIn);
    }

    isLoggedIn(): boolean
    {
        return UserService.loggedIn;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}