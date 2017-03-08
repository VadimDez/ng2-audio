# ng2-audio

Get audio with custom headers

```ts
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Load audio with headers';
  audioSrc = 'olp.mp3';
  @ViewChild('audio') audio: ElementRef;

  constructor() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.audioSrc, true);

    // set headers
    xhr.setRequestHeader('Authorization', 'Basic QWxhZGRpbjpPcGVuU2VzYW1l');

    xhr.responseType = 'blob';
    xhr.onload = () => {
      const blob = new Blob([xhr.response], {type: 'audio/mpeg'});
      let objectUrl = URL.createObjectURL(blob);
      this.audio.nativeElement.src = objectUrl;

      this.audio.nativeElement.onload = function(evt) {
        URL.createObjectURL(objectUrl);
      };
      this.audio.nativeElement.play();
    };

    xhr.send();
  }
}
```
