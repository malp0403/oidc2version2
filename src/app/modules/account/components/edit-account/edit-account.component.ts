import { Component, Input } from '@angular/core';
import { ContactType } from 'src/app/shared/models/contact-type';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {
  @Input() contactType?: ContactType;

}
