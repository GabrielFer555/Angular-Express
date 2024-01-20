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
    return this.http.get<IContatosResponse>("http://localhost:3002/getAllContacts")
  }

  public criar(contato:IContatos):Observable<IContatos>{
    return this.http.post<IContatos>("http://localhost:3002/createContact", contato )
  }


}
