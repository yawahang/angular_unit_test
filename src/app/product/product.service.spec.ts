import { ProductService } from './product.service';
import { TestBed } from '@angular/core/testing';

// Straight Jasmine testing without Angular's testing support
describe('ProductService', () => {
  let service: ProductService;
  beforeEach(() => { service = new ProductService(); });

  // simple value testing
  it('#getStringValue should return value as a String', () => {
    expect(service.getStringValue()).toBe('String Value is working!');
  });

  // Observable value testing
  it('#getPromiseValue should return value from a Promise',
    (done: DoneFn) => {
      service.getPromiseValue().then(value => {
        expect(value).toBe('Observable is working!');
        done();
      });
    });

  // // Observable value testing
  // it('#getProduct should return value as a Observable',
  //   (done: DoneFn) => {
  //     service.getProduct().subscribe(value => {
  //       expect(value).toBe('getProduct is working!');
  //       done();
  //     });
  //   });
});
