import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { GameService } from './game.service';


@Component({
    selector: 'my-app',
    template: `
                <h1>{{title}}</h1>
                <nav>
                    <a [routerLink]="['/']" routerLinkActive="active">Home</a>
                </nav>
                <router-outlet></router-outlet>

                `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [GameService]
})
export class AppComponent {
    title = 'GAME APP';
}
