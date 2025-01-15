import { Component, inject, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from "../shared/components/logged-header/logged-header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import {MatTableModule} from  '@angular/material/table' ;
import { customer } from '../shared/models/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../shared/services/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-customers',
  imports: [LoggedHeaderComponent, FooterComponent, MatTableModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})

export class CustomersComponent implements OnInit {
   ELEMENT_DATA: customer[] = [];
   dataSource = new MatTableDataSource(this.ELEMENT_DATA);
   displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'edad', 'acciones'];
   router = inject(Router);
   customerService = inject(CustomerService);
   searchControl = new FormControl();
   search$ = '';

   constructor(){
    
     
  }

  ngOnInit() {
   this.customerService.getCustomers().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
   }); 

   this.searchControl.valueChanges.subscribe((response) => {
    this.seachCustomer(response);
   });
   
  }
  navigateBack(id:number){
    this.router.navigate(['/customer-register/' + id.toString()]);
  }
  deleteCustomer(id:number){
    this.customerService.deleteCustomer(id.toString()).subscribe(() => {
      alert('Se elimino correctamente el usuario..!!');
      this.customerService.getCustomers().subscribe((response) => {
        this.dataSource = new MatTableDataSource(response.data);
     }); 
    });
  }

  seachCustomer(value: string){
    this.customerService.getFullNameCustomer(value).subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
    });
  }

}
