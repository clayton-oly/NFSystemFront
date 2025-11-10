export interface NotaFiscal {
  id?: number;
  numero: string;
  status: 'Aberta' | 'Fechada';
}