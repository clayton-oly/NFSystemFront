import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotaFiscalService } from '../nota-fiscal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotaFiscal } from '../../models/nota-fiscal.model';

@Component({
  selector: 'app-nota-fiscal-nova',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nota-fiscal-nova.component.html',
  styleUrl: './nota-fiscal-nova.component.css'
})
export class NotaFiscalNovaComponent {
  nota: NotaFiscal = {
    numero: '',
    status: 'Aberta'
  };

  constructor(private notaService: NotaFiscalService, private router: Router) { }

  salvar(): void {
    this.notaService.cadastrar(this.nota).subscribe({
      next: (res) => {
        alert('Nota criada com sucesso!');
        this.router.navigate(['/notas', res.id, 'editar']); // vai pra tela de produtos
      },
      error: (err) => console.error('Erro ao criar nota:', err)
    });
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}
