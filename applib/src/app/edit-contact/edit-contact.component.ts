import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit {

  constructor(private httpClient:ContatoService, private routeInfo:ActivatedRoute){}

  ngOnInit(): void {
    const params = this.routeInfo.snapshot.params;
    let id:string = params['id'] || ' '
    this.consultarPorId(id)

  }

  formsEdit:FormGroup = new FormGroup({
    id: new FormControl({value:'', disabled:true}, Validators.required) ,
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    fone: new FormControl('', Validators.required)
  })

  public salvar():void{

  }

  public consultarPorId(id: string){
    try{
      this.httpClient.consultarPorId(id).subscribe(data => {
        this.formsEdit.patchValue({
          id: data.id,
          name: data.nome,
          email: data.email,
          fone: data.fone
        })
      })

    }catch(err){
      console.log(err)
    }
  }

}
