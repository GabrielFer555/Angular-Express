import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FormsComponent } from './forms/forms.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

export const routes: Routes = [
    {path:"listaContatos", component:ContactListComponent},
    {path:"cadastroContato", component:FormsComponent},
    {path:"editarContato/:id", component:EditContactComponent}
];
