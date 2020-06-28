import { Injectable } from '@angular/core';
import { ZipService } from './zip.service';
import { MusicNotationService } from './music-notation.service';
import { parseString } from 'xml2js';
import { MusicNote, Accidental } from '../shared/music.interface';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor(
    private zipService: ZipService,
    private musicNotation: MusicNotationService) { }

  readFileInput(files: FileList): Promise<boolean> {
    if (files.length <= 0) {
      return new Promise((resolve, reject) => resolve(false));
    }

    const file = files[0];
    if (file.name.endsWith('.mscx')) {
      return this.readMSCXFile(file);
    } else if (file.name.endsWith('.mscz')) {
      this.zipService.getEntries(file)
      .subscribe(zipEntries => {
        for (const entry of zipEntries) {
          if (entry.filename.endsWith('mscx')) {
            this.zipService.getData(entry)
            .data.subscribe(zipData => {
              return this.readMSCXFile(zipData);
            });
            break;
          }
        }
      });
    } else if (file.name.endsWith('.xml')) {
      return this.readMusicXMLFile(file);
    } else if (file.name.endsWith('.mxl')) {
      this.zipService.getEntries(file)
      .subscribe(zipEntries => {
        for (const entry of zipEntries) {
          if (entry.filename.endsWith('.xml') && !entry.filename.endsWith('container.xml')) {
            this.zipService.getData(entry)
            .data.subscribe(zipData => {
              return this.readMusicXMLFile(zipData);
            });
            break;
          }
        }
      });
    }
  }

  readMusicXMLFile(musicXMLFile: Blob): Promise<boolean> {
    return musicXMLFile.text()
    .then(text => {
      parseString(text, (err, result)  => {
        const root = result['score-partwise'];
        if (typeof root === 'undefined') { return false; }
        const part = root.part;
        if (typeof part === 'undefined') { return false; }
        if (part.length <= 0) { return false; }
        const measures = part[0].measure;
        if (typeof measures === 'undefined') { return false; }
        for (const measure of measures) {
          if (typeof measure.note === 'undefined') {
            console.error('There is a measure without a note in this score.');
            continue;
          }

          const trebleNotes: MusicNote[] = [];
          const bassNotes: MusicNote[] = [];
          for (const note of measure.note) {
            let duration;
            if ('duration' in note) {
              duration = note.duration[0];
            }

            if ('rest' in note) {
              continue;
            }

            let octave;
            let name;
            if ('pitch' in note && note.pitch.length > 0) {
              const pitch = note.pitch[0];
              if ('step' in pitch) {
                name = pitch.step[0].toLowerCase();
              }
              if ('octave' in pitch) {
                octave = pitch.octave[0];
              }
            }

            let accidental: Accidental;
            if ('accidental' in note && note.accidental.length > 0) {
              const accid = note.accidental[0];
              if (accid === 'sharp') {
                accidental = Accidental.Sharp;
              } else if (accid === 'flat') {
                accidental = Accidental.Flat;
              } else if (accid === 'natural') {
                accidental = Accidental.Natural;
              } else {
                console.error('Unknown accidental: ', accid);
              }
            } else {
              accidental = Accidental.None;
            }

            if (!(name && duration && octave)) {
              continue;
            }
            const parsedNote: MusicNote = {
              name,
              accidental,
              duration,
              octave
            };
            if (note.staff[0] === '1') {
              trebleNotes.push(parsedNote);
            } else if (note.staff[0] === '2') {
              bassNotes.push(parsedNote);
            } else {
              console.error('Unknown staff number found: ', note.staff);
            }
          }
          console.log(measure, trebleNotes, bassNotes)
          this.musicNotation.addMeasure({
            trebleNotes, bassNotes
          });
        }
      });
      this.musicNotation.renderXML(this.musicNotation.generateMEI());
      return true;
    });
  }

  readMSCXFile(mscxFile: Blob): Promise<boolean> {
    return mscxFile.text()
    .then(text => {
      parseString(text, (err, result)  => {
        const root = result.museScore;
        if (typeof root === 'undefined') { return false; }
        let score = root.Score;
        if (typeof score === 'undefined') { return false; }
        score = score[0];
        const staff = score.Staff;
        if (typeof staff === 'undefined') { return false; }
        if (staff.length !== 2) {
          console.error('staff doesnt have length of 2');
          return false;
        }
        // read grand staff
        const clefTreble = staff[0];
        const clefBass = staff[1];
        if (typeof clefTreble.Measure === 'undefined' ||
            typeof clefBass.Measure === 'undefined') { return false; }
        if (clefTreble.Measure.length !== clefBass.Measure.length) {
          console.error('Treble and Bass dont have same count of measures.');
          return false;
        }
        /// TODO... implement reading of file
        // for (const [i, measureTreble] of clefTreble.Measure.entries()) {
        //   const measureBass = clefBass.Measure[i];
        //   for (note of measureTreble)
        //   // this.musicNotation.addMeasure({
        //   //   trebleNotes:
        //   // })
        //   console.log(measureTreble);
        // }
        // console.dir(result.museScore.Score[0]);
        // const scoreMEI = this.musicNotation.generateMEI();
        // console.log(scoreMEI);
      });
      this.musicNotation.renderXML(this.musicNotation.generateMEI());
      return true;
    });

  }
}
