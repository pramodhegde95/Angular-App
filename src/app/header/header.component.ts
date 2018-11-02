import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { DataStorageService} from '../shared/data-storage.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private datastorageservice: DataStorageService) { }

  onSaveData(){
  this.datastorageservice.storeRecipe()
  .subscribe(
  (res: Response) => {
  console.log(res);
  });
  }

  onFetchData(){
  this.datastorageservice.getRecipe();
  }

  ngOnInit() {
  }

  
}
