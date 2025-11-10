import { Routes } from '@angular/router';
import { NotaFiscalListComponent } from './notas/nota-fiscal-list/nota-fiscal-list.component';
import { ProdutoFormComponent } from './produtos/produto-form/produto-form.component';
import { NotaFiscalNovaComponent } from './notas/nota-fiscal-nova/nota-fiscal-nova.component';
import { NotaFiscalEditarComponent } from './notas/nota-fiscal-editar/nota-fiscal-editar.component';

export const routes: Routes = [
  { path: '', component: NotaFiscalListComponent },
  { path: 'notas/nova', component: NotaFiscalNovaComponent },
  { path: 'produtos/novo', component: ProdutoFormComponent },
  { path: 'notas/:id/editar', component: NotaFiscalEditarComponent }
];
