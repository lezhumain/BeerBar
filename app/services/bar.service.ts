/**
 * Created by ThaZalman on 08/09/2016.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bar } from '../model/bar';
import {Beer} from "../model/beer";
import {BaseService} from "./base.service";

@Injectable()
export class BarService extends BaseService{
    //private barsUrl = 'https://localhost:8443/bars';  // URL to web api
    //private barsUrl = 'http://davanture.fr:8080/bars';  // URL to web api
    private wildcard: string = "%";
    //private baseUrl: string = "http://localhost:8080";
    private baseUrl: string = "http://davanture.fr:8080";
    private barsUrl; // URL to web api
    private addBeerUrl;

    private bars: Bar[] = null;

    constructor(http: Http)
    {
        super(http);

        this.barsUrl = this.baseUrl +"/bars";  // URL to web api
        this.addBeerUrl = this.baseUrl + "/bars/" + this.wildcard + "/beers";

        this.getBars();
    }

    getBars(): Promise<Bar[]> {
        var self = this;

        return this.http.get(this.barsUrl, { withCredentials: true })
            .toPromise()
            //.then(response => response.json().data as Bar[])
            .then(response => {
                console.log("HERE");
                console.log(response);

                self.bars = response.json() as Bar[];

                return self.bars;
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

    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }

    //createBar(bar: Bar): Promise<Bar> {
    createBar(bar: Bar): Promise<Bar> {
        // TODO pass bar as param
        //var data = "{\"name\": \"" + name +  "\"}";
        //var data = name;
        var data = JSON.stringify(bar);

        return this.http
            .post(this.barsUrl, data, {headers: this.headers, withCredentials: true})
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
            .put(this.barsUrl, body, {headers: this.headers, withCredentials: true})
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

        return this.http
            .post(url, body, {headers: this.headers, withCredentials: true})
            .toPromise()
            //.then(res => res.json().data)
            .then(function(res)
            {
                console.log(res);
                return res.json();
            })
            .catch(this.handleError);
    }

    barExists(barName: string): boolean
    {
        var self = this;

        if(self.bars == null)
            return false;

        self.bars.forEach(function(item, index)
        {
            if(item.name === barName)
                return true;
        });

        return false;
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