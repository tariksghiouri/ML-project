import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http:HttpClient) {


   }

   uploadimage(uploadData:FormData){

    return this.http.post('http://127.0.0.1:8000/books/', uploadData);
      


   }
}
