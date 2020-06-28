import { Component } from '@angular/core';
import { FileReaderService } from './services/file-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public fileReader: FileReaderService) { }

}
