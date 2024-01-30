import { Component, OnInit } from '@angular/core';
import IContatos from '../../Interfaces/IContatos';
import { NgFor } from '@angular/common';
import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  contatos!:[IContatos];

  constructor(private httpClient: ContatoService){}

  ngOnInit(): void {
      this.consultar()
  }
  public consultar(){
    try{
      this.httpClient.consultar().subscribe(data => this.contatos = data.contatos)
    }catch(err){
      console.log(err)
    }
   
  }

  public excluir(id:any):void{

  }
}

