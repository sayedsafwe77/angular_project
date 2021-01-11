import { Component, OnInit } from '@angular/core';
import {SearchService} from'../../../serves/search.service';
import { Router } from '@angular/router';
import { DataService } from '../../../serves/data/data-service.service'; 

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  card: any;
  bottom: any;
  rem: any;
  data: any;
  color='red';
  imgsrc=[];
  imgposition="center";
  imgrSize="cover";
  qtyminus: any;
  qtyplus: any;
  inputvalue: any;
  modifiedvalue: any;
  burchas: any;
  burchasvalue: any;
  product:any;
  term: string;
  constructor(private userservice: SearchService,
              private route:Router,
              private diplayedProduct:DataService) { }

  ngOnInit(): void {
    this.diplayedProduct.currentMessage.subscribe(result => {
      this.product = result;
    });
     // get product details via api
    this.userservice.getProduteList().subscribe({
      next: (data) => {
        this.data=data;
        for(var i=0;i<20;i++)
        {
          let image='url('+data[i]['image']+')'; 
          this.imgsrc[i]=image;
        }
        
      },
      error: (msg) => {
        console.log('error',msg);
      }
    })
  }
  
  setProducId(id){
    localStorage.setItem('id',id);
    this.route.navigate(['/product']);
  }
  diplaySearchResult(){
    // console.log(this.product);
    
    let display=document.getElementById('block');
    // display.style.display="none";
    let arrproduct=[];
    // console.log(this.data);
    let result=this.data.filter(item => {
      if(item['title'].toLowerCase().includes(this.product.toLowerCase()))
      {  
        // console.log(item);
        arrproduct.push(item);
      }
    })
    this.data=arrproduct;
  }
  ngAfterViewInit()
  {
    setTimeout(this.makeevent,5000);
  }
  makeevent()	
    {
    this.card=document.getElementsByClassName("buy");
    this.rem=document.getElementsByClassName("remove");
    // console.log(this.card);

    // this.card=Array.prototype.slice.call(this.card);
    
    for(let i=0;i<20;i++)
    {
      this.burchas=document.getElementsByClassName("burchas");
      this.burchas[i].addEventListener('click',()=>{
        let addToCard=[];
        let repeat=1;
        this.burchasvalue=document.getElementsByClassName("qty");
        console.log(this.burchasvalue[i].value);
        console.log(i);
        if(JSON.parse(localStorage.getItem('addToCard'))!=null)
        {
          addToCard=JSON.parse(localStorage.getItem('addToCard'));
          addToCard.forEach(element => {
            console.log(element['id'],i);
            if(element['id'] == i+1)
            {
              alert('this item already added to the card');
              repeat=0;
            }
            else
            {
              repeat=1;
            }
          });
        }
        if(repeat==1)
        {
          addToCard.push({id:i+1,quantity:this.burchasvalue[i].value});
          console.log(addToCard);
          localStorage.setItem('addToCard',JSON.stringify(addToCard));  
          alert('item added to card succefully');
        }
      });
      this.card[i].addEventListener('click',function(){
        this.bottom=document.getElementsByClassName("bottom");
        this.bottom[i].classList.add("clicked")
        
        this.qtyminus=document.getElementsByClassName("qtyminus");
        this.qtyminus[i].addEventListener('click',function(){
          // console.log('minus clicked');
          
         this.inputvalue=document.getElementsByClassName("qty");
         this.modifiedvalue=this.inputvalue[i].value;
         if (this.modifiedvalue>1) {
          this.inputvalue[i].value=this.modifiedvalue-1; 
         }
        })
          this.qtyplus=document.getElementsByClassName("qtyplus");
          this.qtyplus[i].addEventListener('click',function(){
          // console.log('plus clicked');

          this.inputvalue=document.getElementsByClassName("qty");
          this.modifiedvalue=parseInt(this.inputvalue[i].value);
          if (this.modifiedvalue>0) {
           this.inputvalue[i].value=this.modifiedvalue+1;
          //  console.log(this.inputvalue[i].value);   
          }
        
        })
      });
    }
     
    for(let i=0;i<20;i++)
    {
        this.rem[i].addEventListener('click',function(e){
        this.bottom=document.getElementsByClassName("bottom")[i];
        this.bottom.classList.remove("clicked");
      })
        
    }  
      
    }
 
    
}
//ask about why callback should be anonymous function