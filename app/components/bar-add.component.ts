// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BarService } from '../services/bar.service';
import {Bar} from "../model/bar";

@Component({
    selector: 'my-bar-add',
    templateUrl: 'app/views/bar-add.component.html',
    styleUrls: ['app/styles/bar-add.component.css']
})
export class BarAddComponent implements OnInit {
    @Input()
    bar: Bar;

    constructor(
        private barService: BarService,
        private route: ActivatedRoute,
        private router: Router) {
        this.bar = new Bar();

        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="";
        ulMenu.children[1].className="";
    }

    ngOnInit(): void {
    }

    goBack(): void {
        window.history.back();
    }

    private navigate(url: string): void{
        //route.n
        //window.location = url;

        // TODO check this
        this.router.navigate([url]);
    }

    save(name: string, city: string): void {
        this.bar.name = name;
        this.bar.city = city;
        console.log(this.bar);


        if (!name)
            return;

        console.log("method commented out");
        //this.barService.createBar(this.bar)
        //    .then(bar => {
        //        console.log("bar-add.component.ts");
        //        console.log(bar);
        //        //debugger;
        //        //this.bars.push(bar);
        //        //this.selectedBar = null;
        //        this.navigate("/bars");
        //    });
    }
}