import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "truncate"
})
export class TruncatePipe implements PipeTransform {
  transform(value: any, filter?: any): any {
    if (!value || !filter) return value;

    return this.applyFilter(value, filter);
  }

  applyFilter(value, filter) {
    if (value.length > filter) {
      let newItem = value.substring(0, filter);
      return newItem + "...";
    }
    return value;
  }
}
