// Keep the Input import for now, we'll remove it later:
import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BarService} from "../services/bar.service";
import {Bar} from "../model/bar";
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
        private geolocService: GeolocService,
        private router: Router)
    {
        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="";
        ulMenu.children[1].className="";


        this.bar = new Bar();
    }

    ngOnInit(): void {
        this.bar = new Bar();
        this.bar.city = this.geolocService.GetCity();
    }

    static goBack(): void {
        window.history.back();
    }

    private navigate(url: string): void{
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

        if (!name)
            return;

        if(self.bar.city.toLowerCase() === self.geolocService.GetCity().toLowerCase())
            self.bar.postalCode = self.geolocService.GetPostalCode();

        console.log(self.bar);
        this.barService.createBar(self.bar)
            .then(bar => {
                console.log("bar-add.component.ts");
                console.log(bar);

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
        console.log("error");
        console.log(param);

        this.showError = true;

    }
}