import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }  
  get showHeader(): boolean {
    return true;
  }
}