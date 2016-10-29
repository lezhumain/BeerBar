// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BarService } from '../services/bar.service';
import {Bar} from "../model/bar";

@Component({
    selector: 'my-bar-detail',
    templateUrl: 'app/views/bar-detail.component.html',
    styleUrls: ['app/styles/bar-detail.component.css']
})
export class BarDetailComponent implements OnInit {
    @Input()
    bar: Bar;

    constructor(
        private barService: BarService,
        private route: ActivatedRoute,
        private router: Router)
    {
        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="";
        ulMenu.children[1].className="";
    };

    ngOnInit(): void {
        // get id from url?
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            //var self = this;
            this.barService.getBar(id)
                .then(bar => this.bar = bar);
                //.then(function(bar)
                //{
                //    self.bar = bar;
                //    //console.log(self.bar.listBeer.length);
                //});
        });

        //console.log(this.bar.listBeer);
    };

    static goBack(): void {
        window.history.back();
    };

    navigate(url: string): void{
        this.router.navigate([url]);
    };

    gotoCreateBeer(): void
    {
        let barName = btoa(this.bar.name).replace("=", "%%");
        //let url = "/beer/create?bar=" + barName;
        let url = "/beer/create/" + barName;
        //debugger;
        this.navigate(url);
    };

    save(): void {
        console.log("method commented out");
        //this.barService.update(this.bar)
        //    .then(this.goBack);
    }
}