import { Component, OnInit } from '@angular/core';
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
export class NotaFiscalNovaComponent implements OnInit {
  nota: NotaFiscal = {
    numero: 0,
    status: 'Aberta'
  };

  constructor(private notaService: NotaFiscalService, private router: Router) { }
  ngOnInit(): void {
    console.log()
    this.getProximoNumero();
  }

  salvar(): void {
    this.notaService.cadastrar(this.nota).subscribe({
      next: (res) => {
        alert('Nota criada com sucesso!');
        this.router.navigate(['/']); 
      },
      error: (err) => console.error('Erro ao criar nota:', err)
    });
  }

  
getProximoNumero(): void {
  this.notaService.getProximoNumero().subscribe({
    next: (numero) => {
      console.log('Número retornado:', numero);
      this.nota.numero = numero
    },
    error: (err) => console.error('Erro na chamada da API:', err)
  });
}

  voltar(): void {
    this.router.navigate(['/']);
  }
}
