import {Component, OnInit} from '@angular/core';
import {HandWritingService} from "./services/hand-writing.service";
import { Clipboard } from '@angular/cdk/clipboard';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'MLHandwritingFrontEnd';
  imagePath: any;

  constructor(private handService:HandWritingService,private clipboard: Clipboard) {
   
  }
    resetForm() {
    console.log("hello");
    window.location.reload();
    
  }
  copyText(textToCopy: string) {
    console.log(textToCopy);
    
    this.clipboard.copy(textToCopy);
}
  ngOnInit() {
    this.Init();
  }
  onCopySuccess() {
    window.alert('copied to Clipboard !');

  }

  onCopyError() {
    // Logic to handle copy error
    window.alert('ERROR !');

  }
  Init(){
    const body = document.querySelector('body')!
    const upload = document.querySelector('.upload')!
    const uploadButtonText = document.querySelector('.upload-button-text')!
    const uploadFilename = document.querySelector('.upload-filename')!
    const fileInput = document.getElementById('file')!
    // @ts-ignore
    fileInput.onchange = () => uploadFile(fileInput.files[0])
    // @ts-ignore
    const uploadFile = (file) => {
      if (file) {
        uploadFilename.classList.remove('inactive');
        // @ts-ignore
        uploadFilename.innerText = file.name;
        // @ts-ignore
        uploadButtonText.innerText = 'Upload';

        fileInput.remove();

        uploadButtonText.addEventListener("click", async () => {
          console.log(file);
          this.handService.uploadImage(file).subscribe((data:any) => {
            this.imagePath = data.path;
            console.log(data)
          });
          upload.classList.add("uploading");
          setTimeout(() => {
            upload.classList.remove("uploading");
          }, 5000);
        });
      }
    }

    const dropArea = document.querySelector('.drop-area')
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      // @ts-ignore
      dropArea.addEventListener(eventName, preventDefaults, false)
    })
    // @ts-ignore
    function preventDefaults (e) {
      e.preventDefault()
      e.stopPropagation()
    }


    ;['dragenter', 'dragover'].forEach(eventName => {
      body.addEventListener(eventName, displayDropArea, false)
    })
    ;['dragleave', 'drop'].forEach(eventName => {
      body.addEventListener(eventName, hideDropArea, false)
    })
    ;['dragenter', 'dragover'].forEach(eventName => {
      dropArea!.addEventListener(eventName, highlight, false)
    })

    ;['dragleave', 'drop'].forEach(eventName => {
      dropArea!.addEventListener(eventName, unhighlight, false)
    })
    // @ts-ignore
    function highlight(e) {
      // @ts-ignore
      if (!dropArea.classList.contains('highlight')) dropArea.classList.add('highlight')
    }

    // @ts-ignore
    function unhighlight(e) {
      // @ts-ignore
      dropArea.classList.remove('highlight')
    }

    function displayDropArea() {
      // @ts-ignore
      if (!dropArea.classList.contains('highlight')) dropArea.classList.add('droppable')
    }

    function hideDropArea() {
      // @ts-ignore
      dropArea.classList.remove('droppable')
    }

// Handle dropped files
    // @ts-ignore
    dropArea.addEventListener('drop', handleDrop, false)

    // @ts-ignore
    function handleDrop(e) {
      let dt = e.dataTransfer
      let files = dt.files
      let file = files[0]

      uploadFile(file)
    }
  }

}
