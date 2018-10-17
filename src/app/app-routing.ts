import { ContactManagementComponent } from './components/contact-management/contact-management.component';
import { ContactlistComponent } from './components/contactlist/contactlist.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

export const Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'contacts', component: ContactlistComponent},
  {path: 'newcontact', component: ContactManagementComponent},
  {path: 'contacts/:id/edit', component: ContactManagementComponent},
  {path: 'contacts/:id', component: ContactDetailsComponent}
]
