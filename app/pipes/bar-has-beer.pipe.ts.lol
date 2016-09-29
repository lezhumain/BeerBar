import {PipeTransform} from "../../node_modules/@angular/core/src/change_detection/pipe_transform";
/**
 * Created by Dju on 21/09/2016.
 */
@Pipe({
    name: 'hasbeerfilter',
    pure: false
})
@Injectable()
export class HasBeerFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        console.log(items);
        debugger;


        // filter items array, items which match and return true will be kept, false will be filtered out
        //return items.filter(item => item.title.indexOf(args[0].title) !== -1);
    }
}