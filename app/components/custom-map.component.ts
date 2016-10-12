// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BarService } from '../services/bar.service';
import {Bar} from "../model/bar";

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

@Component({
    selector: 'custom-map',
    styles: [`
        nav a
        {
            margin-right: 10px;
            border: thin solid blue;
            padding: 5px;
        }

        div.infos
        {
            position: absolute;
            top: 0px,
            left: 0px;
            width: 100px;
            z-index: 999;
            background-color: lightgray;
        }

    `],
    template: `
        <div class="infos">
          HELLOW {{name}}<br>
          test: {{test}} <br>
        </div>
    `,
    providers: [GoogleMapsAPIWrapper]
})
export class CustomMapComponent implements OnInit {
    @Input()
    test: string;
    name: string = "CustomMapComponent";
    latitude: number;
    longitude: number;


    constructor(private _wrapper: GoogleMapsAPIWrapper)
    //constructor( )
    {
         //then you have the right instance here
        //debugger;
        this._wrapper.getNativeMap().then( data => {
            console.log(data);
            debugger;
        }).catch(e => {
            console.log(e);
            debugger;
        });
    }


    ngOnInit(): void {};
}