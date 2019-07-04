import { Component, OnInit } from "@angular/core";
import { FileSelectDirective, FileUploader } from "ng2-file-upload/ng2-file-upload";
import { FileService } from "../../services/file.service";
import { saveAs } from "file-saver";
const uri = "http://localhost:8080/file/upload";
@Component({
  selector: "app-file-test",
  templateUrl: "./file-test.component.html",
  styleUrls: ["./file-test.component.css"]
})
export class FileTestComponent implements OnInit {
  uploader: FileUploader = new FileUploader({ url: uri });

  attachmentList: any = [];

  constructor(private _fileService: FileService) {
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.attachmentList.push(JSON.parse(response));
    };
  }
  download(index) {
    const filename = this.attachmentList[index].uploadname;

    this._fileService
      .downloadFile(filename)
      .subscribe(data => saveAs(data, filename), error => console.error(error));
  }
  ngOnInit() {}
}
