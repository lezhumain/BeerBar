/**
 * Created by Dju on 09/09/2016.
 */
import { Component } from '@angular/core';
import {MyCustomMapsComponent} from "./my-custom-maps.component";
import {LoggedInRouterOutlet} from "../logged-in-router-outlet";
import {UserService} from "../services/user.service";

@Component({
    selector: 'my-app',
    styles: [`
        nav a
        {
            margin-right: 10px;
            border: thin solid blue;
            padding: 5px;
        }
    `],
    template: `
        <header>
            <ul class="nav nav-pills">
                <!--TODO why no routerLink?-->
                <li role="presentation" class="active"><a routerLink="/bars">Bars</a></li>
                <li role="map"><a routerLink="/map">Map</a></li>
            </ul>
        </header>
        <div class="content">
            <router-outlet (activate)='onRouteChange($event)' ></router-outlet>
            <!--<loggedin-router-outlet></loggedin-router-outlet>-->
            <!--<router-outlet [geoloc]="{{location}}"></router-outlet>-->
        </div>
    `,
    // directives: [LoggedInRouterOutlet]
})

export class AppComponent {
    title: string = 'Tour of Bars';
    loggedIn: boolean = false;

    constructor(private userService: UserService){}

    onRouteChange(event: any)
    {
        let canAccess: boolean = event.router.url == "/login" ||
                        this.userService.isLoggedIn();

        if(!canAccess)
        {
            debugger;
            //event.router.navigate(["/login"]);
        }
        else if(this.userService.isLoggedIn())
            this.loggedIn = true;

    }
}