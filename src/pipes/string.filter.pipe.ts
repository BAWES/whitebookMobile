import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "trimhtml",
})

export class StringFilterPipe implements PipeTransform {

    transform(value, args) {
        if (value) {
            return  value ? String(value).replace(/<[^>]+>/gm, '') : '';
        }
        return value; 
    }
}