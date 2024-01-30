import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import IContatos from '../../Interfaces/IContatos';
import { NgFor } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ContatoService } from '../contato.service';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [FormsModule, NgFor, NgxMaskPipe, NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})


export class FormsComponent implements OnInit {
  
  formFields = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    fone: new FormControl('', Validators.required)
    
  })

  contatos:IContatos[] =[]

  constructor( private httpClient:ContatoService){
  }

  ngOnInit(){
 }


  public salvar():void{
    const newContato:IContatos = {
      nome:this.formFields.value.name!,
      email: this.formFields.value.email!,
      fone: this.formFields.value.email!
    }
    console.log(newContato)
    try{
      this.httpClient.criar(newContato).subscribe(()=> {})
    }catch(err){
      console.log(err)
    }
 
  }



}
