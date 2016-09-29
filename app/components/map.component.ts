import {Component} from '@angular/core';
//import {LazyMapsAPILoaderConfig} from "angular2-google-maps/core";

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import {GoomapService} from "../services/goomap.service";
import {IMarker} from "../model/imarker";

//import {Jsonp} from "@angular/http";

@Component({
    selector: 'mymap',
    templateUrl: 'app/views/map.component.html',
    styleUrls: ['app/styles/map.component.css'],
    providers: [GoogleMapsAPIWrapper]
})
export class MapComponent {
    title: string = 'My first angular2-google-maps project';

    lat: number = 51.678418;
    lng: number = 7.809007;
    geoloc: Coordinates;
    mapService: GoomapService;
    map: any;
    markers: IMarker[];

    //service = new google.maps.places.PlacesService(map);

    //var x = document.getElementById("demo");

    constructor(private _wrapper: GoogleMapsAPIWrapper,
                private service: GoomapService){
        this.getLocation();

        this.mapService = service;

        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="";
        ulMenu.children[1].className="active";

        let self = this;
        this._wrapper.getNativeMap().then((m) => {
            self.map = m;
            console.log(m);
            debugger;
        });

        //this._wrapper.getNativeMap().then(function(m)
        //{
        //    debugger;
        //    self.map = m;
        //    console.log(m);
        //});
    };

    ngOnInit(): void {
        this.initMap();
        this.getMarkers();

        // this.service
        //     .getAll()
        //     .subscribe(p => {
        //         console.log(p);
        //         debugger;
        //     }, msg => {
        //         console.log("error");
        //         console.log(msg);
        //     });

    };

    private getNearby(): void {
        var self = this;

        let geoloc = this.geoloc.latitude + "," + this.geoloc.longitude,
            types = "bar";
        let radius = 250;

        // this.mapService.getPlacesTest(geoloc, types, radius)
        //     .then(function(result)
        //     {
        //         console.log("result");
        //         console.log(result);
        //     });


    };

    private onGotLocation(position: Position, self: MapComponent): void
    {
        //window.geoloc = position;
        console.log("position");
        console.log(position);

        self.geoloc = position.coords;
        self.lat = position.coords.latitude;
        self.lng = position.coords.longitude;

         self.getNearby();
    }

    private onErrorLocation(val: any): void
    {
        //window.geoloc = position;
        console.log("Error with location...");
        console.log(val);
    }

    private getLocation(): void {
        if (navigator.geolocation) {
            var self = this;
            // let loc = navigator.geolocation.getCurrentPosition(this.onGotLocation, this.onErrorLocation);
            let loc = navigator.geolocation.getCurrentPosition(function(position){
                self.onGotLocation(position, self);
            },
            function(val){
                self.onErrorLocation(val);
            });

            // this.getNearby();
            return loc;
        }

        console.log("Geolocation is not supported by this browser.");
        return null;
    };

    private initMap(): void
    {
        //TODO get map from component
    };

    private getMarkers(): void {
        this.service.getAllArray()
            .then(markers => this.markers = markers);
    }
}