import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  audioSrc = 'https://archive.org/download/testmp3testfile/mpthreetest.mp3';
  @ViewChild('audio') audio: ElementRef;

  constructor() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.audioSrc, true);
    xhr.responseType = 'blob';
    xhr.onload = (evt) => {
      const blob = new Blob([xhr.response], {type: 'audio/mpeg'});
      let objectUrl = URL.createObjectURL(blob);
      this.audio.nativeElement.src = objectUrl;
      // Release resource when it's loaded
      this.audio.nativeElement.onload = function(evt) {
        URL.createObjectURL(objectUrl);
      };
      this.audio.nativeElement.play();
    };

    xhr.send();
  }
}
