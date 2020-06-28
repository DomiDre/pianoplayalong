import { Injectable } from '@angular/core';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

@Injectable({
  providedIn: 'root'
})
export class MusicNotationService {

  private osmd: OpenSheetMusicDisplay;

  constructor() {}

  initOSMD(container: HTMLElement): void {
    this.osmd = new OpenSheetMusicDisplay(container);
  }

  renderXML(xmlString: string): void {
    if (this.osmd) {
      console.log('Rendering: ', xmlString);
      this.osmd.load(xmlString)
      .then(() => {
        this.osmd.render();
      });
    }

  }
}
