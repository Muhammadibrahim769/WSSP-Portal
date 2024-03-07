import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, 'MMM-y'); 
  }
  transformDateTime(value: any, args?: any): any {
    return super.transform(value, 'MMM-dd-y,hh:mm'); 
        // return super.transform(value, 'd-MMMM-y, h:mm a');
  }

  transformToStandardDateTime(value: any, args?: any): any {
    return super.transform(value, 'yyyy-MM-dd'); 
  }
  // transformTrip(value: any, args?: any): any {
  //   return super.transform(value, 'DD/MM/YY'); 
  // }
  transformOperation(value: any, args?: any): any {
    return super.transform(value, 'dd MMMM, yyyy'); 
  }
  transformDateTimeFormat(value: any, args?: any): any {
    return super.transform(value, 'dd MMMM, yyyy:hh:mm'); 
        // return super.transform(value, 'd-MMMM-y, h:mm a');
  }
  transformWithTimeZero(value: any, args?: any): any {
    return super.transform(value, 'MMM-dd-y,mm:mm'); 
  }

  transformtoStandard(value: any, args?: any): any {
    return super.transform(value, 'yyyy-MM-ddTHH:mm:ss.sssZ'); 
  }

  transformWithTimeHour(value: any, args?: any): any {
    return super.transform(value, 'MMM-dd-y,23:59'); 
  }
}

