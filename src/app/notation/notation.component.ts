import { Component, OnInit } from '@angular/core';
import { MusicNotationService } from '../services/music-notation.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.scss']
})
export class NotationComponent {

  constructor(
    public notationService: MusicNotationService,
    public sanitizer: DomSanitizer) { }

}
