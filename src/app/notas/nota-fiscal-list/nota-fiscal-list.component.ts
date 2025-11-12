import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaFiscalService } from '../nota-fiscal.service';
import { NotaFiscal } from '../../models/nota-fiscal.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nota-fiscal-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nota-fiscal-list.component.html',
  styleUrl: './nota-fiscal-list.component.css'
})
export class NotaFiscalListComponent implements OnInit {
  notas: NotaFiscal[] = [];

  constructor(
    private notaService: NotaFiscalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarNotas();
  }

  carregarNotas(): void {
    this.notaService.getNotas().subscribe({
      next: (res) => {
        this.notas = res;
      },
      error: (err) => console.error('❌ Erro ao carregar notas', err)
    });
  }

  novaNota(): void {
    this.router.navigate(['/notas/nova']);
  }

  novoProduto(): void {
    this.router.navigate(['/produtos/novo']);
  }

  editarNota(nota: any): void {
    this.router.navigate(['/notas', nota.id, 'editar']);
  }

  imprimir(nota: NotaFiscal): void {
    if (confirm('Deseja realmente imprimir esta nota?')) {
      nota.processando = true; 

      this.notaService.imprimir(nota.id!).subscribe({
        next: () => {
          alert('Nota impressa e fechada!');
          this.carregarNotas(); 
        },
        error: (err: any) => {
          nota.processando = false;
          const mensagem = err.error?.message || 'Erro desconhecido';
          alert('Erro ao imprimir nota: ' + mensagem);
        },
      });
    }
  }
}
