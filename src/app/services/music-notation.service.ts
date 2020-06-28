import { Injectable } from '@angular/core';
import { Measure, MusicNote, Accidental } from '../shared/music.interface';

declare const verovio: any;

@Injectable({
  providedIn: 'root'
})
export class MusicNotationService {

  private vrvToolkit: any;
  private measures: Measure[];
  public scoreSVG;

  constructor() {
    // initialize verovio toolkit
    this.vrvToolkit = new verovio.toolkit();
    this.measures = [];
  }

  addMeasure(measure: Measure): void {
    this.measures.push(measure);
  }

  generateMEI(): string {
    let measureXml = '';
    let noteCounter = 0;
    for (const [i, measure] of this.measures.entries()) {
      measureXml += `<measure n="${i}">
                      <staff n="1">
                        <layer>`;
      for (const note of measure.trebleNotes) {
        measureXml += `<note
                        xml:id="${noteCounter}"
                        pname="${note.name}"
                        oct="${note.octave}"
                        dur="${note.duration}"
                        ${note.accidental !== Accidental.None ? 'accid="' + note.accidental.toString() + '"' : '' }
                      />`;
        noteCounter++;
      }
      measureXml += `</layer>
                    </staff>
                    <staff n="2">
                      <layer>`;
      for (const note of measure.bassNotes) {
        measureXml += `<note
                        xml:id="${noteCounter}"
                        pname="${note.name}"
                        oct="${note.octave}"
                        dur="${note.duration}"
                        ${note.accidental !== Accidental.None ? 'accid="' + note.accidental.toString() + '"' : '' }
                      />`;
        noteCounter++;
      }
      measureXml += `</layer>
                    </staff>
                  </measure>`;
    }
    const scoreMEI = `
      <?xml version="1.0" encoding="UTF-8"?>
      <?xml-model href="http://music-encoding.org/schema/3.0.0/mei-all.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?>
      <?xml-model href="http://music-encoding.org/schema/3.0.0/mei-all.rng" type="application/xml" schematypens="http://purl.oclc.org/dsdl/schematron"?>
      <mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="3.0.0">
        <music>
          <body>
            <mdiv>
              <score>
                <scoreDef>
                  <staffGrp symbol="brace" label="">
                    <staffDef clef.shape="G" clef.line="2" n="1" lines="5" />
                    <staffDef clef.shape="F" clef.line="4" n="2" lines="5" />
                  </staffGrp>
                </scoreDef>
                <section>
                ${ measureXml }
                </section>
              </score>
            </mdiv>
          </body>
        </music>
      </mei>`;

    return scoreMEI;
  }

  renderXML(xmlString: string): void {
    console.log('Rendering: ', xmlString);
    const options = { };
    this.scoreSVG = this.vrvToolkit.renderData(xmlString, options);
  }
}
