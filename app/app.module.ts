import { NgModule }			from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }	 from '@angular/forms';
import { HttpModule }		from '@angular/http';
import { AppComponent }	from './components/app.component';
import { BarDetailComponent } from './components/bar-detail.component';
import {BarsComponent} from "./components/bars.component";
import {BarService} from "./services/bar.service";
import { routing } from './app.routing';
import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
//import { InMemoryDataService }	from './services/in-memory-data.service';
import {BarSearchComponent} from "./components/bar-search.component";
import {BarAddComponent} from "./components/bar-add.component";
import {BeerAddComponent} from "./components/beer-add.component";
import {MapComponent} from "./components/map.component";

import { AgmCoreModule } from 'angular2-google-maps/core';
import {GoomapService} from "./services/goomap.service";


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		//InMemoryWebApiModule.forRoot(InMemoryDataService),
		routing,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDOoBhiWusApq1Od-vMIRZrnRO-G2GB62A',
			libraries: ['places']
        })
	],
	declarations: [
		AppComponent,
		BarDetailComponent,
		BarAddComponent,
		BeerAddComponent,
		BarsComponent,
		BarSearchComponent,
        MapComponent
	],
	providers: [
		BarService,
		GoomapService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }