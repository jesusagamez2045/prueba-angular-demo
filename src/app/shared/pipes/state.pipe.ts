import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'state'
})
export class StatePipe implements PipeTransform {
    transform(state: number): any {
       if(state === 1) return "Activo";
       return "Inactivo";
    }
}