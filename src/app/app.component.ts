import { Component } from '@angular/core';
import { UpdateInfo } from './models/updateInfo.model';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadedContent: string = 'register';
  updateInfo:UpdateInfo = {
    id: NaN,
    comingFromUpdate: false
  }

  users: User[] = [
    {
      updateId: NaN,
      email: 'g.nikoladze13@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
      nickname: 'JohnDoe',
      phone: '+380123456789',
      website: 'test.com'
    }
  ];

  onSwitch(navItem: string) {
    this.loadedContent = navItem;
  }

  onRegister(user: User) {
    if(user.comingFromUpdate) {
      this.users[user.updateId] = user;
      this.updateInfo.comingFromUpdate = false;
    } else {
      this.users.push(user);
    }
    this.loadedContent = 'users';
  }

  onUpdate(event: UpdateInfo) {
    this.updateInfo.id = event.id;
    this.updateInfo.comingFromUpdate = event.comingFromUpdate;
    this.loadedContent = 'register';
  }
}
