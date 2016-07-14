import { Component, OnInit } from '@angular/core'
import {Observable} from 'rxjs/Rx';


import { Customer } from './customer';
import { CUSTOMERS } from './customers';

import { GameService } from './game.service';

import { Bet } from './bet';
import { Winner } from './winner';


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
            <form (ngSubmit)="onSubmit()" #betForm="ngForm" class="form-inline">
              <div class="form-group">
                <label for="power">Select Customer</label>
                  <select class="form-control" [(ngModel)]="bet.customerId" required  name="customer">
                    <option *ngFor="let c of customers" [value]="c.id">{{c.name}}</option>
                  </select>
              </div>
              <div class="form-group">
                <label for="name">Number</label>
                <input type="text" class="form-control" [(ngModel)]="bet.number" required name="number"  #num="ngModel" >

              </div>
              <div [hidden]="num.valid || num.pristine" class="alert alert-danger">
                Number is required
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
             <div *ngIf="winner && winnerName">
              <div class="alert alert-success">The winner is {{winnerName.name}}  who won {{winner.prize}}&euro; </div>
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

    winner: Winner;

    winnerName: Customer = new Customer(null, "");

    bet = new Bet(null, "");

    customers = CUSTOMERS;

    constructor(private gameService:GameService){}

    logSomething(val:string) {
      console.log(val);
    }

    sendBet() {
        this.gameService
            .save(this.bet)
            .then(() => {
              console.log("bet is ");
              //console.log(bet);
              /*this.bet = new Bet(bet.customerId, bet.number);*/ // saved hero, w/ id if new
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
         timer.subscribe(() => {
                this.gameService.getWinner().then(winner => {
                  console.log("winner is ");
                  console.log(winner);
                  this.winner = winner;
                  this.winnerName = this.customers.find(customer => customer.id === winner.id);
                  //console.log("winnerNae");
                  //console.log(this.winnerName);
                  //this.winner = new Bet(bet.customerId, bet.number); // saved hero, w/ id if new
                  //this.goBack(hero);
                  //this.successMessage="Congratulation your bet has been placed";
                  //setTimeout(() => {this.successMessage=''}, 2000);
                })
                .catch(error => {
                                  //this.error = error;
                                  //setTimeout(() => {this.error=''}, 2000);
                                  console.log(error);
                                  this.winner = null;
                      });

          });
    }
}
