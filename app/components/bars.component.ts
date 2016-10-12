import { Component } from '@angular/core';
import {Bar} from "../model/bar";
import { OnInit } from '@angular/core';
import { BarService } from '../services/bar.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from "rxjs/Observable";
import {CustomMapComponent} from "./custom-map.component";


@Component({
    selector: 'my-bars',

    templateUrl:'app/views/bars.component.html',
    styleUrls:  ['app/styles/bars.component.css'],
    providers: [BarService],
    //directives: [CustomMapComponent]
})

export class BarsComponent implements OnInit
{
    selectedBar: Bar;
    bars: Bar[];
    filteredBars: Array<Bar>;
    toRemove: number[];
    filterValue: string;

    constructor(
        private router: Router,
        private barService: BarService) {
        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="active";
        ulMenu.children[1].className="";
    };

    getBars(): void {
        var self = this;
        this.barService.getBars()
            //.then(bars => this.bars = bars);
            .then(function(bars)
            {
                self.bars = bars;

                if(!self.hasFilter())
                {

                    //self.filteredBars = bars;
                    self.setFiltered(bars);

                    //self.filteredBars = new Observable<Bar>(observer => {
                    //    setTimeout(() => {
                    //        observer.next(42);
                    //    }, 1000);
                    //
                    //    setTimeout(() => {
                    //        observer.next(43);
                    //    }, 2000);
                    //
                    //    setTimeout(() => {
                    //        observer.complete();
                    //    }, 3000);
                    //});

                }
                else
                    self.search(self.filterValue);
            });
    };

    onSelect(bar: Bar): void {
        this.selectedBar = bar;
        console.log("clicked: " + typeof(window.location));

        this.router.navigate(['/detail', bar.id]);
    };

    ngOnInit(): void {
        this.getBars();
        this.toRemove = [];
    };


    //add(name: string): void {
    //    name = name.trim();
    //    if (!name) { return; }
    //    this.barService.create(name)
    //        .then(bar => {
    //            //this.bars.push(bar);
    //            this.selectedBar = null;
    //            this.getBars();
    //        });
    //};

    //delete(bar: Bar): void {
    //    this.barService
    //        .delete(bar.id)
    //        .then(() => {
    //            this.bars = this.bars.filter(h => h !== bar);
    //            if (this.selectedBar === bar) { this.selectedBar = null; }
    //        });
    //}

    search(searchValue : string): void {
        var self = this;
        this.bars.forEach(function(item, index)
        {
            let id = item.id;
            let hasThaBeer = false;
            item.beers.forEach(function(subitem, subindex)
            {
                //debugger;

                if(subitem.name.indexOf(searchValue) > -1) {
                    hasThaBeer = true;
                    return;
                }
            });

            if(!hasThaBeer) {
                self.toRemove.push(id);
            }
        });

        let length = this.filteredBars.length;
        for(let i = 0; i < length; ++i)
        {
            if(this.toRemove.indexOf(this.filteredBars[i].id) > -1)
            {
                this.filteredBars.splice(i, 1);
                --i;
                --length;
            }
        }

        self.toRemove = [];
        self.filterValue = searchValue;
    }

    removeFilter(): void{
        //debugger;
        this.filterValue = undefined;
        //debugger;

        //this.filteredBars = this.bars;
        //this.setFiltered();

        this.getBars();
    }

    private hasFilter(): boolean{
        return this.filterValue && this.filterValue != null && this.filterValue.length > 0;
    }

    private setFiltered(theBars: Bar[]): void
    {
        this.filteredBars = [];

        if(!theBars)
            theBars = this.bars;

        var self = this;
        theBars.forEach(function(item)
        {
            self.filteredBars.push(item);
        });
    }
}