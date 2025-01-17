import { Component, inject, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from "../shared/components/logged-header/logged-header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../shared/services/customer.service';

@Component({
  selector: 'app-customer-register',
  imports: [LoggedHeaderComponent, FooterComponent, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css'
})

export class CustomerRegisterComponent implements OnInit {
      idCustomer = '';
      customerService = inject(CustomerService);
      authService = inject(AuthService);
      router = inject(Router);
      activateRoute = inject(ActivatedRoute);
      
      customerRegister = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        dni: new FormControl('', [Validators.required]),
        edad: new FormControl('', [Validators.required])
      });

      ngOnInit() {
        this.idCustomer = this.activateRoute.snapshot.params['id'] ?? '';
        if(this.idCustomer != '') {
          this.customerService.getCustomer(this.idCustomer).subscribe((response) => {
          this.customerRegister.setValue({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            dni: response.data.dni,
            edad: response.data.edad.toString()
        });
      });
    }
      }

      SaveCustomer() {
        if (this.customerRegister.invalid) { 
          return; 
        } 
        const formData = new FormData(); 
          formData.append('firstName', this.customerRegister.controls.firstName.value!); 
          formData.append('lastName', this.customerRegister.controls.lastName.value!); 
          formData.append('dni', this.customerRegister.controls.dni.value!); 
          formData.append('edad', this.customerRegister.controls.edad.value!); 
        
        if(this.idCustomer == '') {
          
         this.customerService.postCustomer(formData).subscribe((response) => {
          alert('Cliente guardado correctamen!!!');
          this.router.navigate(['/customer']);
         });
        }
        else {
          this.customerService.putCustomer(formData, this.idCustomer).subscribe(() => {
            alert('Cliente actualizado correctamen!!!');
            this.router.navigate(['/customer']);
           });
        }
      }

      navigateBack() { 
        this.router.navigate(['/customer']); 
      }
}


