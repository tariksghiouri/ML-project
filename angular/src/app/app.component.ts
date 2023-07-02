import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageServiceService } from './image-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  cover: File;
  result: string;
  imageData: any;

  constructor(private iamgeS:ImageServiceService) { }
  ngOnInit(): void {
    this.title = "";
    this.cover = null;
    this.result = "";
    this.imageData = null;

  }
  navigateToHomePage() {
    window.location.href = '/';
  }
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
    console.log("newBook called")
    const uploadData = new FormData();
    uploadData.append('title', this.title);
    uploadData.append('cover', this.cover, this.cover.name);
    this.iamgeS.uploadimage(uploadData).subscribe(data => {
      console.log(data)
    })
    
  }
}
