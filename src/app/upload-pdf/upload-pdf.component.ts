import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.scss']
})
export class UploadPdfComponent {
  uploadForm: FormGroup;
  files: File[] = [];
  message: string | null = null;
  text: string | null = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.formBuilder.group({
      path: ['', Validators.required],
      files: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.files = event.target.files;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('path', this.uploadForm.get('path')?.value);
    for (let file of this.files) {
      formData.append('files', file);
    }
   
    this.http.post('https://probable-space-fortnight-pqv5grv46gw379wp-8080.app.github.de/api/upload', formData, { responseType: 'text' }).subscribe(
      (response: any) => {
        this.message = response.message;
        this.text = response.text;
      },
      (error) => {
        this.message = 'An error occurred while uploading the files.';
        console.error(error);
      }
    );
  }
}
