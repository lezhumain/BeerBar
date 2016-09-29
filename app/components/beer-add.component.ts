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
        //let referrer = document.referrer.split('/');
        //let id = referrer[referrer.length - 1];
        //
        //console.log(id);
        //this.barId = +id;
        //
        //debugger;
        //if(isNaN(this.id))
        //{
        //    console.log("aucun id bar...");
        //    this.navigate("/bars");
        //}
        //else
        //    console.log("id bar = " + this.barId);

        this.route.params.forEach((params: Params) => {
            let name = params['bar'].replace("%%", "=");

            if(!name)
                this.goBack();

            this.barName = atob(name);
            //debugger;
            this.barService.getBarByName(this.barName)
                .then(bar => this.bar = bar);
        });
    };

    goBack(): void {
        window.history.back();
    };

    private navigate(url: string): void{
        this.router.navigate([url]);
    };

    save(name: string, degre: number): void {
        this.beer.name = name;
        this.beer.degree = degre ? degre : 0;
        console.log(this.beer);

        this.bar.beers.push(this.beer);

        //debugger;
        if (!name)
        {
            return;
        }

        let self = this;
        this.barService.update(this.bar)
            .then(bar => {
                console.log("beer-add.component.ts");
                console.log(bar);
                //debugger;
                self.navigate("/detail/" + this.bar.id);
            });
    }
}