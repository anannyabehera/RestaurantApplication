import { Component } from '@angular/core';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-table-reservation',
  templateUrl: './table-reservation.component.html',
  styleUrls: ['./table-reservation.component.css']
})
export class TableReservationComponent {
  checkinDate: string='';
  checkoutDate: string='';
  currentDate: Date=new Date();
  tableData: any;
  constructor(private commonService: ReservationService) {}
  onchange() {
    this.currentDate = new Date(); // Get the current date and time
    // console.log('Current Date and Time:', this.currentDate);

    // Extract the inputed check-in date and time
    const checkinInput = document.getElementById('date-checkin') as HTMLInputElement;
    this.checkinDate = checkinInput.value;
    console.log('Check-in Date and Time:', this.checkinDate);

    // Extract the inputed check-out date and time
    const checkoutInput = document.getElementById('date-checkout') as HTMLInputElement;
    this.checkoutDate = checkoutInput.value;
    console.log('Check-out Date and Time:', this.checkoutDate);
    const checkinDateTime = new Date(this.checkinDate).getTime();
    const checkoutDateTime = new Date(this.checkoutDate).getTime();

    if (checkinDateTime >= checkoutDateTime) {
      alert('Check-in date and time must be earlier than the check-out date and time.');
    }
  }
  getData(){
    console.log('btn', this.checkinDate,this.checkoutDate);
    if(this.checkinDate && this.checkoutDate){
      this.commonService.getData(this.checkinDate,this.checkoutDate)
        .subscribe(response => {
          console.log('table response:', response);
          this.tableData = response;
        });

    }
    
  }

  submit(item:any){
    console.log('itemmm', item);
    item.checkinDate = this.checkinDate;
    item.checkoutDate = this.checkoutDate;

    console.log('new item', item);
    
    if(item){
      this.commonService.submit(item)
      .subscribe(response => {
        console.log('Data sent to server:', item);
        console.log('Server response:', response);
        // You can handle the server response here
      });
    }
    
  }
}
