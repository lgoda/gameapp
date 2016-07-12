    import { Injectable }    from '@angular/core';
    import { Headers, Http } from '@angular/http';
    import 'rxjs/add/operator/toPromise';
    import { Customer } from './customer';
    import { Bet } from './bet';
    @Injectable()
    export class GameService {
      private customersUrl = 'app/customers';  // URL to web api
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

      getWinner() {
        let w = new Customer(1, "Luca");
        let n = Math.floor(Math.random() * (9-1)) + 1;
        console.log("num is " + n);
        if (n == 1) {
            return w;
        } else {
            return null;
        }
        //return w;
      }
      
      save(bet: Bet): Promise<Bet>  {
        console.log('bet posted');
        console.log(bet);
        return this.post(bet);
      }

      // Send new bet
      private post(bet: Bet): Promise<Bet> {
          console.log('posting bet');
        let headers = new Headers({
          'Content-Type': 'application/json'});
        return this.http
                   .post(this.customersUrl, JSON.stringify(bet), {headers: headers})
                   .toPromise()
                   .then(res => res.json().data)
                   .catch(this.handleError);
      }
     

      private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
      }
    }