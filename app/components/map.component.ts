import {Component} from '@angular/core';
//import {LazyMapsAPILoaderConfig} from "angular2-google-maps/core";
import * as mapTypes from 'angular2-google-maps/core/services/google-maps-types';

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import {GoomapService} from "../services/goomap.service";
import {IMarker} from "../model/imarker";
import {CustomMapComponent} from "./custom-map.component";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

//import {MyCustomMapsComponent} from "./my-custom-maps.component";
//import {CustomMapComponent} from "./custom-map.component";


@Component({
    selector: 'mymap',
    templateUrl: 'app/views/map.component.html',
    styleUrls: ['app/styles/map.component.css'],
    providers: [GoogleMapsAPIWrapper]
})

//export interface Window {
//    google: any;
//}

export class MapComponent {
    title: string = 'Bars autour de moi';

    lat: number = 51.678418;
    lng: number = 7.809007;
    zoom: number = 16;
    geoloc: Coordinates;
    mapService: GoomapService;
    map: mapTypes.GoogleMap;
    markers: IMarker[];
    //positionIconUrl: string = "http://www.googlemapsmarkers.com/v1/P/0099FF/";
    positionIconUrl: string = "https://www.robotwoods.com/dev/misc/bluecircle.png";
    //info: string = "";
    searchRadius: number = 300;

    static locationCallsCount: number = 0;

    constructor(private _wrapper: GoogleMapsAPIWrapper,
                private service: GoomapService,
                private router: Router)
    {
        this.getLocation();

        this.mapService = service;
        this.markers = [];

        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="";
        ulMenu.children[1].className="active";

        let self = this;
        this._wrapper.getNativeMap().then((m) => {
            self.map = m;
            //console.log(m);
        });

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

        self.adjustGeoloc(position.coords);
        self.centerMap();

        self.placesHack();

        setInterval(() => {
            self.checkMarkers();
            console.log("Just checked markers");
        }, 10000);
    }

    private adjustGeoloc(position: Coordinates): void{
        let callsCount = MapComponent.locationCallsCount;
        let lat: number;
        let lng: number;
        let accuracy: number;

        if(callsCount === 1) {
            lat = position.latitude;
            lng = position.longitude;
            accuracy = position.accuracy;
        }
        else {
            lat = (this.geoloc.latitude * (callsCount - 1) + position.latitude) / callsCount;
            lng = (this.geoloc.longitude * (callsCount - 1) + position.longitude) / callsCount;
            accuracy = (this.geoloc.accuracy * (callsCount - 1) + position.accuracy) / callsCount;
        }

        this.geoloc = {
            accuracy: accuracy,
            altitude: position.altitude,
            altitudeAccuracy: position.altitudeAccuracy,
            heading: position.heading,
            latitude: lat,
            longitude: lng,
            speed: position.speed,
        };
    }

    private centerMap(): void{
        //debugger;
        this.lat = this.geoloc.latitude;
        this.lng = this.geoloc.longitude;
    }

    private static onErrorLocation(val: any): void
    {
        console.log("Geolocation is not supported by this browser.");
        console.log(val);
    }

    private getLocation(): void {
        if (navigator.geolocation) {
            var self = this;
            // let loc = navigator.geolocation.getCurrentPosition(this.onGotLocation, this.onErrorLocation);

            navigator.geolocation.getCurrentPosition(function(position){
                self.onGotLocation(position, self);
            },
            function(val){
                MapComponent.onErrorLocation(val);
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

    private placesHack(radius?: number): void
    {
        //var map;
        var infowindow;
        var self = this;
        var gooogle = window["google"]; // TODO sexy this up

        if(!gooogle || gooogle === null)
            return;

        if(radius)
            self.searchRadius = radius;

        var preInitMap = function()
        {
            var existingNewMap = document.getElementById("map1");
            if(existingNewMap != null)
                return;


            var body = document.getElementsByTagName("mymap")[0];
            var firstChild = body.childNodes[0];
            var newMap = document.createElement("div");

            newMap.setAttribute("id", "map1");
            newMap.setAttribute("style", "display: none;");

            body.insertBefore(newMap, firstChild);
        };

        var initMap = function()
        {
            preInitMap();

            //var pyrmont = {lat: -33.867, lng: 151.195};
            var currentLoc = {lat: self.geoloc.latitude, lng: self.geoloc.longitude};
            // var radius = 250;
            var types = ["bar"];

            self.map = new gooogle.maps.Map(document.getElementById('map1'), {
                center: currentLoc,
                zoom: 15
            });

            infowindow = new gooogle.maps.InfoWindow();

            var params = {
                location: currentLoc,
                radius: self.searchRadius,
                types: types
            };
            // console.log("nearby params:");
            // console.log(params);

            let service = new gooogle.maps.places.PlacesService(self.map);
            service.nearbySearch(params, callback);
        };

        var createMarker = function(data)
        {
            //console.log(data);

            var marker = {
                lat : data.geometry.location.lat(),
                lng : data.geometry.location.lng(),
                label : data.name,
                draggable: false
            };

            self.markers.push(marker);
        };

        var callback = function(results, status)
        {
            if (status === gooogle.maps.places.PlacesServiceStatus.OK)
            {
                while(self.markers.length > 0)
                    self.markers.splice(0, 1);

                 for (var i = 0; i < results.length; i++)
                 {
                    createMarker(results[i]);
                 }

                console.log("Got markers");
            }
        };

        initMap();
    }
}
