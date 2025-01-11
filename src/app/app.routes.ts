import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { BookRegisterComponent } from './book-register/book-register.component';
import { OrderComponent } from './order/order.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'customer-register',
        component: CustomerRegisterComponent
    },
    {
        path: 'book-register',
        component: BookRegisterComponent
    },
    {
        path: 'orders',
        component: OrderComponent
    },
    {
        path: 'book-detail',
        component: BookDetailComponent
    },
    {
        path: 'reports',
        component: ReportsComponent
    }
];
