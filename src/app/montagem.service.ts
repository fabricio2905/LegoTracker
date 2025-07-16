import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 

export interface Montagem {
  id?: number; 
  nome: string;
  descricao?: string;
  url_imagem?: string;
  progresso_atual: number;
  progresso_total: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root' 
})
export class MontagemService {
  private apiUrl = 'http://127.0.0.1:8000/api/montagens';

  constructor(private http: HttpClient) { }

  getMontagens(): Observable<Montagem[]> {
    return this.http.get<Montagem[]>(this.apiUrl);
  }

  createMontagem(montagem: Montagem): Observable<Montagem> {
    return this.http.post<Montagem>(this.apiUrl, montagem);
  }

  updateMontagem(id: number, montagem: Montagem): Observable<Montagem> {
    return this.http.put<Montagem>(`${this.apiUrl}/${id}`, montagem);
  }

  deleteMontagem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
