import {Component, OnInit} from "@angular/core";
import {Bar} from "../model/bar";
import {BarService} from "../services/bar.service";
import {Router} from "@angular/router";


@Component({
    selector: 'my-bars',

    templateUrl:'app/views/bars.component.html',
    styleUrls:  ['app/styles/bars.component.css'],
    providers: [BarService]
})

export class BarsComponent implements OnInit
{
    selectedBar: Bar;

    public static bars: Bar[];


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
            .then( bars =>
            {
                BarsComponent.bars = bars;

                if(!self.hasFilter())
                {
                    self.setFiltered(bars);
                }
                else
                    self.search(self.filterValue);
            })
            .catch(param =>
            {
                console.log("An error occured.");
                console.log(param);

                self.router.navigate(['/login']);
            });
    };

    onSelect(bar: Bar): void {
        this.selectedBar = bar;
        console.log("clicked: " + typeof(window.location));

        this.router.navigate(['/detail', bar.barId]);
    };

    ngOnInit(): void {
        this.getBars();
        this.toRemove = [];
    };

    search(searchValue : string): void {
        var self = this;
        BarsComponent.bars.forEach(function(item, index)
        {
            let id = item.barId;
            let hasThaBeer = false;
            item.listBeer.forEach(function(subitem, subindex)
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
            if(this.toRemove.indexOf(this.filteredBars[i].barId) > -1)
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
        this.filterValue = undefined;

        this.getBars();
    }

    private hasFilter(): boolean{
        return this.filterValue && this.filterValue != null && this.filterValue.length > 0;
    }

    private setFiltered(theBars: Bar[]): void
    {
        this.filteredBars = [];

        if(!theBars)
            theBars = BarsComponent.bars;

        var self = this;
        theBars.forEach(function(item)
        {
            self.filteredBars.push(item);
        });
    }
}