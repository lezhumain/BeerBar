/**
 * Created by Dju on 14/09/2016.
 */
import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let bars = [
            {barId: 11, name: 'Mr. Nice', address: '', city: 'Le Puy en Velay', description: '', listBeer: [{barId:1,name:"grimbergen",degree:6}]},
            {barId: 12, name: 'Narco', address: '', city: 'Le Puy en Velay', description: '', listBeer: []},
            {barId: 13, name: 'Bombasto', address: '', city: 'Le Puy en Velay', description: '', listBeer: []},
            {barId: 14, name: 'Celeritas', address: '', city: 'Le Puy en Velay', description: '', listBeer: []},
            {barId: 15, name: 'Magneta', address: '', city: 'Le Puy en Velay', description: '', listBeer: []},
            {barId: 16, name: 'RubberMan', address: '', city: 'Le Puy en Velay', description: '', listBeer: []},
            {barId: 17, name: 'Dynama', address: '', city: 'Le Puy en Velay', description: '', listBeer: []},
            {barId: 18, name: 'Dr IQ', address: '', city: 'Le Puy en Velay', description: '', listBeer: []},
            {barId: 19, name: 'Magma', address: '', city: 'Le Puy en Velay', description: '', listBeer: []},
            {barId: 20, name: 'Tornado', address: '', city: 'Le Puy en Velay', description: '', listBeer: []}
        ];
        return {bars};
    }
}