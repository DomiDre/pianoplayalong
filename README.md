# Piano Play Along

A basic web application for people with a digital keyboard to play along with a score
sheet while receiving direct feedback on the correctness of the playing.

The idea is to use a score written with MuseScore (https://musescore.org/en).

Resources used for the development:
* [Angular 2 (v10.0.0)](https://angular.io/) (Web Framework)
* [OpenSheetMusicDisplay](opensheetmusicdisplay.org) (render musical notation)
* [zip.js](https://gildas-lormeau.github.io/zip.js/) (unzip files of MuseScore)

Still to implement:
* Proper parsing from MuseScore XML format to Verovio Format
* Proper rendering of the musical notation
* Receiving and rendering of played notes on the keyboard
* Different logics to play along
