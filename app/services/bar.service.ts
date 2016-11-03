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
    private barsUrl = 'https://localhost:8443/bars';  // URL to web api
    //private barsUrl = 'http://davanture.fr:8080/bars';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getBars(): Promise<Bar[]> {
        
        return this.http.get(this.barsUrl)
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

    //update(bar: Bar): Promise<Bar> {
    //    const url = `${this.barsUrl}/${bar.id}`;
    //    return this.http
    //        .put(url, JSON.stringify(bar), {headers: this.headers})
    //        .toPromise()
    //        .then(() => bar)
    //        .catch(this.handleError);
    //}

    //create(name: string): Promise<Bar> {
    //    return this.http
    //        .post(this.barsUrl, JSON.stringify({name: name}), {headers: this.headers})
    //        .toPromise()
    //        //.then(res => res.json().data)
    //        .then(function(res)
    //        {
    //            let bar = new Bar();
    //            bar.name = res.json().data.name;
    //            bar.id = res.json().data.id;
    //            //debugger;
    //            //return res.json().data;
    //            return bar;
    //        })
    //        .catch(this.handleError);
    //}

    //createBar(bar: Bar): Promise<Bar> {
    createBar(name: string): Promise<Bar> {
        var data = "{\"name\": \"" + name +  "\"}";

        return this.http
            .post(this.barsUrl, data, {headers: this.headers})
            .toPromise()
            //.then(res => res.json().data)
            .then(function(res)
            {
                debugger;
                console.log(res);
                return res.json().data;
            })
            .catch(this.handleError);
    }

    // TODO: see OPTIONS and CORS
    updateBar(bar: Bar): Promise<Bar> {
        let body = JSON.stringify(bar);
        debugger;

        return this.http
            .put(this.barsUrl, body, {headers: this.headers})
            .toPromise()
            //.then(res => res.json().data)
            .then(function(res)
            {
                debugger;
                console.log(res);
                return res.json().data;
            })
            .catch(this.handleError);
    }
    //
    //
    //delete(barId: number): Promise<void> {
    //    let url = `${this.barsUrl}/${id}`;
    //    return this.http.delete(url, {headers: this.headers})
    //        .toPromise()
    //        .then(() => null)
    //        .catch(this.handleError);
    //}
}