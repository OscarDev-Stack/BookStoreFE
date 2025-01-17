import { Component, inject, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from "../shared/components/logged-header/logged-header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { order } from '../shared/models/order.model';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../shared/services/order.service';
import { Router } from '@angular/router';
import { book } from '../shared/models/book.model';
import { OrderBooksService } from '../shared/services/orderBooks.service';

@Component({
  selector: 'app-order-detail',
  imports: [LoggedHeaderComponent, FooterComponent, MatIconModule, MatTableModule, MatButtonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  ELEMENT_DATA: order[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns: string[] = ['operationNumbre', 'finalized', 'name', 'dni', 'acciones'];
  orders : order[] = [];
  orderId = 0;

  router = inject(Router);
  orderService = inject(OrderService);
  orderBooksService = inject(OrderBooksService);

  operationNumbre = '';
  startDate = '';
  startTime = '';
  endDate = '';
  endTime = '';
  finalizedOk = false;
  finalized = '';
  fullName = '';
  dni = '';
  edad = '';

  ELEMENT_DATA_BOOK: book[] = [];
  dataSourceBook = new MatTableDataSource(this.ELEMENT_DATA_BOOK);
  displayedColumnsBook: string[] = ['name', 'author', 'isbn', 'editorial'];

  ngOnInit() {
    this.tableOrder();
  }

  tableOrder(){
    this.orderService.getOrders().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
    });
  }

  navigateBack(){
    this.router.navigate(["/"]);
  }

  DetailOrder(id: number){
    this.orderId = id;
    this.orderService.getOrder(id.toString()).subscribe((response) => {
      let localDateStar =new Date(response.data.startDate);
      let localDateEnd =new Date(response.data.endDate);
      this.operationNumbre = response.data.operationNumbre;
      this.startDate = localDateStar.toLocaleDateString();
      this.startTime = localDateStar.toLocaleTimeString();
      this.endDate = response.data.finalized ? localDateEnd.toLocaleDateString() : '';
      this.endTime = response.data.finalized ? localDateEnd.toLocaleTimeString() : '';
      this.finalizedOk = response.data.finalized;
      this.finalized = response.data.finalized ? 'Finalizado' : 'Pendiente';
      this.fullName = response.data.customer.firstName + " " + response.data.customer.lastName;
      this.dni = response.data.customer.dni;
      this.edad = response.data.customer.edad.toString();
      this.orderBooksService.getOrderBook(id).subscribe((response) => {
        let books : book[] = [];
        response.data.forEach(orderBook => {
          books.push(orderBook.book);
        });
        this.dataSourceBook = new MatTableDataSource(books);
      });
    });
  }

  Finalize(){
    if(this.orderId > 0){
      this.orderService.putFinalize(this.orderId.toString()).subscribe(() => {
        this.tableOrder();
        this.DetailOrder(this.orderId);
      });
    }
  }

}
