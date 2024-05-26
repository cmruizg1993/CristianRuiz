import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  status: boolean = false;
  loader$ = new Subject<boolean>();

  constructor() { }

  get loaderStatus(){
    return this.loader$.asObservable();
  }

  showLoader(){  
    this.status = true;  
    this.loader$.next(this.status);
  }
  closeLoader(){
    this.status = false;  
    this.loader$.next(false);
  }
  currentStatus(){
    this.loader$.next(this.status);
  }
  
}
