import { Component, OnInit } from '@angular/core';
import {SearchService} from'../../../serves/search.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  data: any;
  name: any;
  constructor(private userservice: SearchService) { }

  ngOnInit(): void {
    // console.log(localStorage.getItem('id'));
    this.userservice.setId(localStorage.getItem('id'));
    this.userservice.getProduteDetails().subscribe({
      next: (data) => {
        this.data=data;
      },
      error: (msg) => {
        console.log('error',msg);
      }
  })
}
  

  

}
