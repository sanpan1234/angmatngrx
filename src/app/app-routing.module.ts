import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { TrainingComponent } from "./training/training.component";
import { AuthGuard } from "./auth/auth.guard";
import { PastTrainingsComponent } from "./training/past-trainings.component";

const routes: Routes = [
    {
        path: 'training',
        loadChildren: './training/training.module#TrainingModule',
        canLoad: [AuthGuard]
    },
    { path: '', component: WelcomeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class AppRoutingModule { }