import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .container {
    padding: 1rem;
  }
  `
  ]
})
export class HomeComponent implements OnInit {

  get auth(){
    return this.authService.auth;
  }

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  public logOut() {
    
    this.router.navigate(['./auth']);
  }

}
