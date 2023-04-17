import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Formaters} from "../constants/formaters";

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  override transform(value: any, format?: string, timezone?: string): any {
    return super.transform(value, Formaters.DATE_TIME_FMT);
  }

}
