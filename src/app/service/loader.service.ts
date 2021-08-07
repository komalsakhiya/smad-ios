import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading = new Subject();
  displayLoader(value) {
    this.loading.next(value)
  }
  constructor() {
  }

  
}
