// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    nameValue: string = "";
    showError: boolean = false;

    constructor(
        private barService: BarService,
        private route: ActivatedRoute,
        private router: Router) {
        new Bar();

        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="";
        ulMenu.children[1].className="";
    }

    ngOnInit(): void {
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

    save(name: string): void {
        var self = this;

        name = name.trim();
        //this.bar.name = name;
        //this.nameValue = name;
        //var data = "{\"name\": \"" + name +  "\"}";

        if (!name)
            return;

        //console.log("method commented out");
        console.log(name);
        this.barService.createBar(name)
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
        debugger;
        console.log("error");
        console.log(param);

        this.showError = true;

    }
}