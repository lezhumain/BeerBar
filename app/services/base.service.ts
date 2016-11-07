/**
 * Created by ThaZalman on 08/09/2016.
 */
import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class BaseService {
    protected headers = new Headers({'Content-Type': 'application/json'});
    protected baseUrl: string = "https://davanture.fr:8080";
    // protected baseUrl: string = "http://davanture.fr:8080";
    // protected baseUrl: string = "http://localhost:8080";


    constructor(protected http: Http)
    {
    }

    protected handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}