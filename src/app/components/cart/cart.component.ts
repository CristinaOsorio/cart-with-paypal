import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.getItem();
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
    });
  }
}
