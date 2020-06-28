# Piano Play Along

A basic web application for people with a digital keyboard to play along with a score
sheet while receiving direct feedback on the correctness of the playing.

I am still in the exploring around phase whether it's going to work out :-).

The idea is to use a score in MusicXML format for example written with 
MuseScore (https://musescore.org/en). Make the app responsive to keyboard inputs 
(possibly using a browser plugin). And then have an interactive playground that is 
completely client side.

Resources used for the development:
* [Angular 2 (v10.0.0)](https://angular.io/) (Web Framework)
* [OpenSheetMusicDisplay](opensheetmusicdisplay.org) (render musical notation)
* [zip.js](https://gildas-lormeau.github.io/zip.js/) (unzip files of MuseScore)

Still to implement:
* Receiving and rendering of played notes on the keyboard
* Continuous update of currently played measure or note
* Different logics to play along
