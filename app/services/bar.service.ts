/**
 * Created by ThaZalman on 08/09/2016.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bar } from '../model/bar';
import {Beer} from "../model/beer";

@Injectable()
export class BarService {
    //private barsUrl = 'https://localhost:8443/bars';  // URL to web api
    //private barsUrl = 'http://davanture.fr:8080/bars';  // URL to web api
    private wildcard: string = "%";
    private baseUrl: string = "http://localhost:8080";
    private barsUrl; // URL to web api
    private addBeerUrl;

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) 
    {
        this.barsUrl = this.baseUrl +"/bars";  // URL to web api
        this.addBeerUrl = this.baseUrl + "/bars/" + this.wildcard + "/beers";
    }

    getBars(): Promise<Bar[]> {
        
        return this.http.get(this.barsUrl, { withCredentials: true })
            .toPromise()
            //.then(response => response.json().data as Bar[])
            .then(response => {
                console.log("HERE");
                console.log(response);

                var bars = response.json() as Bar[];

                return bars;
            })
            .catch(this.handleError);
        

        //return Promise.resolve(BarService.bars);
    }

    getBar(barId: number): Promise<Bar> {
        return this.getBars()
            .then(bars => bars.find(bar => bar.barId === barId));
    }

    getBarByName(name: string): Promise<Bar> {
        return this.getBars()
            .then(bars => bars.find(bar => bar.name === name));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    //createBar(bar: Bar): Promise<Bar> {
    createBar(name: string): Promise<Bar> {
        // TODO pass bar as param
        //var data = "{\"name\": \"" + name +  "\"}";
        var data = name;

        return this.http
            .post(this.barsUrl, data, {headers: this.headers, withCredentials: true,withCredentials: true})
            .toPromise()
            //.then(res => res.json().data)
            .then(function(res)
            {
                //console.log(res);
                return res.json();
            })
            .catch(this.handleError);
    }

    updateBar(bar: Bar): Promise<Bar> {
        let body = JSON.stringify(bar);

        return this.http
            .put(this.barsUrl, body, {headers: this.headers, withCredentials: true,withCredentials: true})
            .toPromise()
            //.then(res => res.json().data)
            .then(function(res)
            {
                console.log(res);
                return res.json();
            })
            .catch(this.handleError);
    }

    addBeer(bar: Bar, beer: Beer): Promise<Bar> {
        let body = JSON.stringify(beer);
        let barName = bar.name.replace(" ", "+");
        let url = this.addBeerUrl.replace(this.wildcard, barName);

        debugger;
        return this.http
            .post(url, body, {headers: this.headers, withCredentials: true,withCredentials: true})
            .toPromise()
            //.then(res => res.json().data)
            .then(function(res)
            {
                debugger;
                console.log(res);
                return res.json();
            })
            .catch(this.handleError);
    }
    //
    //
    //delete(barId: number): Promise<void> {
    //    let url = `${this.barsUrl}/${id}`;
    //    return this.http.delete(url, {headers: this.headers, withCredentials: true})
    //        .toPromise()
    //        .then(() => null)
    //        .catch(this.handleError);
    //}
}