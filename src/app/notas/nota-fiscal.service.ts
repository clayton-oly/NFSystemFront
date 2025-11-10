import { Injectable } from '@angular/core';
import { NotaFiscal } from '../models/nota-fiscal.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService {
  private apiUrl = 'https://localhost:5001/api/Notas';

  constructor(private http: HttpClient) { }

  cadastrar(notaFiscal: NotaFiscal): Observable<NotaFiscal> {
    console.log(notaFiscal, "vou tentar registrar")
    return this.http.post<NotaFiscal>(`${this.apiUrl}`, notaFiscal);
  }

  getNotas(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(`${this.apiUrl}`);
  }

  getNotaById(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(`${this.apiUrl}`);
  }

  imprimir(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/imprimir`, {});
  }

  getProximoNumero(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/proximo-numero`);
  }
}