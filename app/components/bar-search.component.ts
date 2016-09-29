/**
 * Created by ThaZalman on 14/09/2016.
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { BarSearchService } from '../services/bar-search.service';
import { Bar } from '../model/bar';
@Component({
    selector: 'bar-search',
    templateUrl: 'app/views/bar-search.component.html',
    styleUrls:  ['app/styles/bar-search.component.css'],
    providers: [BarSearchService]
})
export class BarSearchComponent implements OnInit {
    bars: Observable<Bar[]>;
    private searchTerms = new Subject<string>();
    constructor(
        private barSearchService: BarSearchService,
        private router: Router) {
        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="";
        ulMenu.children[1].className="";
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.bars = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.barSearchService.search(term)
                // or the observable of empty bars if no search term
                : Observable.of<Bar[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<Bar[]>([]);
            });
    }

    gotoDetail(bar: Bar): void {
        let link = ['/detail', bar.id];
        this.router.navigate(link);
    }
}