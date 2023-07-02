import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HandWritingService {

  constructor(private http:HttpClient) { }


  uploadImage(imageFile: File) {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http.post<any>('http://127.0.0.1:8000/upload-image/', formData);
  }
}
