import { ExposureTwoTone } from '@material-ui/icons';
import {
    formatInTimeZone,
    zonedTimeToUtc,
    utcToZonedTime,
    format,
  } from 'date-fns-tz';


export function convertUtcToTimeZone  (date, timeZone)  {
  let d = new Date(date)
  const nyDate = utcToZonedTime(d, timeZone);
  let dateConvert = format(nyDate, 'yyyy-MM-dd HH:mm:ss', {});
  return dateConvert

}

export function convertTimeZoneToUtc (date, timeZone) {
//format date --> 2022-06-22 09:27:59

const utcDate = zonedTimeToUtc(date, timeZone);
return utcDate
}


export function colTimeZonetoOtherTimeZone (date, timeZone)  {

  let dateColombia = date?.replaceAll("Z", "")?.replaceAll("T", " ");
  const utcDate = zonedTimeToUtc(dateColombia, 'America/Bogota');
 
  const newDate = new Date(utcDate);

  const nyDate = utcToZonedTime(newDate, timeZone);
  let resultFormat = format(nyDate, 'yyyy-MM-dd HH:mm:ss', {});
  return resultFormat

}