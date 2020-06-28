import { Injectable } from '@angular/core';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import { range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicNotationService {

  beatsPerMinute = 60;
  runCursor = false;
  playInterval: NodeJS.Timeout;

  private osmd: OpenSheetMusicDisplay;
  constructor() {}

  initOSMD(container: HTMLElement): void {
    this.osmd = new OpenSheetMusicDisplay(container);
  }

  renderXML(xmlString: string): void {
    if (this.osmd) {
      this.osmd.load(xmlString)
      .then(() => {
        this.osmd.render();
        this.osmd.cursor.show();

      });
    }

  }

  toggleCursor(): void {
    this.runCursor = !this.runCursor;
    if (this.runCursor) {
      this.playInterval = setInterval(() => {
        this.osmd.cursor.next();
        console.log(this.osmd.cursor.NotesUnderCursor());
      }, 60000 / this.beatsPerMinute);
    } else {
      clearInterval(this.playInterval);
    }
  }
}
