import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITransactionItem } from 'ngx-paypal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() amount;
  @Input() items: ITransactionItem[];

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
