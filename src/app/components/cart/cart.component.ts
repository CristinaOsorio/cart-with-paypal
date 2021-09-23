import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private messageService: MessageService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.existsCarts()) {
      this.cartItems = this.storageService.getItems();
    }
    this.getItem();
    this.total = this.getTotal();
  }

  getItem(): void {
    this.messageService.getMessage().subscribe((product: Product) => {
      let exists = false;
      this.cartItems.forEach((item) => {
        if (item.productId == product.id) {
          exists = true;
          item.qty++;
        }
      });
      if (!exists) {
        const carItem = new CartItem(product);
        this.cartItems.push(carItem);
      }
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);
    });
  }

  getTotal(): number {
    let total = 0;
    this.cartItems.forEach((item) => (total += item.qty * item.productPrice));
    return +total.toFixed(2);
  }

  emptyCart(): void {
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }

  deleteItem(index: number): void {
    this.cartItems[index].qty > 1
      ? this.cartItems[index].qty--
      : this.cartItems.splice(index, 1);
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }
}
