import { Component, Input, OnInit } from '@angular/core';
import { book } from '../shared/models/book.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-card',
  imports: [MatButtonModule, MatIcon, RouterLink],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit {
  @Input({required: true}) data!:book;

  ngOnInit(){
    
  }

  ImageError(){
    this.data.imageUrl = './images/librogenerico.jpg';
  }

}
