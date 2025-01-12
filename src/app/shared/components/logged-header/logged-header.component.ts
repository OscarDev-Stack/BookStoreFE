import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { HomeHeaderService } from '../../../home/home-header/home-header.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logged-header',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, ReactiveFormsModule, RouterLink],
  templateUrl: './logged-header.component.html',
  styleUrl: './logged-header.component.css'
})
export class LoggedHeaderComponent {
   authService = inject(AuthService);
  // searchControl = new FormControl();
  // searchValue$ = new Observable<string>();
  searchControl = new FormControl();
    homeHeaderService = inject(HomeHeaderService);
    constructor(){
      this.homeHeaderService.searchValue$ = this.searchControl.valueChanges;
    }
}
