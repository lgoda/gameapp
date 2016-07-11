import { Component } from '@angular/core'


@Component(
  {
    template:`
          <h2>Insert Bet</h2>
          <div>
            <label>id: </label>
          </div>
          <div>
            <label>name: </label>
            <input [(ngModel)]="customerId" placeholder="id customer" />
            <select  [(ngModel)]="test" (change)="onChange($event)" #device (change)="onChange(device.value)">
              <option *ngFor="let customer of customers" [ngValue]="customer.id">{{customer.name}}</option>
            </select>
          </div>
          <button (click)="sendBet()">Send</button>
      `
  }
)
export class PlayComponent {

    customerId: string;
    number: string;

    test: string;

    customers = [
      {id:1, name:'Luca'},
      {id:2, name:'Jose Luis'}
    ];

    sendBet() {

    }

    onChange(v) {
      console.log(this.test);
      console.log(v);
    }
}
