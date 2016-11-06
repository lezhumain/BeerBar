import {Component} from '@angular/core';
//import {LazyMapsAPILoaderConfig} from "angular2-google-maps/core";
import * as mapTypes from 'angular2-google-maps/core/services/google-maps-types';

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import {BarService} from "../services/bar.service";
import {IMarker} from "../model/imarker";
import {CustomMapComponent} from "./custom-map.component";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import Timer = NodeJS.Timer;
import {Bar} from "../model/bar";
import {GeolocService} from "../services/geoloc.service";

//import {MyCustomMapsComponent} from "./my-custom-maps.component";
//import {CustomMapComponent} from "./custom-map.component";


@Component({
	selector: 'mymap',
	templateUrl: 'app/views/map.component.html',
	styleUrls: ['app/styles/map.component.css'],
	providers: [GoogleMapsAPIWrapper]
})

//export interface Window {
//	google: any;
//}

export class MapComponent {
	title: string = 'Bars autour de moi';

	lat: number = 0;
	lng: number = 0;
	zoom: number = 16;
	geoloc: Coordinates;
	//mapService: GoomapService;
	map: mapTypes.GoogleMap;
	markers: IMarker[];
	//positionIconUrl: string = "http://www.googlemapsmarkers.com/v1/P/0099FF/";
	positionIconUrl: string = "https://www.robotwoods.com/dev/misc/bluecircle.png";
	//info: string = "";
	searchRadius: number = 500;

	runsHttps: boolean = false;
	runsLocalhost: boolean = false;
	addSuccess: boolean;
    isLoading: boolean = false;

	static geolocIntervalId: Timer = null;

	static locationCallsCount: number = 0;

	constructor(private _wrapper: GoogleMapsAPIWrapper,
				private service: BarService,
				private geolocService: GeolocService,
				private router: Router)
	{
		this.runsHttps = window.location.protocol.indexOf("https") !== -1;
		this.runsLocalhost = window.location.hostname === "localhost";
		//this.runsLocalhost = false;

		//debugger;
		//this.mapService = service;
		this.markers = [];

		// set active class for menu
		let ulMenu = document.getElementsByTagName("ul")[0];
		ulMenu.children[0].className="";
		ulMenu.children[1].className="active";

		/*
		let self = this;
		this._wrapper.getNativeMap().then((m) => {
			self.map = m;
			//console.log(m);
		});
		*/

	};

	ngOnInit(): void {
		//debugger;
		this.getLocation();

		var self = this;

		if(MapComponent.geolocIntervalId != null) {
			clearInterval(MapComponent.geolocIntervalId);
			MapComponent.locationCallsCount = 0;
		}

		MapComponent.geolocIntervalId = setInterval(() => {
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

		/*
		setInterval(() => {
			self.checkMarkers();
			console.log("Just checked markers");
		}, 10000);
		*/
	}

	private adjustGeoloc(position: Coordinates): void
	{
		//TODO check adjustion

		let callsCount = MapComponent.locationCallsCount;
		//let callsCount = 1;
		let lat: number;
		let lng: number;
		let accuracy: number;

		if(callsCount === 1) {
			lat = position.latitude;
			lng = position.longitude;
			accuracy = position.accuracy;
		}
		else
			if(this.geoloc !== undefined)
			{
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
			speed: position.speed
		};
	}

	private geolocOk(): boolean
	{
		return this.geoloc != undefined
			&& this.geoloc.latitude != undefined
			&& this.geoloc.longitude != undefined
			&& this.geoloc.latitude != NaN
			&& this.geoloc.longitude != NaN;
	}

	private centerMap(): void{
		//debugger;

		if( this.geolocOk() )
		{
			this.lat = this.geoloc.latitude;
			this.lng = this.geoloc.longitude;
			console.log("center map: lat=" + this.lat + " lng=" + this.lng);
		}
		else
			this.getLocation();
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
	};


	private checkMarkers(): void
	{
		// TODO check this
		/*
		if(this.markers.length === 0)
			this.placesHack();
		*/
		this.placesHack();
	}

	addToApp(barName: string): void
	{
	    var self = this;

		barName = barName.trim();
		if (!barName) { return; }

		let b = new Bar();
		b.name = barName;
		b.city = this.geolocService.GetCity();
		// TODO city

        this.isLoading = true;
		this.service.createBar(b)
			.then(bar => {
                self.addSuccess = true;
                this.isLoading = false;
                setTimeout(function() { self.addSuccess = undefined; }, 5000);
			})
            .catch( param =>
            {
                self.addSuccess = false;
                this.isLoading = false;
                setTimeout(function() { self.addSuccess = undefined; }, 5000);
            });
	}

	navigate(url: string): void{
		this.router.navigate([url]);
	};

	private placesHack(radius?: number): void
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


			var mapBody = document.getElementsByTagName("mymap")[0];

			if(mapBody === undefined)
			{
				//debugger;
				//self.navigate("/map");
				return false;
			}

			var firstChild = mapBody.childNodes[0];
			var newMap = document.createElement("div");

			newMap.setAttribute("id", "map1");
			newMap.setAttribute("style", "display: none;");

			mapBody.insertBefore(newMap, firstChild);
			return true;
		};

		var initMap = function()
		{
			if(!preInitMap())
				return false;

			//var pyrmont = {lat: -33.867, lng: 151.195};
			if(self.geoloc === undefined)
			{
				self.getLocation();
				return;
			}

			var lat = self.geoloc != undefined && self.geoloc.latitude != undefined ? self.geoloc.latitude : 0,
				lng = self.geoloc != undefined && self.geoloc.longitude != undefined ? self.geoloc.longitude : 0;
			var currentLoc = {lat: lat, lng: lng};
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
			console.log("nearby params");
			console.log(params);
			service.nearbySearch(params, callback);

			return true;
		};

		var createMarker = function(data, self)
		{
			//console.log(data);
			var isInApp = self.service.barExists(data.name);

			var marker = {
				lat : data.geometry.location.lat(),
				lng : data.geometry.location.lng(),
				label : data.name,
				draggable: false,
				inApp: isInApp
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
					createMarker(results[i], self);
				 }

				console.log("Got markers");
			}
		};

		// TODO check this
		// let done: boolean = false;
		// let cpt: number = 0,
		//	 max: number  = 10;
		// while(!done && cpt < max) {
		//	 done = initMap();
		//	 cpt++;
		// }
		initMap();
	}

	// notInApp(barName: string): boolean
	// {
	// 	return this.service.barExists(barName);
	// }
}
