import { Component,Inject } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  isPanelOpen: boolean = true; rowData: any = {};
  constructor(private pdf_extract: ReservationService,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) {
    // this.formGroup = this.fb.group({
    //   Description: new FormControl(''),
    //   OpeningDate: new FormControl(''),
    //   ArchiveDate: new FormControl(''),
    // });
    }
}
