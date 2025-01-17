import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BookCardComponent } from "../book-card/book-card.component";
import { book } from '../shared/models/book.model';
import { NgFor, NgIf } from '@angular/common';
import { HomeService } from './home.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
//import { customer } from '../shared/models/customer.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HomeHeaderService } from './home-header/home-header.service';
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { RouterLink } from '@angular/router';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, BookCardComponent, NgFor, NgIf, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, HomeHeaderComponent, RouterLink, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // lstCustomerOrigin: customer[] = [];
  // customer: customer[] = [];
  
  books: book[] = [];

  homeService = inject(HomeService);

  selectForm = new FormControl(0);

  //searchcustomer:number = 0;
  searchBook:string = '';
  homeheaderservice = inject(HomeHeaderService);

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  ngOnInit(){
    
    this.homeService.getHomoData((this.pageIndex + 1), this.pageSize).subscribe((response) => {
      this.books = response.body?.data || [];
      this.length = Number(response.headers.get('x-total'));
     } );
     
     this.homeheaderservice.searchValue$.subscribe((value) => {
        this.searchBook = value;
        this.filterBook();
     });
  }
  
    filterBook(){
      this.homeService.getHomeSeach(this.searchBook, (this.pageIndex + 1), this.pageSize).subscribe((response) => {
        console.log(this.searchBook);
        this.books = response.body?.data || [];
        this.length = Number(response.headers.get('x-total'));
        this.pageIndex = 0;
       } );
    }

  

  pageEvent: PageEvent | undefined;

    handlePageEvent(e: PageEvent) {
      this.pageEvent = e;
      this.length = e.length;
      this.pageSize = e.pageSize;
      this.pageIndex = e.pageIndex;
      if(this.searchBook != ''){
        this.homeService.getHomeSeach(this.searchBook, (e.pageIndex + 1), e.pageSize).subscribe((response) => {
          console.log(this.searchBook);
          this.books = response.body?.data || [];
          this.length = Number(response.headers.get('x-total'));
         });
      }
      else {
        this.homeService.getHomoData((e.pageIndex + 1), e.pageSize).subscribe((response) => {
          this.books = response.body?.data || [];
          this.length = Number(response.headers.get('x-total'));
         } );
      }
    }
  
}
