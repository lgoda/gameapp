import { Component, OnInit } from '@angular/core'
import {Observable} from 'rxjs/Rx';


import { Customer } from './customer';
import { CUSTOMERS } from './customers';

import { GameService } from './game.service';

import { Bet } from './bet';



@Component(
  {
    template:`
          <div class="container">
            <h2>Insert Bet</h2>
            <div *ngIf="errorMessage">
              <div class="alert alert-danger">{{errorMessage}}</div>
            </div>
            <div *ngIf="error">
              <div class="alert alert-danger">{{error}}</div>
            </div>
            <div *ngIf="successMessage">
              <div class="alert alert-success">{{successMessage}}</div>
            </div>
            <form (ngSubmit)="onSubmit()" #betForm="ngForm">
              <div class="form-group">
                <label for="name">Number</label>
                <input type="text" class="form-control" [(ngModel)]="bet.number" required name="number"  #num="ngModel" >
                <div [hidden]="num.valid || num.pristine" class="alert alert-danger">
                  Number is required
                </div>
              </div>
              <div class="form-group">
              <label for="power">Select Customer</label>
                <select class="form-control" [(ngModel)]="bet.customerId" required  name="customer">
                  <option *ngFor="let c of customers" [value]="c.id">{{c.name}}</option>
                </select>
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
             <div *ngIf="winner">
              <div class="alert alert-success">The winner is {{winner.name}}</div>
            </div>
          </div>
          
      `
  }
)
export class PlayComponent implements OnInit {

    customerId: string;
    number: string;

    errorMessage: string;

    successMessage: string;

     error: any;

    winner: Customer;

    test: string;

    bet = new Bet(undefined, "");

    customers = CUSTOMERS;

    constructor(private gameService:GameService){}

    sendBet() {
        this.gameService
            .save(this.bet)
            .then(bet => {
              console.log("bet is ");
              console.log(bet);
              this.bet = new Bet(bet.customerId, bet.number); // saved hero, w/ id if new
              //this.goBack(hero);
              this.successMessage="Congratulation your bet has been placed";
              setTimeout(() => {this.successMessage=''}, 2000);
            })
            .catch(error => {
                              this.error = error;
                              setTimeout(() => {this.error=''}, 2000);    
                  });  // TODO: Display error message
      
    }

    onChange() {
      //console.log(this.bet);
     // console.log('asa');
    }

    onSubmit() {
        console.log(this.bet);
        this.sendBet();
       // this.successMessage="Congratulation your bet has been placed";
        //setTimeout(() => {this.successMessage=''}, 2000);
    }

    ngOnInit() {
        /*setTimeout( () => {
            console.log('I am ');
            this.winner = this.winner + 10;
         }, 1000);*/
         let timer = Observable.timer(2000,5000);
         timer.subscribe(() => this.winner = this.gameService.getWinner());
    }
}
