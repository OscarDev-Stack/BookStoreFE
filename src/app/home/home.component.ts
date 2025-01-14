import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BookCardComponent } from "../book-card/book-card.component";
import { book } from '../shared/models/book.model';
import { NgFor, NgIf } from '@angular/common';
import { HomeService } from './home.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { customer } from '../shared/models/customer.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HomeHeaderService } from './home-header/home-header.service';
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, BookCardComponent, NgFor, NgIf, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, HomeHeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  lstCustomerOrigin: customer[] = [];
  customer: customer[] = [];
  
  books: book[] = [];

  homeService = inject(HomeService);

  selectForm = new FormControl(0);

  searchcustomer:number = 0;
  searchBook:string = '';
  homeheaderservice = inject(HomeHeaderService);

  ngOnInit(){
    this.homeService.getHomoData().subscribe((response) => {
      this.books = response.data;
     } );

     let pruebaselect: customer = {
      id: 1,
      firstName: 'Oscar',
      lastName: 'Juarez',
      dni: '12345678T',
      edad: 32,
      status: true
    };
    this.lstCustomerOrigin.push(pruebaselect);
    pruebaselect = {
      id: 2,
      firstName: 'Sergio',
      lastName: 'Juarez',
      dni: '12342588T',
      edad: 58,
      status: true
    };
    this.lstCustomerOrigin.push(pruebaselect);

    this.customer = this.lstCustomerOrigin;

     this.selectForm.valueChanges.subscribe((value) => {
        this.searchcustomer = value || 0;
        this.filterCustomer();
     })

     this.homeheaderservice.searchValue$.subscribe((value) => {
        this.searchBook = value;
        this.filterBook();
     });
  }

    filterCustomer(){
      this.customer = this.searchcustomer === 0 ? this.lstCustomerOrigin : this.lstCustomerOrigin.filter(
        (customer) => customer.id === this.searchcustomer);
    }
    filterBook(){
      this.homeService.getHomeSeach(this.searchBook).subscribe((response) => {
        console.log(this.searchBook);
        this.books = response.data;
       } );
    }
  
}
