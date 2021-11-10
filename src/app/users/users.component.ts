import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UpdateInfo } from '../models/updateInfo.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() users: User[];
  @Output() updateHandler = new EventEmitter<UpdateInfo>()

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate(id: number) {
    this.updateHandler.emit({
      id: id,
      comingFromUpdate: true
    })
  } 

  onDelete(id: number) {
    if(confirm(
      `This action will remove a user with this email: ${this.users[id].email} Are you shure?`
      )) {
      this.users.splice(id, 1);
    }
  }

}
