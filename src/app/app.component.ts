import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public mainPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    { title: 'Learn', url: '/folder/Learn', icon: 'school' },
  ];

  public userPages = [
    { title: 'Profile', url: '/folder/Profile', icon: 'person-circle' },
    { title: 'Sets', url: '/folder/Sets', icon: 'list' },
  ];

  public accountPages = [
    { title: 'Login', url: '/folder/Login', icon: 'log-in' },
    { title: 'Register', url: '/folder/Register', icon: 'id-card' },
  ];

  constructor() {}
}
