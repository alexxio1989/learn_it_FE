import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CorsoServiceService } from '../corso-service.service';
import { Corso } from '../model/Corso';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-card-corso',
  templateUrl: './card-corso.component.html',
  styles: [`
    .containerText {
      height: 30px;
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .scrolling-text {
      position: absolute;
      white-space: nowrap;
    }

    /* Below doesn't work to pause */

    .scrolling-text:hover, .container:hover {
      -moz-animation-play-state: paused;
      -webkit-animation-play-state: paused;
      animation-play-state: paused;
    }
  `],
  animations: [
    trigger('scroll', [
      state('on', style({left: '-100px'})),
      transition('* => *', [
        style({right: '-100px'}),
        animate(10000, style({right: '100%'}))
      ])
    ])
  ]
})
export class CardCorsoComponent implements OnInit {

  @Input() corso: Corso;
  
  state = 0;

  constructor( private cs: CorsoServiceService ,private route: Router) { }

  ngOnInit(): void {
  }


  scrollDone() {
    this.state++;
  }

  goToCorso(corso: Corso){
    this.cs.corsoSelected = corso;
    this.route.navigate(['/corso']);
  }

}
