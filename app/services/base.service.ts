/**
 * Created by ThaZalman on 08/09/2016.
 */
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bar } from '../model/bar';
import {Beer} from "../model/beer";

@Injectable()
export class BaseService {
    protected headers = new Headers({'Content-Type': 'application/json'});

    constructor(protected http: Http)
    {
    }

    protected handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}