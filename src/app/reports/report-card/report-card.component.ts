import { Component, Input, OnInit } from '@angular/core';
import { OrdersDNI } from '../../shared/models/order.model';
import { book } from '../../shared/models/book.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-report-card',
  imports: [MatTableModule],
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.css'
})
export class ReportCardComponent implements OnInit {
  @Input({required: true}) data!: OrdersDNI;

  ELEMENT_DATA_BOOK: book[] = [];
    dataSourceBook = new MatTableDataSource(this.ELEMENT_DATA_BOOK);
    displayedColumnsBook: string[] = ['name', 'author', 'isbn', 'editorial'];
  
  ngOnInit(){
    this.dataSourceBook = new MatTableDataSource(this.data.books);
  }
}
