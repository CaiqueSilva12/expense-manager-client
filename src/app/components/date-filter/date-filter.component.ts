import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule 
  ],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss'
})
export class DateFilterComponent {
  @Output() filterChanged = new EventEmitter<{ month: number, year: number }>();

  months = [
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 },
    { label: 'Dezembro', value: 12 },
  ];

  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();

  selectedMonth: number = this.currentMonth;
  selectedYear: number = this.currentYear;

  onFilterChange(): void {
    this.filterChanged.emit({
      month: this.selectedMonth,
      year: this.selectedYear
    });
  }
}
