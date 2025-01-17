import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { BookRegisterComponent } from './book-register/book-register.component';
import { OrderComponent } from './order/order.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ReportsComponent } from './reports/reports.component';
import { CustomersComponent } from './customers/customers.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'customer-register', component: CustomerRegisterComponent },
    { path: 'book-register/:id', pathMatch: 'full', component: BookRegisterComponent },
    { path: 'book-register', component: BookRegisterComponent },
    { path: 'orders', component: OrderComponent },
    { path: 'book-detail/:id', pathMatch: 'full', component: BookDetailComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'customer-register/:id', pathMatch: 'full', component: CustomerRegisterComponent },
    { path: 'customer', component: CustomersComponent },
    { path: 'order-detail', component: OrderDetailComponent }
];
