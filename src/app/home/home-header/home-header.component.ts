import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { HomeHeaderService } from './home-header.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-header',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css'
})
export class HomeHeaderComponent {
  searchControl = new FormControl();
  homeHeaderService = inject(HomeHeaderService);
  constructor(){
    this.homeHeaderService.searchValue$ = this.searchControl.valueChanges;
  }
}
