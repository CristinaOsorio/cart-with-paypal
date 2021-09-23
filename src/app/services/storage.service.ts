import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  existsCarts(): boolean {
    return localStorage.getItem('cart') != null;
  }

  setCart(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getItems(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart'));
  }

  clear(): void {
    localStorage.removeItem('cart');
  }
}
