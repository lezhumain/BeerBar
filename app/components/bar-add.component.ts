// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BarService } from '../services/bar.service';
import {Bar} from "../model/bar";
import {AppComponent} from "./app.component";
import {GeolocService} from "../services/geoloc.service";

@Component({
    selector: 'my-bar-add',
    templateUrl: 'app/views/bar-add.component.html',
    styleUrls: ['app/styles/bar-add.component.css']
})
export class BarAddComponent implements OnInit {
    @Input()
    bar: Bar;
    nameValue: string = "";
    showError: boolean = false;

    constructor(
        private barService: BarService,
        private route: ActivatedRoute,
        private geolocService: GeolocService,
        private router: Router)
    {
        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="";
        ulMenu.children[1].className="";


        this.bar = new Bar();
        // this.bar.city = AppComponent.GetCity();
        // this.bar.city = "bonjour";
    }

    ngOnInit(): void {
        this.bar = new Bar();
        this.bar.city = this.geolocService.GetCity();
        // this.bar.city = "bonjour";
    }

    static goBack(): void {
        window.history.back();
    }

    //noinspection JSUnusedLocalSymbols
    private navigate(url: string): void{
        //route.n
        //window.location = url;

        // TODO check this
        this.router.navigate([url]);
    }

    savePLess(): void
    {
        this.save(this.bar.name, this.bar.city);
    }

    save(name: string, city: string): void {
        var self = this;

        self.bar.name = name.trim();
        self.bar.city = city.trim();
        //this.bar.name = name;
        //this.nameValue = name;
        //var data = "{\"name\": \"" + name +  "\"}";

        if (!name)
            return;

        //console.log("method commented out");
        console.log(self.bar);
        this.barService.createBar(self.bar)
            .then(bar => {
                console.log("bar-add.component.ts");
                console.log(bar);
                //debugger;
                //this.bars.push(bar);
                //this.selectedBar = null;
                //this.navigate("/bars");
                self.showError = false;
                this.navigate("/bars");
            })
            .catch(param =>
            {
                self.onCreateError(param);
            });
    }

    private onCreateError(param: any)
    {
        //debugger;
        console.log("error");
        console.log(param);

        this.showError = true;

    }
}