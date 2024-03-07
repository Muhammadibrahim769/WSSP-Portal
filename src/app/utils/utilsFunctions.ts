import { Injectable } from '@angular/core';
import { DateFormatPipe } from '@app/_helpers/date-format.pipe';
// import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsFunctions {
  serverDate: any;
  accVoucherDTO: any;
  lstAccVoucherDetailDTO: any[] = [];

  constructor(private datepipe:DateFormatPipe) {
  }
  transformDate(date: any) {
      let formatedDate = this.datepipe.transform(date, 'yyyy-MM-ddTHH:mm:ss');
      return formatedDate;
  }
  downloadFile(fileData: any, fileName: string) {
      debugger;
      var output = atob(fileData);

      var length = output.length;
      var arrayBuffer = new ArrayBuffer(length);
      var uintArray = new Uint8Array(arrayBuffer);

      for (var i = 0; i < length; i++) {
          uintArray[i] = output.charCodeAt(i);
      }
      let file = new Blob([uintArray], { type: "application/octet-stream" });
      const a = document.createElement('a');
      var fileURL = URL.createObjectURL(file);
      a.href = fileURL;
      a.download = fileName + ".pdf" ;
      a.click();
      window.URL.revokeObjectURL(fileURL);
  }
}
