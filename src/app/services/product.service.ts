import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  produsts: Product[] = [
    new Product(
      1,
      'Elden Ring',
      'PlayStation 4',
      1227.58,
      'https://m.media-amazon.com/images/I/81Tf5V4xgpL._AC_UY218_.jpg'
    ),
    new Product(
      2,
      'Call of Duty: Infinite Warfare - Standard Edition',
      'PlayStation 4',
      234.92,
      'https://m.media-amazon.com/images/I/71mYdwcH2EL._AC_UY218_.jpg'
    ),
    new Product(
      3,
      'Marvel’s Spider-Man',
      'PlayStation 4',
      638.45,
      'https://m.media-amazon.com/images/I/81d6JU6g1pL._AC_UY218_.jpg'
    ),
    new Product(
      4,
      'Predator: Hunting Grounds',
      'PlayStation 4',
      380,
      'https://m.media-amazon.com/images/I/91wd5p0mC-L._AC_UY218_.jpg'
    ),
    new Product(
      5,
      'Hello Neighbor',
      'PlayStation 4',
      337.44,
      'https://m.media-amazon.com/images/I/81lC8lb4TrL._AC_UY218_.jpg'
    ),
    new Product(
      6,
      'Trials of Mana',
      'PlayStation 4',
      1022.95,
      'https://m.media-amazon.com/images/I/81mgdkoWRoL._AC_UY218_.jpg'
    ),
    new Product(
      7,
      'Grand Theft Auto V Playstation 4',
      '',
      531.63,
      'https://m.media-amazon.com/images/I/61+s8HfeFoL._AC_UY218_.jpg'
    ),
    new Product(
      8,
      'Mortal Kombat 11',
      'PlayStation 4',
      402.71,
      'https://m.media-amazon.com/images/I/71qwExpwFkL._AC_UY218_.jpg'
    ),
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.produsts;
  }
}
