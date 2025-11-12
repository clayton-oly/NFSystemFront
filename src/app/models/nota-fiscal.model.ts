import { ItemNota } from "./item-nota.model";

export interface NotaFiscal {
  id?: number;
  numero: number;
  status: 'Aberta' | 'Fechada';
  itens?: ItemNota[];
  processando?: boolean;
}