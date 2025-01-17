import { Component, inject, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from "../shared/components/logged-header/logged-header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { OrdersDNI } from '../shared/models/order.model';
import { OrderService } from '../shared/services/order.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { customer } from '../shared/models/customer.model';
import { CustomerService } from '../shared/services/customer.service';
import { ReportCardComponent } from "./report-card/report-card.component";

@Component({
  selector: 'app-reports',
  imports: [LoggedHeaderComponent, FooterComponent, ReactiveFormsModule, NgFor, MatFormFieldModule, MatSelectModule, ReportCardComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  searchControl = new FormControl();
  orders : OrdersDNI[] = [];
  orderService = inject(OrderService);
  customerService = inject(CustomerService);
  search = '';
  selectForm = new FormControl('');
  customers: customer[] = [];

  ngOnInit() {
    if(this.search !== ''){
      this.FilterOrder();
    }

    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });

    this.searchControl.valueChanges.subscribe((value) => {
      this.selectForm?.setValue(value, { emitEvent: false });
      if(value !== '') {
        this.search = value;
        this.FilterOrder();
      }
    });

    this.selectForm.valueChanges.subscribe((value) => {
      this.search = value || '';
      this.searchControl.setValue(value, { emitEvent: false });
      if(this.search !== '') this.FilterOrder();
      else this.orders = [];
   });
  }

  FilterOrder(){
    this.orderService.getOrdersDNI(this.search).subscribe((response) => {
      this.orders = response.data;
    });
  }
}
