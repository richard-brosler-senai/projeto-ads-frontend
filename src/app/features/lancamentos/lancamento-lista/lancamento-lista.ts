import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { LancamentoResponse } from '../../../models/lancamento.model';
import { LancamentoService } from '../../../core/services/lancamento.service';
import { LancamentoForm } from '../lancamento-form/lancamento-form';

@Component({
  imports: [CurrencyPipe, DatePipe, LancamentoForm],
  selector: 'app-lancamento-lista',
  styleUrl: './lancamento-lista.css',
  templateUrl: './lancamento-lista.html',
})

export class LancamentoLista implements OnInit {
  readonly usuarioId = 1; // APENAS para laboratório, sem JWT
  lancamentos = signal<LancamentoResponse[]>([]);
  carregando = signal(false);
  erro = signal('');
 
  constructor(private lancamentoService: LancamentoService) {}
  ngOnInit(): void { this.carregar(); }
 
  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.lancamentoService.listar(this.usuarioId).subscribe({
      next: dados => {
        this.lancamentos.set(dados);
        this.carregando.set(false);
      },
      error: err => {
        this.erro.set('Não foi possível carregar os lançamentos.');
        this.carregando.set(false);
        console.error(err);
      }
    });
  }
}

