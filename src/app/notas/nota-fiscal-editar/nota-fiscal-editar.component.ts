import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaFiscalService } from '../nota-fiscal.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ProdutoService } from '../../produtos/produto.service';

@Component({
  selector: 'app-nota-fiscal-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nota-fiscal-editar.component.html',
  styleUrl: './nota-fiscal-editar.component.css'
})
export class NotaFiscalEditarComponent implements OnInit {
  notaForm!: FormGroup;
  notaId!: number;
  produtos: any[] = [];
  itens: any[] = [];
  nota: any;
  notaFechada = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notaService: NotaFiscalService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.notaId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarNota();
    this.carregarProdutos();

    this.notaForm = this.fb.group({
      numero: [{ value: '', disabled: true }, Validators.required],
      status: [{ value: '', disabled: true }]
    });
  }

  carregarNota(): void {
    this.notaService.getNotaById(this.notaId).subscribe(nota => {
      this.nota = nota;
      this.itens = nota.itens || [];
      this.notaForm.patchValue(nota);
      this.notaFechada = nota.status === 'Fechada';
    });
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  adicionarItem(produtoId: number): void {
    const produto = this.produtos.find(p => p.id === +produtoId);
    if (produto) {
      this.itens.push({
        produtoId: produto.id,
        descricao: produto.descricao,
        quantidade: 1
      });
    }
  }

  removerItem(index: number): void {
    this.itens.splice(index, 1);
  }

  salvar(): void {
    const notaAtualizada = {
      ...this.nota,
      itens: this.itens
    };

    this.notaService.atualizarNota(this.notaId, notaAtualizada).subscribe({
      next: () => {
        alert('Nota atualizada com sucesso!');
        this.router.navigate(['/']);
      },
      error: () => alert('Erro ao atualizar nota.')
    });
  }

  fecharNota(): void {
    if (confirm('Deseja realmente fechar esta nota? Após isso não será mais possível editar.')) {
      this.notaService.fecharNota(this.notaId).subscribe({
        next: () => {
          alert('Nota fechada com sucesso!');
          this.router.navigate(['/']);
        },
        error: () => alert('Erro ao fechar nota.')
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}