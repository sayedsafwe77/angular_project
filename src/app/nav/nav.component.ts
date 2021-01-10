import { Component, OnInit } from '@angular/core';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';
import { DataService } from '../../../serves/data/data-service.service'; 
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private searchData: DataService) { }

  ngOnInit(): void {
  }

  // search for product
  productSearch(search){
    // let searchValue=document.getElementById('search');
    this.searchData.changeMessage(search.value['Search']);
  }

}
