import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Bar} from "../model/bar";
import {BaseService} from "./base.service";
import {IGeoloc} from "../model/igeoloc";
/**
 * Created by ThaZalman on 06/11/2016.
 */
@Injectable()
export class GeolocService extends BaseService
{
    private geolocInfos: IGeoloc = null;

    constructor(http: Http)
    {
        super(http);

        this.retrieveCity();
    }

    ngOnInit(): void {

    };

    private retrieveCity(): Promise<IGeoloc>
    {
        var self = this;

        let url = "http://freegeoip.net/json/";

        return this.http.get(url, { withCredentials: true })
            .toPromise()
            .then(response => {
                console.log("HERE");
                console.log(response);

                var bars = response.json() as IGeoloc;

                self.geolocInfos = bars;
                return bars;
            })
            .catch(this.handleError);
    }

    public GetCity(): string
    {
        return this.geolocInfos.city;
    }
}