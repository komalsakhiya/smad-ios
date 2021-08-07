import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }
  getDetails(datain) {
    // tslint:disable-next-line: max-line-length
    return this.http.post('https://crm.smadmag.com/smad_serv/index.php', JSON.stringify(datain), {headers: this.headers});
    }
}
