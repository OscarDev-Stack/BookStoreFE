import { Component, inject, OnInit } from '@angular/core';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BookCardComponent } from "../book-card/book-card.component";
import { book } from '../shared/components/footer/models/book.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  imports: [HomeHeaderComponent, FooterComponent, BookCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  bookData:book = {
      "id": 11,
      "name": "Don Quijote de la Mancha",
      "author": "Flix",
      "isbn": "9788415850250",
      "editorial": "Dibbuks",
      "synopsis": "Alonso Quijano, un anciano duro de pelar, debe de salvar al pueblo de Tobosow de la invasión de una empresa dispuesta a construir un gigantesco parque de molinos eólicos. Con la ayuda de su bicicleta Rocinante y de su nieto Robin (fan de Batman y transmutado aquí en un perfecto Sancho Panza), Alonso se lanza sin parpadear en una arriesgada aventura digna del más valiente caballero. Cervantes creó uno de los héroes más famoso de la literatura e imaginería de nuestro país, Don Quijote. Ahora Flix se atreve a interpretar de una manera desenfrenada y muy actualizada a nuestro héroe. Partiendo de lugares y personajes que ya conocemos todos, recrea una historia repleta de referencias a la medida de nuestro gran clásico. La mente desvariada de Alonso, la fantasía desmedida de su nieto y las peripecias en la que se ven envueltos no ocultan la verdadera naturaleza de este álbum que trata, emulando y utilizando la obra del insigne Miguel de Cervantes, de las duras pruebas de la vejez.",
      "imageUrl": "https://localhost:7023/books/e9a9cb67-60ae-4968-8027-cc72b08a38fb.jpg",
      "status": true
  };
  http = inject(HttpClient);
  ngOnInit(){
    this.http.get("https://localhost:7023/api/Book");
  }

  
}
