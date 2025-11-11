import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Produto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css'
})
export class ProdutoFormComponent implements OnInit {
  produtoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      codigo: ['', Validators.required],
      descricao: ['', Validators.required],
      saldo: [0, [Validators.required, Validators.min(0)]]
    });
  }

  salvar(): void {
    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      this.cd.detectChanges();
      return;

    }

    const produto: Produto = this.produtoForm.value;
    this.produtoService.cadastrar(produto).subscribe({
      next: () => {
        alert('✅ Produto cadastrado com sucesso!');
        this.router.navigate(['/']);
      },
      error: err => {
        console.error(err);
        alert('❌ Erro ao salvar produto.');
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}