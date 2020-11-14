import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgoQues'
})
export class DateAgoQuesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
