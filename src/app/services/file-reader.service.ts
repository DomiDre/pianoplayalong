import { Injectable } from '@angular/core';
import { ZipService } from './zip.service';
import { MusicNotationService } from './music-notation.service';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor(
    private zipService: ZipService,
    private musicNotation: MusicNotationService) { }

  readFileInput(files: FileList): void {
    if (files.length <= 0) {
      return;
    }

    const file = files[0];
    if (file.name.endsWith('.xml')) {
      this.readMusicXMLFile(file);
    } else if (file.name.endsWith('.mxl')) {
      this.zipService.getEntries(file)
      .subscribe(zipEntries => {
        for (const entry of zipEntries) {
          if (entry.filename.endsWith('.xml') && !entry.filename.endsWith('container.xml')) {
            this.zipService.getData(entry)
            .data.subscribe(zipData => {
              this.readMusicXMLFile(zipData);
            });
            break;
          }
        }
      });
    } else {
      console.error('File format not supported.');
    }
  }

  readMusicXMLFile(musicXMLFile: Blob): void {
    musicXMLFile.text()
    .then(text => {
      this.musicNotation.renderXML(text);
    }).catch(error => {
      console.error('Error during rendering:', error);
    });
  }
}
