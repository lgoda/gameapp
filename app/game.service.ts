    import { Injectable }    from '@angular/core';
    import { Headers, Http } from '@angular/http';
    import 'rxjs/add/operator/toPromise';
    import { Customer } from './customer';
    import { Bet } from './bet';
    import { Winner } from './winner';

    @Injectable()
    export class GameService {
      private customersUrl = 'app/customers';  // URL to web api
      private customersUrl2 = 'http://localhost:1337/lv-edge-01.escloud.tipp24.net:9080'
      constructor(private http: Http) { }
      getCustomers(): Promise<Customer[]> {
        return this.http.get(this.customersUrl)
                   .toPromise()
                   .then(response => response.json().data)
                   .catch(this.handleError);
      }
      getCustomer(id: number) {
        return this.getCustomers()
                   .then(customers => customers.find(customer => customer.id === id));
      }

      /*getWinner() {
        let w = new Customer(1, "Luca");
        let n = Math.floor(Math.random() * (9-1)) + 1;
        console.log("num is " + n);
        if (n == 1) {
            return w;
        } else {
            return null;
        }
        //return w;
      }*/

      getWinner(): Promise<Winner> {
        console.log(`${this.customersUrl2}/winner`);
        return this.http.get(`${this.customersUrl2}/winner`)
                   .toPromise()
                   .then(response => response.json()/*.data*/)
                   .catch(this.handleError);
      }

      save(bet: Bet): Promise<Bet>  {
        console.log('bet posted');
        console.log(bet);
        let a = 10;
        console.log(`Template String ${a}`);
        return this.post(bet);
      }

      // Send new bet
      private post(bet: Bet): Promise<Bet> {
          console.log('posting bet');
        let headers = new Headers({
          'Content-Type': 'application/json'});
        return this.http
                   .post(`${this.customersUrl2}/bet/${bet.customerId}/${bet.number}`, JSON.stringify(bet), {headers: headers})
                   .toPromise()
                   .then(/*res => res.json().data*/ (res) => bet)
                   .catch(this.handleError);
      }


      private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
      }
    }
