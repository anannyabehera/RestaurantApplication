import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3550';
  constructor(private http: HttpClient) { }

  getData(checkinDate: string, checkoutDate: string) {
    const serverUrl = `${this.apiUrl}/reserve/table`;  

    const data = {
      checkinDate,
      checkoutDate
    };
console.log('s',data);

    return this.http.post(serverUrl, data);
  }



submit(data: any): Observable<any> {
  console.log('s', data);
  return this.http.post(`${this.apiUrl}/reserve/tableData`, data);
}
}
