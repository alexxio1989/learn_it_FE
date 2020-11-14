import { Component, OnInit } from '@angular/core';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  openSideBar: boolean;

  constructor(private ds: DelegateServiceService) {
    this.ds.getOBSSideBar().subscribe(next => {
      this.openSideBar = next
    })
  }

  ngOnInit(): void {
    
  }

}
