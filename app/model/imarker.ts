/**
 * Created by ThaZalman on 24/09/2016.
 */

// for type safety (interface).
export interface IMarker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}