import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss'],
})
export class TransactionModalComponent {
  @Input() transactionType: string = '';
  @Input() userId: string = '';
  @Output() transactionCreated = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  amount: number = 0;
  description: string = '';
  category: string = '';

  constructor(
    private transactionService: TransactionService,
    private toastr: ToastrService
  ) {}

  submitForm() {
    const currentDate = new Date();
    this.userId = sessionStorage.getItem('userid') || '';

    const transactionData = {
      user: this.userId,
      type: this.transactionType,
      amount: this.amount,
      description: this.description,
      category: this.transactionType === 'expense' ? this.category || '' : '',
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };;

    this.transactionService.createTransaction(transactionData).subscribe({
      next: () => {
        if (this.transactionType === 'revenue') {
          this.toastr.success('Receita adicionada!');
        } else if (this.transactionType === 'expense') {
          this.toastr.success('Despesa adicionada!');
        }
        
        this.transactionCreated.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('Erro ao criar transação:', err);
      },
    });
  }
}
