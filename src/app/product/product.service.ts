import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of as observableOf } from 'rxjs';

@Injectable()
export class ProductService {

  product = [
    {
      "productId": 1,
      "name": "Tshirt",
      "rate": 121,
      "quantityStock": 112
    },
    {
      "productId": 2,
      "name": "Trouser",
      "rate": 10,
      "quantityStock": 22
    },
    {
      "productId": 3,
      "name": "Cap",
      "rate": 7,
      "quantityStock": 56
    }
  ];
  constructor() {

  }

  getStringValue(): string {
    return 'getStringValue is working!';
  }

  getPromiseValue(): Promise<string> {

    const promise = new Promise<string>((resolve, reject) => {
      resolve('getPromiseValue is working!');
    });

    return promise;
  }

  getProduct(): Observable<any> {

    return observableOf(this.product);
  }
}
