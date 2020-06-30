import { Component, OnInit } from '@angular/core';
import { KeyboardListenerService } from './services/keyboard-listener.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private keyboardListener: KeyboardListenerService) { }

  ngOnInit(): void {
    this.keyboardListener.init();
  }
}
