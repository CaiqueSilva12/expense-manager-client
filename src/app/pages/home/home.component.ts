import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardComponent } from '../../components/card/card.component';
import { ExpenseListComponent } from '../../components/expense-list/expense-list.component';
import { TransactionModalComponent } from '../../components/transaction-modal/transaction-modal.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Transaction, TransactionService } from '../../services/transaction.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { DateFilterComponent } from '../../components/date-filter/date-filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    CardComponent,
    ExpenseListComponent,
    TransactionModalComponent,
    DateFilterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showModal: boolean = false;
  transactionType: string = '';
  balance: number = 0;
  userId: string = '';
  transactions: Transaction[] = [];
  revenue: number = 0;
  expense: number = 0;

  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();

  constructor(
    private userService: UserService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userid') || '';

    if (this.userId) {
      this.loadUserData();
    } else {
      console.error('userId não encontrado no sessionStorage');
    }
  }

  private loadUserData(): void {
    this.getUserBalance();
    this.getTransactions();
  }

  getUserBalance(): void {
    const email = sessionStorage.getItem('email') || '';
    if (!email) {
      console.error('E-mail não encontrado para buscar saldo');
      return;
    }

    this.userService.getUserBalance(email).subscribe({
      next: (response) => {
        this.balance = response.balance;
      },
      error: (error) => {
        console.error('Erro ao obter saldo:', error);
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  getTransactions(): void {
    const month = this.selectedMonth;
    const year = this.selectedYear;

    this.transactionService
      .getTransactions(this.userId, month, year)
      .pipe(
        tap((transactions) => this.processTransactions(transactions))
      )
      .subscribe({
        next: (transactions) => {
          this.transactions = transactions;
        },
        error: (error) => {
          console.error('Erro ao obter transações:', error);
        }
      });
  }

  processTransactions(transactions: Transaction[]): void {
    this.revenue = transactions
      .filter((transaction) => transaction.type === 'revenue')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    this.expense = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  onCardClick(type: string): void {
    this.transactionType = type;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.refreshData();
  }

  refreshData(): void {
    this.getTransactions();
    this.getUserBalance();
  }

  onFilterChange(event: { month: number, year: number }): void {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;
    this.getTransactions();
  }
}
