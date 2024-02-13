import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import IContatos from '../Interfaces/IContatos';
import IContatosResponse from '../Interfaces/IContatosResponse';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {


  constructor(private http:HttpClient) { }

  public consultar():Observable<IContatosResponse>{
    return this.http.get<IContatosResponse>("https://api-contatos-okv0.onrender.com/contatos")
  }

  public criar(contato:IContatos):Observable<IContatos>{
    return this.http.post<IContatos>("https://api-contatos-okv0.onrender.com/contatos", contato )
  }
  
  public consultarPorId(id:string):Observable<IContatos>{
    return this.http.get<IContatos>(`https://api-contatos-okv0.onrender.com/contatos/${id}`)
  }


  /*public excluir(id:string):Observable<string>{
    
  }*/
}


