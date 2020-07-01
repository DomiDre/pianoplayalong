import { Component } from '@angular/core';
import { FileReaderService } from '../../services/file-reader.service';
import { MusicNotationService } from '../../services/music-notation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public fileReader: FileReaderService,
    public notationService: MusicNotationService
    ) { }

}
