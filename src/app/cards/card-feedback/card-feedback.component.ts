import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from 'src/app/model/Feedback';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { getUserLS , isSameUserID } from 'src/app/utils/Util';

@Component({
  selector: 'app-card-feedback',
  templateUrl: './card-feedback.component.html',
  styleUrls: ['./card-feedback.component.css']
})
export class CardFeedbackComponent implements OnInit {

  isSameUser: boolean;

  @Input() feed: Feedback;

  constructor(private fs: FeedbackService, private ds: DelegateServiceService) { }

  ngOnInit(): void {
    this.isSameUser = isSameUserID(getUserLS(),this.feed.idUtente);
  }

  elimina(){

    this.fs.delete(this.feed).subscribe(next => {
      this.ds.updateSpinner(false);
      this.fs.updateFeeds(next.list);
      this.ds.updateResultService('Eliminazione feed avvenuta con successo');
    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService('Eliminazione feed in errore');
    })

  }

}
