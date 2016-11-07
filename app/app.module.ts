import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./components/app.component";
import {BarDetailComponent} from "./components/bar-detail.component";
import {BarsComponent} from "./components/bars.component";
import {BarService} from "./services/bar.service";
import {routing} from "./app.routing";
import "./rxjs-extensions";
import {BarAddComponent} from "./components/bar-add.component";
import {BeerAddComponent} from "./components/beer-add.component";
import {MapComponent} from "./components/map.component";
import {AgmCoreModule} from "angular2-google-maps/core";
import {LoginComponent} from "./components/login.component";
import {UserService} from "./services/user.service";
import {GeolocService} from "./services/geoloc.service";


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDOoBhiWusApq1Od-vMIRZrnRO-G2GB62A',
			libraries: ['places']
        }),
	],
	declarations: [
		AppComponent,
		BarDetailComponent,
		BarAddComponent,
		BeerAddComponent,
		LoginComponent,
		BarsComponent,
        MapComponent
    ],
	providers: [
		BarService,
		UserService,
		GeolocService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
