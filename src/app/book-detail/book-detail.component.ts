import { Component, inject, Input, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from "../shared/components/logged-header/logged-header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { book } from '../shared/models/book.model';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../shared/services/book.service';
import { AuthService } from '../shared/services/auth.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-book-detail',
  imports: [LoggedHeaderComponent, FooterComponent, MatButtonModule, RouterLink, MatIcon],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  authService = inject(AuthService);
  bookService = inject(BookService);
  book!: book;
  idBook = '';
  activateRoute = inject(ActivatedRoute);
  router = inject(Router);
  ngOnInit() {
      this.idBook = this.activateRoute.snapshot.params['id'];
      this.bookService.getBook(this.idBook).subscribe((response) => {
      this.book = response.data;
    });
  }

  deleteBook(){
    this.bookService.deleteBook(this.idBook).subscribe(() => {
      alert("Se elimino correctamente el libro.!!")
      this.router.navigate(['/']);
    });
  }

  ImageError(){
    this.book.imageUrl = './images/librogenerico.jpg';
  }

}
