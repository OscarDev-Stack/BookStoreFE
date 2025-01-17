import { Component, inject, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from "../shared/components/logged-header/logged-header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CustomerService } from '../shared/services/customer.service';
import { customer } from '../shared/models/customer.model';
import { MatSelectModule } from '@angular/material/select';
import { book } from '../shared/models/book.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HomeService } from '../home/home.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BookService } from '../shared/services/book.service';
import { OrderService } from '../shared/services/order.service';
import { OrderBooksService } from '../shared/services/orderBooks.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-order',
  imports: [LoggedHeaderComponent, FooterComponent, MatFormFieldModule, NgFor, ReactiveFormsModule, MatSelectModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  selectForm = new FormControl(0);
  customerService = inject(CustomerService);
  idCustomer:number = 0;
  customers: customer[] = [];
  customer: customer = {
    id: 0,
    firstName: '',
    lastName: '',
    dni: '',
    edad: 0,
    status: true
  };
  searchControl = new FormControl();
  displayedColumns: string[] = ['name', 'author', 'isbn', 'editorial', 'acciones'];

  ELEMENT_DATA: book[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  ELEMENT_DATA_ORDER: book[] = []; 
  dataSourceOrder = new MatTableDataSource(this.ELEMENT_DATA);

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  bookService = inject(HomeService);
  addBookService = inject(BookService);
  books! :book[];

  router = inject(Router)

  searchBook = '';
  addBooks : book[] = [];

  orderService = inject(OrderService);
  orderBooks = inject(OrderBooksService);

  ngOnInit() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
    this.selectForm.valueChanges.subscribe((value) => {
      this.idCustomer = value || 0;
      this.SlcCustomer(this.idCustomer);
   });

   this.bookService.getHomoData((this.pageIndex + 1), this.pageSize).subscribe((response) => {
    this.books = response.body?.data || [];
    this.length = Number(response.headers.get('x-total'));
    this.dataSource = new MatTableDataSource(this.books);
   } );

   this.searchControl.valueChanges.subscribe((response) => {
    this.searchBook = response;
    this.FilterBook();
   });
   
  }

  FilterBook(){
    this.pageIndex = 0;
    this.bookService.getHomeSeach(this.searchBook, (this.pageIndex + 1), this.pageSize).subscribe((response) => {
      console.log(this.searchBook);
      this.books = response.body?.data || [];
      this.length = Number(response.headers.get('x-total'));
      this.dataSource = new MatTableDataSource(this.books);
     });
  }
  
  SlcCustomer(idCustomer: number){
    if(idCustomer > 0){
      this.customerService.getCustomer(idCustomer.toString()).subscribe((response) => {
        this.customer = response.data;
      });
    }
  }

  pageEvent: PageEvent | undefined;
  
      handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
        if(this.searchBook != ''){
          this.bookService.getHomeSeach(this.searchBook, (e.pageIndex + 1), e.pageSize).subscribe((response) => {
            console.log(this.searchBook);
            this.books = response.body?.data || [];
            this.length = Number(response.headers.get('x-total'));
            this.dataSource = new MatTableDataSource(this.books);
           });
        }
        else {
          this.bookService.getHomoData((e.pageIndex + 1), e.pageSize).subscribe((response) => {
            this.books = response.body?.data || [];
            this.length = Number(response.headers.get('x-total'));
            this.dataSource = new MatTableDataSource(this.books);
           } );
        }
      }

      navigateBack(){
        this.router.navigate(['/']); 
      }

      SaveOrder(){
        const formDataOrder = new FormData();
        formDataOrder.append('CustomerId', this.idCustomer.toString());
  
        this.orderService.postOrder(formDataOrder).subscribe((response) => {
          const orderid = response.data;
    
          if (orderid > 0) {
            const requests = this.addBooks.map(book => {
            const formDataOrderBooks = new FormData();
            formDataOrderBooks.append('BookId', book.id.toString());
            formDataOrderBooks.append('OrderId', orderid.toString());
            return this.orderBooks.postOrderBook(formDataOrderBooks);
            });
            forkJoin(requests).subscribe({
              next: () => {
                alert("Se registró correctamente la orden.");
                this.router.navigate(["/order-detail"]);
              },
              error: (err) => {
                console.error("Error registrando libros de la orden:", err);
                alert("Hubo un problema registrando la orden.");
              }
            });
          }
        });
      }

      addBook(idBook: number){
        if(this.addBooks.filter(book => book.id === idBook).length > 0){
          return;
        }
        this.addBookService.getBook(idBook.toString()).subscribe((response) => {
          this.addBooks.push(response.data);
          this.dataSourceOrder = new MatTableDataSource(this.addBooks);
        });
      }

      removeBookOrder(idBook: number){
        this.addBooks = this.addBooks.filter(book => book.id !== idBook); 
        this.dataSourceOrder = new MatTableDataSource(this.addBooks);
      }
}
