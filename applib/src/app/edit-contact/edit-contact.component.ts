import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import IContatos from '../../Interfaces/IContatos';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, RouterModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit {

  idContact!: string;
  isFormValid = false
  formsEdit: FormGroup;

  constructor(private httpClient: ContatoService, private routeInfo: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.formsEdit = this.fb.group({
      id: new FormControl({ value: '', disabled: true }, Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      fone: new FormControl('', Validators.required)
    })
    
     this.formsEdit.valueChanges.subscribe(() => {
      this.isFormValid = this.formsEdit.valid;
    });
  }


  ngOnInit(): void {
    const params = this.routeInfo.snapshot.params;
    let id: string = params['id'] || ' '
    this.consultarPorId(id)
    this.idContact = id;
  }


  public salvar(): void {

  }




  public consultarPorId(id: string) {
    try {
      this.httpClient.consultarPorId(id).subscribe(data => {
        this.formsEdit.patchValue({
          id: data.id,
          name: data.nome,
          email: data.email,
          fone: data.fone
        })
      })

    } catch (err) {
      console.log(err)
    }
  }

  public salvarAlteracoes(): void {
    const editedContact: IContatos = {
      id: this.formsEdit.value.id,
      nome: this.formsEdit.value.name,
      email: this.formsEdit.value.email,
      fone: this.formsEdit.value.fone
    }
    try {
      this.httpClient.salvarAlteracoes(editedContact, this.idContact).subscribe(() => {
        this.router.navigate(["/listaContatos"])
      })
    } catch (err) {

    }






  }

}
