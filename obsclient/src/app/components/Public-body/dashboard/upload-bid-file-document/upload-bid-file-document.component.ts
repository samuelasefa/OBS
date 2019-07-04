import { Component, OnInit } from "@angular/core";
import { FileSelectDirective, FileUploader } from "ng2-file-upload/ng2-file-upload";
import { saveAs } from "file-saver";
import { FileService } from 'src/app/services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
const uri = "http://localhost:8080/file/upload";
@Component({
  selector: "app-upload-bid-file-document",
  templateUrl: "./upload-bid-file-document.component.html",
  styleUrls: ["./upload-bid-file-document.component.css"]
})
export class UploadBidFileDocumentComponent implements OnInit {
  uploader: FileUploader;
  attachmentList: any = [];

  constructor(
    private _fileService: FileService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
  }
  download(index) {
    const filename = this.attachmentList[index].uploadname;

    this._fileService
      .downloadFile(filename)
      .subscribe(data => saveAs(data, filename), error => console.error(error));
  }
  navigateBack() {
    this._router.navigate(['/dashboard'])
  }
  ngOnInit() {
    var url = uri;
    url += '/' + this._activatedRoute.snapshot.params['id'];
    this.uploader  = new FileUploader({ url: url });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      setTimeout(() => {
        this.navigateBack();
      }, 2000);
    };
  }
}
