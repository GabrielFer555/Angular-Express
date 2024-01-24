import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import IContatos from '../../Interfaces/IContatos';
import { NgFor } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ContatoService } from '../contato.service';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [FormsModule, NgFor, NgxMaskPipe, NgxMaskDirective],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})


export class FormsComponent implements OnInit {
  
  contatos:IContatos[] =[]

  constructor( private httpClient:ContatoService){
  }

  ngOnInit(){
 }


  public salvar(dados:any):void{
    console.log(dados)
   this.httpClient.criar(dados).subscribe(()=> {})
  }



}
