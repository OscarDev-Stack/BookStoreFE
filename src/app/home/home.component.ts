import { Component } from '@angular/core';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BookCardComponent } from "../book-card/book-card.component";


@Component({
  selector: 'app-home',
  imports: [HomeHeaderComponent, FooterComponent, BookCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
