import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Resident } from 'src/app/models/resident.model';

@Component({
  templateUrl: './resident-info.component.html',
  styleUrls: ['./resident-info.component.scss']
})
export class ResidentInfoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {resident: Resident}) {}
}
