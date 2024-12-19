import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Transaction } from '../../services/transaction.service';

interface ExpenseItem {
  id: string;
  type: 'revenue' | 'expense';
  value: string;
  description: string;
  createdAt: string;
}

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent {
  @Input() transactions: Transaction[] = [];

  get filteredTransactions(): ExpenseItem[] {
    return this.transactions.map((transaction) => {
      
      return {
        id: transaction.id,
        type: transaction.type === 'revenue' ? 'revenue' : 'expense',
        value: `R$ ${transaction.amount.toFixed(2).replace('.', ',')}`,
        description: transaction.description,
        createdAt: new Date(transaction.createdAt).toLocaleString('pt-BR')
      };
    });
  }
}

