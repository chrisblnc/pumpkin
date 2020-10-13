import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { PostFormComponent } from './post-list/post-form/post-form.component';
import { UserlistComponent } from './userlist/userlist.component';
import { SinglePostComponent } from './post-list/single-post/single-post.component';

const routes: Routes = [
  { path: "post", canActivate: [AuthGuardService], component: PostListComponent },
  { path: "post/new", canActivate: [AuthGuardService], component: PostFormComponent },
  { path: "post/:id", canActivate: [AuthGuardService], component: SinglePostComponent },
  { path: "users", canActivate: [AuthGuardService], component: UserlistComponent },
  { path: "welcome", component: WelcomeComponent },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent }, 
  { path: "", redirectTo: "post", pathMatch: "full"},
  { path: "**", redirectTo: "post"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
