import { Component, inject, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from "../shared/components/logged-header/logged-header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-book-register',
  imports: [LoggedHeaderComponent, FooterComponent, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './book-register.component.html',
  styleUrl: './book-register.component.css'
})
export class BookRegisterComponent implements OnInit {
  
  idBook = '';
  selectedFile: File | null = null
  router = inject(Router);
  bookService = inject(BookService);
  bookRegister = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Author: new FormControl('', [Validators.required]),
    ISBN: new FormControl('', [Validators.required]),
    Editorial: new FormControl('', [Validators.required]),
    Synopsis: new FormControl('', [Validators.required]),
    Image: new FormControl('')
  });
  activateRoute = inject(ActivatedRoute);
  
  ngOnInit() {
    this.idBook = this.activateRoute.snapshot.params['id'] ?? '';
    if(this.idBook != '') {
      this.bookService.getBook(this.idBook).subscribe((response) => {
        this.bookRegister.setValue({
          Name: response.data.name, 
          Author: response.data.author, 
          ISBN: response.data.isbn, 
          Editorial: response.data.editorial, 
          Synopsis: response.data.synopsis,
          Image: '',
        });
      });
    }
  }

  onFileSelected(event: Event) { 
    const input = event.target as HTMLInputElement; 
    if (input.files && input.files.length > 0) { 
      this.selectedFile = input.files[0]; 
    }
  }
  
  SaveBook() {
    if (this.bookRegister.invalid) { 
      return; 
    } 
    const formData = new FormData(); 
    formData.append('Name', this.bookRegister.controls.Name.value!); 
    formData.append('Author', this.bookRegister.controls.Author.value!); 
    formData.append('ISBN', this.bookRegister.controls.ISBN.value!); 
    formData.append('Editorial', this.bookRegister.controls.Editorial.value!); 
    formData.append('Synopsis', this.bookRegister.controls.Synopsis.value!); 
    if (this.selectedFile) { 
      formData.append('Image', this.selectedFile); 
    } 
    
    if(this.idBook == '') {
     this.bookService.postBook(formData).subscribe((response) => {
      alert('Libro guardado correctamen!!!');
      this.router.navigate(['/book-detail/' + response.data]);
     });
    }
    else {
      this.bookService.putBook(formData, this.idBook).subscribe((response) => {
        alert('Libro actualizado correctamen!!!');
        this.router.navigate(['/book-detail/' + this.idBook]);
       });
    }
  }

  navigateBack() { 
    this.router.navigate(['/book-detail', this.idBook]); 
  }
  
}
