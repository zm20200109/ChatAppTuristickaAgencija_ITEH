import { Daily} from "./daily";
import { DailyUnits} from "./daily-units";

export interface Temperature {
    latitude:number;
    longitude:number;
    generationtime_ms:number;
    utc_offset_seconds:number;
    timezone:string;
    timezone_abbreviation:string;
    elevation:number;
    daily_units: DailyUnits;
    daily:Daily;

}
