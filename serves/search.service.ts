import { Injectable } from '@angular/core';
import { HttpClient}from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  title: any;
  id: any;
  product: any;
  constructor(private http: HttpClient,private productDetails: HttpClient) { }

  getProduteList() : Observable<object>{
    return this.http.get('https://fakestoreapi.com/products');
  }

  getProduteDetails() : Observable<object>{
    return this.http.get(this.product);
  }
  setId(ID){
    this.id=ID;
    this.product='https://fakestoreapi.com/products/'+this.id;
  }
  getId()
  {
    return this.product;
  }
}
