import { Component, inject } from '@angular/core';
import { LoggedHeaderComponent } from "../shared/components/logged-header/logged-header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-register',
  imports: [LoggedHeaderComponent, FooterComponent, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css'
})

export class CustomerRegisterComponent {
  
      authService = inject(AuthService);
      router = inject(Router);
      customerRegister = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        dni: new FormControl('', [Validators.required]),
        edad: new FormControl('', [Validators.required])
      });

      createCustomer() {
        console.log("clic");
        }
}


