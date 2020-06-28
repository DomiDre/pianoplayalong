import { Component, AfterViewInit } from '@angular/core';
import { MusicNotationService } from '../services/music-notation.service';

@Component({
  selector: 'app-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.scss']
})
export class NotationComponent implements AfterViewInit {

  constructor(
    public notationService: MusicNotationService) { }

    ngAfterViewInit(): void {
      const container = document.getElementById('osmd-container');
      this.notationService.initOSMD(container);
  }

}
