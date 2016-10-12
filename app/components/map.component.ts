import {Component} from '@angular/core';
//import {LazyMapsAPILoaderConfig} from "angular2-google-maps/core";
import * as mapTypes from 'angular2-google-maps/core/services/google-maps-types';

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import {GoomapService} from "../services/goomap.service";
import {IMarker} from "../model/imarker";
import {CustomMapComponent} from "./custom-map.component";

//import {MyCustomMapsComponent} from "./my-custom-maps.component";
//import {CustomMapComponent} from "./custom-map.component";

//import {Jsonp} from "@angular/http";

@Component({
    selector: 'mymap',
    templateUrl: 'app/views/map.component.html',
    styleUrls: ['app/styles/map.component.css'],
    providers: [GoogleMapsAPIWrapper],
    //directives : [MyCustomMapsComponent],
    //directives: [CustomMapComponent]
})

//export interface Window {
//    google: any;
//}

//export interface Window { google: any; }

export class MapComponent {
    title: string = 'My first angular2-google-maps project';

    lat: number = 51.678418;
    lng: number = 7.809007;
    geoloc: Coordinates;
    mapService: GoomapService;
    map: mapTypes.GoogleMap;
    markers: IMarker[];
    //positionIconUrl: string = "http://www.googlemapsmarkers.com/v1/P/0099FF/";
    positionIconUrl: string = "https://www.robotwoods.com/dev/misc/bluecircle.png";
    InfoWindowContent: string = "<InfoWindowContent>";

    static locationCallsCount: number = 0;

    constructor(private _wrapper: GoogleMapsAPIWrapper,
                private service: GoomapService)
    {
        this.getLocation();

        this.mapService = service;
        this.markers = [];

        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="";
        ulMenu.children[1].className="active";

        let self = this;

    };

    ngOnInit(): void {
        var self = this;
        setInterval(() => {
            self.getLocation();
            console.log("Just updated geolocation");
        }, 22000);
    };

    private clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
        //this.InfoWindowContent = label;
    }

    private onGotLocation(position: Position, self: MapComponent): void
    {
        MapComponent.locationCallsCount++;
        let callsCount = MapComponent.locationCallsCount;

        //window.geoloc = position;
        console.log("Got location: ");
        console.log(position);

        self.geoloc = position.coords;

        self.centerMap();

        this.placesHack();

        setInterval(() => {
            self.checkMarkers();
            console.log("Just checked markers");
        }, 10000);
    }

    private centerMap(): void{
        //debugger;
        let callsCount = MapComponent.locationCallsCount;
        if(callsCount === 1) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
        }
        else {
            this.lat = (this.lat * (callsCount - 1) + position.coords.latitude) / callsCount;
            this.lng = (this.lng * (callsCount - 1) + position.coords.longitude) / callsCount;
        }
        //debugger;
    }

    private onErrorLocation(val: any): void
    {
        console.log("Geolocation is not supported by this browser.");
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
        }

        return null;
    };

    //private initMap(): void
    //{
    //    //TODO get map from component
    //};


    private checkMarkers(): void
    {
        if(this.markers.length === 0)
            this.placesHack();
    }

    //test method
    //private getMarkers(): void {
    //    this.service.getAllArray()
    //        .then(markers => {
    //            this.markers = markers;
    //            debugger;
    //        });
    //}

    //test method
    //private getMarkers(): void {
    //    debugger;
    //    this.service.getAll()
    //        //.then(response => {
    //        //    //this.markers = markers;*
    //        //    console.log(response);
    //        //    debugger;
    //        //});
    //    .subscribe(resp => {
    //       console.log(resp);
    //        debugger;
    //    });
    //}

    private placesHack(): void
    {
        //var map;
        var infowindow;
        var self = this;
        var gooogle = window["google"]; // TODO sexy this up

        if(!gooogle || gooogle === null)
            return;

        var preInitMap = function()
        {
            var existingNewMap = document.getElementById("map1");
            if(existingNewMap != null)
                return;


            var body = document.getElementsByTagName("mymap")[0];
            var firstChild = body.childNodes[0]
            var newMap = document.createElement("div");

            newMap.setAttribute("id", "map1");
            newMap.setAttribute("style", "display: none;");

            body.insertBefore(newMap, firstChild);
        }

        var initMap = function()
        {
            //var pyrmont = {lat: -33.867, lng: 151.195};
            var pyrmont = {lat: self.geoloc.latitude, lng: self.geoloc.longitude};
            var radius = 250;
            var types = ["bar"];

            self.map = new gooogle.maps.Map(document.getElementById('map1'), {
                center: pyrmont,
                zoom: 15
            });

            infowindow = new gooogle.maps.InfoWindow();

            let service = new gooogle.maps.places.PlacesService(self.map);
            service.nearbySearch({
                location: pyrmont,
                radius: radius,
                types: types
            }, callback);
        }

        var createMarker = function(data)
        {
            //console.log(data);

            //var marker = new IMarker();
            //marker.lat = data.geometry.location.lat();
            //marker.lng = data.geometry.location.lng();
            //marker.label = data.name;

            var marker = {
                lat : data.geometry.location.lat(),
                lng : data.geometry.location.lng(),
                label : data.name,
                draggable: false
            };

            self.markers.push(marker);
        }

        var callback = function(results, status)
        {
            if (status === gooogle.maps.places.PlacesServiceStatus.OK)
            {
                while(self.markers.length > 0)
                    self.markers.splice(0, 1);

                 for (var i = 0; i < results.length; i++)
                 {
                    //console.log(results[i]);
                    createMarker(results[i]);
                 }

                console.log("got markers");
            }
        }

        //debugger;
        preInitMap();
        initMap();
    }
}