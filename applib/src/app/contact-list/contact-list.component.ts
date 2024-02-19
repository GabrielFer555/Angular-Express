import { Component, OnInit } from '@angular/core';
import IContatos from '../../Interfaces/IContatos';
import { NgFor, NgIf } from '@angular/common';
import { ContatoService } from '../contato.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor, RouterModule, NgIf],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  contatos!:[IContatos];
  private show: boolean = false;

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

  public setShow():void{
    let switchedValues = this.show == true? false: true
    this.show = switchedValues
  }
  public getShow():boolean{
    return this.show;
  }

  public excluir(id:any):void{

  }
}

