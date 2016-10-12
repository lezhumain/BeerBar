/**
 * Created by Dju on 09/09/2016.
 */
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarsComponent }      from './components/bars.component';
import {BarDetailComponent} from "./components/bar-detail.component";
import {BarAddComponent} from "./components/bar-add.component";
import {BeerAddComponent} from "./components/beer-add.component";
import {MapComponent} from "./components/map.component";
import {MyCustomMapsComponent} from "./components/my-custom-maps.component";
import {CustomMapComponent} from "./components/custom-map.component";

const appRoutes: Routes = [
    {
        path: 'bars',
        component: BarsComponent
    },
    {
        path: '',
        redirectTo: '/bars',
        pathMatch: 'full'
    },
    {
        path: 'map',
        component: MapComponent
    },
    {
        path: 'detail/:id',
        component: BarDetailComponent
    },
    {
        path: 'bar/create',
        component: BarAddComponent
    },
    {
        path: 'beer/create/:bar',
        component: BeerAddComponent
    },
    {
        path: 'test',
        component: MyCustomMapsComponent
    },
    {
        path: 'test1',
        component: CustomMapComponent
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);