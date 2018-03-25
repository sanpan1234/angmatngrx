import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { SignupComponent } from "./auth/signup.component";
import { LoginComponent } from "./auth/login.component";
import { TrainingComponent } from "./training/training.component";
import { HeroDetailComponent } from "./hero/hero-detail.component";
import { HeroListComponent } from "./hero/hero-list.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
    { path: 'heroes', component: HeroListComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
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