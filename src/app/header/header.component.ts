import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() contentSelected = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(content: string) {
    this.contentSelected.emit(content)
  }
}
