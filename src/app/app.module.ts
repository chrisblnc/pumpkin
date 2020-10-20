import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { SignupComponent } from './auth/signup/signup.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { LikeService } from './services/like.service';

import { SigninComponent } from './auth/signin/signin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PostListComponent } from './post-list/post-list.component';
import { SinglePostComponent } from './post-list/single-post/single-post.component';
import { PostFormComponent } from './post-list/post-form/post-form.component';
import { UserlistComponent } from './userlist/userlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    WelcomeComponent,
    FooterComponent,
    PostListComponent,
    SinglePostComponent,
    PostFormComponent,
    UserlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    PostService, 
    UserService,
    MessageService,
    LikeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
