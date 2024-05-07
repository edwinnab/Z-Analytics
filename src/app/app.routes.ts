import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PerformanceAnalyticsComponent } from './performance-analytics/performance-analytics.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent},
    { path: 'home', component: LandingPageComponent},
    { path: 'admin', component: AdminDashboardComponent},
    { path: 'analysis', component: PerformanceAnalyticsComponent}
];
