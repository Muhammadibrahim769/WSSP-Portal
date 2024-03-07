import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceResponse } from "@app/_helpers/ApplicationHelperDTO";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class UtilsService {

    baseApiUrl = "https://file.io"

    constructor(private httpClient: HttpClient) { }


    createConnectionService(createBillingConnection: any) {
      return this.httpClient.post<ServiceResponse>(environment.apiUrl + "billConnnection", createBillingConnection);
    }
    
    // createConnectionService(input: any){
    //     console.log("This is from Service");
    //     console.log(input);
    //     return input;
    // }

    upload(file):Observable<any> {
  
        // Create form data
        const formData = new FormData(); 
          
        // Store form name as "file" with file data
        formData.append("file", file, file.name);
          
        // Make http post request over api
        // with formData as req
        return this.httpClient.post(this.baseApiUrl, formData)
    }
    
}