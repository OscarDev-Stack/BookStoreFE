import { Component, Input, OnInit } from '@angular/core';
import { book } from '../shared/models/book.model';

@Component({
  selector: 'app-book-card',
  imports: [],
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
