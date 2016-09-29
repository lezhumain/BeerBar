/**
 * Created by ThaZalman on 14/09/2016.
 */
import { Injectable }       from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs';
import { Bar }             from '../model/bar';

@Injectable()
export class BarSearchService {
    constructor(private http: Http) {}
    search(term: string): Observable<Bar[]> {
        return this.http
            .get(`app/bars/?name=${term}`)
            .map((r: Response) => r.json().data as Bar[]);
    }
}