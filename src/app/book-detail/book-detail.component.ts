import { Component, inject, Input, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from "../shared/components/logged-header/logged-header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { book } from '../shared/models/book.model';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  imports: [LoggedHeaderComponent, FooterComponent, MatButtonModule, RouterLink],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  authService = inject(AuthService)
  book: book = {
    id: 12,
    name: 'Pride and prejudice',
    author: 'Jane Austen',
    isbn: '9781648337093',
    editorial: 'Dk Publishing',
    synopsis: 'Esmeralda y Quasimodo :su historia de amor y de muerte , tal vez la mejor recreación del mito de la bella y la bestia ,es una de las cumbres de la novela romántica universal La seductora gitana que se gana la vida tocando la pandereta y bailando en las calles de París en compañía de su cabra Djali  despierta dos pasiones irreprimibles .',
    imageUrl: 'https://gandhi.vtexassets.com/arquivos/ids/1826015/7e9b1a60-349d-4474-8f03-8261a862683a.jpg?v=638466363669700000',
    status: true
  };

  ngOnInit() {
  }

  ImageError(){
    this.book.imageUrl = '/images/librogenerico.jpg';
  }

}
