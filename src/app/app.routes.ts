import { Routes } from '@angular/router';
import { FullscreenMapPage } from './pages/fullscreen-map-page/fullscreen-map-page';
import { MarkersPage } from './pages/markers-page/markers-page';
import { HousesPage } from './pages/houses-page/houses-page';

export const routes: Routes = [
    {path: "fullscreen", component: FullscreenMapPage, title: "FullScreen Map"},
    {path: "markers", component: MarkersPage, title: "Marcadores"},
    {path: "house", component: HousesPage, title: "Casas - Propiedades"},
    {path: "**", redirectTo: "fullscreen"}
];
