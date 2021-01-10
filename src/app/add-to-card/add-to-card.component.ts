import { Component, OnInit } from '@angular/core';
import {SearchService} from'../../../serves/search.service';

@Component({
  selector: 'app-add-to-card',
  templateUrl: './add-to-card.component.html',
  styleUrls: ['./add-to-card.component.css']
})
export class AddToCardComponent implements OnInit {
  data: any;
  name: any;
  cardlist: any;
  total=0;
  
  constructor(private userservice: SearchService) { }

  ngOnInit(): void {
    let item=[];
    let index=0;
    this.cardlist=JSON.parse(localStorage.getItem('addToCard'));
    // console.log(this.cardlist);
    for(let i=0;i<this.cardlist.length;i++)
    {
        let id=this.cardlist[i]['id'];
        this.userservice.setId(id);
        this.userservice.getProduteDetails().subscribe({
          next: (data) => {
           item[index]=data;
           index++;
           this.total+=Math.floor(data['price']*this.cardlist[i]['quantity']);
          
          },
          error: (msg) => {
            console.log('error',msg);
          }
      })
    }
    this.data=item;
    // console.log(item);
    
  }
  updateCard(removedId){
    let removedprice=this.data.filter(item => item['id']==removedId)[0]['price'];
    let removedquantity=this.cardlist.filter(item => item['id']==removedId)[0]['quantity'];
    this.total=Math.floor(this.total-(removedprice*removedquantity));
   
    let newCard=this.cardlist.filter(item => item['id']!=removedId);
  
    this.data=this.data.filter(item => item['id']!=removedId);
    localStorage.setItem('addToCard',JSON.stringify(newCard));
  }
}
