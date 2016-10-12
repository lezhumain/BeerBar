/**
 * Created by Dju on 05/10/2016.
 */
/**
 * Created by Dju on 09/09/2016.
 */
import { Component } from '@angular/core';
//import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

@Component({
    selector: 'my-custom-map',
    styles: [`
        nav a
        {
            margin-right: 10px;
            border: thin solid blue;
            padding: 5px;
        }
    `],
    template: `
        <p >
          <!--lat=<span>{{latitude}}</span>-->
          <!--:lng=<span>{{longitude}}</span>-->
          HELLOW
        </p>
    `,
    //providers: [GoogleMapsAPIWrapper]
})

export class MyCustomMapsComponent {
    public latitude: number = 0;
    public longitude: number = 0;
    public zoom: number = 15;

    //constructor(private _wrapper: GoogleMapsAPIWrapper) {
    constructor() {
        // then you have the right instance here
        //this._wrapper.getNativeMap().then( data => {
        //    console.log(data);
        //    debugger;
        //});
    }
}