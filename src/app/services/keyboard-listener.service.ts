import { Injectable } from '@angular/core';
import * as webmidi from "webmidi";

@Injectable({
  providedIn: 'root'
})
export class KeyboardListenerService {

  initialized = false;
  constructor() { }

  init() {
    // check if available
    webmidi.default.enable((err) => {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
        console.log(webmidi.default.inputs);
        console.log(webmidi.default.outputs);
          // Listen for a 'note on' message on all channels
        webmidi.default.inputs[1].addListener('noteon', "all",
        (e) => {
          console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
        }
      );
      }
      
    });
  }
}
