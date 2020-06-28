export enum Accidental {
  None,
  Flat = 'f',
  Sharp = 's',
  Natural = 'n'
}

export interface MusicNote {
  name: string;
  duration: number;
  octave: number;
  accidental: Accidental;
}

export interface Measure {
  trebleNotes: MusicNote[];
  bassNotes: MusicNote[];
}
