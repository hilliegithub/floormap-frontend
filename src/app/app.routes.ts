import { Routes } from '@angular/router';

import { FloorMapComponent } from './floor-map/floor-map.component';
import { FloorMapSelectComponent } from './floor-map-select/floor-map-select.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
    { path: 'success', component: SuccessComponent},
    { path: 'floor-map-select', component: FloorMapSelectComponent},
    { path: 'floor-map-select/:id', component: FloorMapSelectComponent},
    { path: '', redirectTo: '/floor-map', pathMatch: 'full'},
    { path: '**', component: FloorMapComponent},
];
