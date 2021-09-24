import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';
import { StorageService } from '../../services/storage.service';
import {
  IClientAuthorizeCallbackData,
  ICreateOrderRequest,
  IPayPalConfig,
  ITransactionItem,
} from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  public payPalConfig?: IPayPalConfig;

  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initConfig();
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

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: environment.clientID,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'MXN',
                value: this.getTotal().toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'MXN',
                    value: this.getTotal().toString(),
                  },
                },
              },
              items: this.getItemsPaypal(),
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        this.spinner.show();
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data: IClientAuthorizeCallbackData) => {
        this.spinner.hide();
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.openModal(
          data.purchase_units[0].items,
          data.purchase_units[0].amount.value
        );
        this.emptyCart();
      },
      onCancel: (data, actions) => {
        this.spinner.hide();
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        this.spinner.hide();
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  private getItemsPaypal(): ITransactionItem[] {
    const items: ITransactionItem[] = [];
    let item: ITransactionItem;

    this.cartItems.forEach((i: CartItem) => {
      item = {
        name: i.productName,
        quantity: i.qty.toString(),
        unit_amount: {
          value: i.productPrice.toString(),
          currency_code: 'MXN',
        },
      };
      items.push(item);
    });
    console.log(items);
    console.log(this.getTotal().toString());

    return items;
  }

  private openModal(items: ITransactionItem[], amount): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.amount = amount;
  }
}
