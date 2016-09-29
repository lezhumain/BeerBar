/**
 * Created by Dju on 09/09/2016.
 */
import { Component } from '@angular/core';

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
            <router-outlet></router-outlet>
            <!--<router-outlet [geoloc]="{{location}}"></router-outlet>-->
        </div>
    `
})

export class AppComponent {
    title = 'Tour of Bars';

}