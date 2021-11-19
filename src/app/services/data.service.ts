import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public notifyCartItemCount : EventEmitter<any> = new EventEmitter();

}
