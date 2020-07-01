import { Injectable } from '@angular/core';
import * as webmidi from "webmidi";

@Injectable({
  providedIn: 'root'
})
export class KeyboardListenerService {

  initialized = false;
  constructor() { }

  init(): void {
    // check if available
    webmidi.default.enable((err) => {
      if (err) {
        console.log('WebMidi could not be enabled.', err);
      } else {
        console.log('WebMidi enabled!');

        let keyboardInput: webmidi.Input;
        for (const input of webmidi.default.inputs) {
          if (!input.name.includes('Midi Through Port')) {
            keyboardInput = input;
            break;
          }
        }
        if (keyboardInput) {
          webmidi.default.inputs[1].addListener('noteon', 'all',
          (e) => {
            console.log('Received noteon message (' + e.note.name + e.note.octave + ').');
          });
        } else {
          console.log('Failed to find keyboard.');
        }
      }
    });
  }
}
