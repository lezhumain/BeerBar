/**
 * Created by ThaZalman on 08/09/2016.
 */
import { Injectable }    from '@angular/core';
//import {Http, Headers, URLSearchParams} from '@angular/http';

//import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {IMarker} from "../model/imarker";




@Injectable()
export class GoomapService {
    private baseUrl: string = 'http://swapi.co/api';
    private peopleUrl: string = '/people';
    private nearbyUrl : string = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';  // URL to web api
    private apiKey: string = "AIzaSyDOoBhiWusApq1Od-vMIRZrnRO-G2GB62A";

    //private headerstes = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json', 'Origin': ''});


    MARKERS: IMarker[] = [
        {
            lat: 45.7712176,
            lng: 4.887316999999999,
            label: 'Graines de Star Comedy Club',
            draggable: false
        },
        {
            lat: 45.5,
            lng: 7.6,
            label: 'Y',
            draggable: false
        }
    ];

    //constructor(private jsonp: Jsonp) { }
    constructor(private http: Http) { }

    // getAll(): Observable<Person[]>{
    //     let people$ = this.http
    //         .get(`${this.baseUrl}/people`, {headers: this.getHeaders()})
    //         .map(mapObjs);
    //     return people$;
    // }

    getAll(): Observable<{}>{
        let url = this.baseUrl + this.peopleUrl;

        let people$ = this.http
            .get(url, {headers: this.getHeaders()})
            .map(this.mapObjs);
        return people$;
    }

    getAllArray(): Promise<IMarker[]>
    {
        return Promise.resolve(this.MARKERS);
    }

    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        //headers.append('Content-Type', 'application/json');
        //headers.append('Origin', '');

        return headers;
    }

    private mapObjs(response:Response): Array<any>{
        // The response of the API has a results
        // property with the actual results
        debugger;
        var self = this;
        return response.json().results.map(resp => {
            //debugger;
            console.log('Parsed response:', resp);
            return resp;
        })
    }

    // to avoid breaking the rest of our app
    // I extract the id from the person url
    //private extractId(personData:any){
    //    let extractedId = personData.url.replace('http://swapi.co/api/people/','').replace('/','');
    //    return parseInt(extractedId);
    //}



     getPlacesTest(geoloc: string, types: string, rad: number): Promise<any> {
         // Parameters obj-
         let params: URLSearchParams = new URLSearchParams();
         params.set('key', this.apiKey);
         params.set('location', geoloc);
         params.set('radius', rad.toString());
         params.set('types', types);

         debugger;
          return this.http.get(this.nearbyUrl, {
                        search: params,
                        headers: this.getHeaders()
                  })
                  .toPromise()
                  .then(response => {
                      debugger;
                      let data = response.json().data
                      return data;
                  })
                  .catch(this.handleError);

         //this.jsonp
         //    .get(this.nearbyUrl, { search: params })
         //    .toPromise()
         //    .then(response => response.json().data)
         //    .catch(this.handleError);

         //let url = this.baseUrl + this.peopleUrl;
         //return this.http.get(url)
         //    .map(response => response.json());
     }

    // private getHeaders(){
    //     let headers = new Headers();
    //     headers.append('Accept', 'application/json');
    //     return headers;
    // }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}