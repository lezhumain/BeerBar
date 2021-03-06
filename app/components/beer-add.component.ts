// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BarService } from '../services/bar.service';
import {Beer} from "../model/beer";
import {Bar} from "../model/bar";

@Component({
    selector: 'my-beer-add',
    templateUrl: 'app/views/beer-add.component.html',
    styleUrls: ['app/styles/beer-add.component.css']
})

export class BeerAddComponent implements OnInit {
    @Input()
    beer: Beer;
    bar: Bar;
    barName: string;

    constructor(
        private barService: BarService,
        private route: ActivatedRoute,
        private router: Router) {
        this.beer = new Beer();
        this.barName = "";

        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="";
        ulMenu.children[1].className="";
    };

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let name = params['bar'].replace("%%", "=");

            if(!name)
                BeerAddComponent.goBack();

            this.barName = atob(name);

            this.barService.getBarByName(this.barName)
                .then(bar => this.bar = bar);
        });
    };

    static goBack(): void {
        window.history.back();
    };

    //noinspection JSUnusedLocalSymbols
    private navigate(url: string): void{
        this.router.navigate([url]);
    };

    save(name: string, degre: number): void {
        let self = this;
        this.beer.name = name;
        this.beer.degree = degre ? degre : 0;
        // console.log(this.beer);

        this.bar.listBeer.push(this.beer);

        //debugger;
        if (!name)
        {
            return;
        }


        this.barService.addBeer(this.bar, this.beer)
            .then(bar => {
                console.log("beer-add.component.ts");
                console.log(bar);
                self.navigate("/detail/" + this.bar.barId);
            });
    }
}