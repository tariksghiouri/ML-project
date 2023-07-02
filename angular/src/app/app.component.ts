import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  cover: File;
  result: string;
  imageData: any;

  constructor(private http: HttpClient) {}

  onTitleChanged(event: any) {
    this.title = event.target.value;
  }

  onImageChanged(event: any) {
    this.cover = event.target.files[0];

    // Read image data for preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageData = e.target.result;
    };
    reader.readAsDataURL(this.cover);
  }

  newBook() {
    const uploadData = new FormData();
    uploadData.append('title', this.title);
    uploadData.append('cover', this.cover, this.cover.name);
    this.http.post('http://127.0.0.1:8000/books/', uploadData)
    .subscribe((data: any)=> {
      this.result = data.result;
      console.log(this.result)
    });
  }
}
