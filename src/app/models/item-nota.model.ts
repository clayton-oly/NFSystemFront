import { Produto } from './produto.model';

export interface ItemNota {
  id?: number;
  produto?: Produto;
  produtoId?: number;
  quantidade: number;
}

