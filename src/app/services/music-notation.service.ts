import { Injectable } from '@angular/core';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

@Injectable({
  providedIn: 'root'
})
export class MusicNotationService {

  beatsPerMinute = 60;
  runCursor = false;
  loadedSheet = false;
  pressedKeys: Map<number, [boolean, NodeJS.Timeout]>;

  notesToPlay: Set<number>;

  playInterval: NodeJS.Timeout;

  private osmd: OpenSheetMusicDisplay;
  constructor() {
    this.pressedKeys = new Map();
    for (let i = 20; i <= 108; i++) {
      this.pressedKeys[i] = [false, undefined];
    }
  }

  initOSMD(container: HTMLElement): void {
    this.osmd = new OpenSheetMusicDisplay(container);
  }

  renderXML(xmlString: string): void {
    if (this.osmd) {
      this.osmd.load(xmlString)
      .then(() => {
        this.osmd.render();
        this.osmd.cursor.show();
        this.loadedSheet = true;
        this.readNextNotesToPlay();
      });
    }
  }

  readNextNotesToPlay(): void {
    this.notesToPlay = new Set();
    while (this.notesToPlay.size <= 0) {
      const readNotes = this.osmd.cursor.NotesUnderCursor();
      for (const note of readNotes) {
        console.log(note);
        if (note.halfTone > 0) {
          this.notesToPlay.add(note.halfTone + 12);
        }
      }
    }
    console.log(this.notesToPlay)
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

  handleKeyboardInput(midiNumber: number): void {
    console.log('Received note message (' + midiNumber + ').');
    if (this.pressedKeys[midiNumber][1]) {
      // reset timeout
      clearTimeout(this.pressedKeys[midiNumber][1]);
    }
    this.pressedKeys[midiNumber] = [
      true,
      setTimeout(() => { this.pressedKeys[midiNumber] = [false, undefined]; },
                 1000)
    ];
    // check if one can continue with cursor
    let allKeysPressed = true;
    for (const note of this.notesToPlay) {
      if (!this.pressedKeys[note][0]) { // check if all are true, if one is false, over
        allKeysPressed = false;
        break;
      }
    }
    if (allKeysPressed) {
      this.osmd.cursor.next();
      this.readNextNotesToPlay();
    }
  }

  resetCursor(): void {
    this.osmd.cursor.reset();
  }
}
