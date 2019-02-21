import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-user-popap',
  templateUrl: './user-popap.component.html',
  styleUrls: ['./user-popap.component.scss']
})
export class UserPopapComponent  {

  @Output() logout = new EventEmitter();
  @Input() user: any = null;
  onClick(){
    this.logout.emit(null);
  }
}
