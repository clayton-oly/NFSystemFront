import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaFiscalService } from '../nota-fiscal.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutoService } from '../../produtos/produto.service';
import { Produto } from '../../models/produto.model';
import { NotaFiscal } from '../../models/nota-fiscal.model';
import { ItemNota } from '../../models/item-nota.model';

@Component({
  selector: 'app-nota-fiscal-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nota-fiscal-editar.component.html',
  styleUrl: './nota-fiscal-editar.component.css'
})
export class NotaFiscalEditarComponent implements OnInit {
  notaForm!: FormGroup;
  itemForm!: FormGroup;
  notaId!: number;
  produtos: Produto[] = [];
  itens: ItemNota[] = [];
  nota!: NotaFiscal;
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
    this.inicializarFormularios();
    this.carregarNota();
  }

  inicializarFormularios(): void {
    this.notaForm = this.fb.group({
      numero: [{ value: '', disabled: true }, Validators.required],
      status: [{ value: '', disabled: true }]
    });

    this.itemForm = this.fb.group({
      produtoSelecionado: [null, Validators.required]
    });
  }

  carregarNota(): void {
    this.notaService.getNotaById(this.notaId).subscribe({
      next: (nota: NotaFiscal) => {
        this.nota = nota;
        this.itens = nota.itens || [];

        this.produtoService.getProdutos().subscribe({
          next: (produtos: Produto[]) => {
            this.produtos = produtos;

            this.itens = this.itens.map(item => {
              const produto = this.produtos.find(p => p.id === item.produtoId);
              return {
                produto: produto || { id: item.produtoId, codigo: '???', descricao: 'Produto não encontrado', saldo: 0 },
                quantidade: item.quantidade
              };
            });

            this.notaForm.patchValue({
              numero: nota.numero,
              status: nota.status
            });

            this.notaFechada = nota.status === 'Fechada';
          },
          error: () => alert('❌ Erro ao carregar produtos.')
        });
      },
      error: () => alert('❌ Erro ao carregar nota fiscal.')
    });
  }

  adicionarItem(): void {
    const produtoId = Number(this.itemForm.get('produtoSelecionado')?.value);
    if (!produtoId) return;

    const produto = this.produtos.find(p => p.id === produtoId);
    if (!produto) return;

    const itemExistente = this.itens.find(i => i.produto?.id === produto.id);
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      const novoItem: ItemNota = { produto, quantidade: 1 };
      this.itens.push(novoItem);
    }

    this.itemForm.reset();
  }

  removerItem(index: number): void {
    this.itens.splice(index, 1);
  }

  salvar(): void {
    const itensParaSalvar = this.itens.map(i => ({
      produtoId: i.produto?.id!,
      quantidade: i.quantidade
    }));

    const notaAtualizada: NotaFiscal = {
      ...this.nota,
      itens: itensParaSalvar
    };

    this.notaService.atualizarNota(this.notaId, notaAtualizada).subscribe({
      next: () => {
        alert('✅ Nota atualizada com sucesso!');
        this.router.navigate(['/']);
      },
      error: () => alert('❌ Erro ao atualizar nota.')
    });
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}