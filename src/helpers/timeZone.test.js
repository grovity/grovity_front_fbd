import {convertTimeZoneToUtc,convertUtcToTimeZone} from './timeZone'

test('time zone', () => {
    let timeZone = 'America/Caracas'
    const date ='2022-06-22T13:27:59.00Z'
    let dateTransdorm = convertUtcToTimeZone(date, timeZone)
    expect(dateTransdorm).toBe('2022-06-22 09:27:59')
    timeZone = 'America/Bogota'
    dateTransdorm = convertUtcToTimeZone(date, timeZone)
    expect(dateTransdorm).toBe('2022-06-22 08:27:59')
})

test( 'convert to utc', () => {
  const date = '2022-06-22 09:27:59'
    let timeZone = 'America/Caracas'
    let dateTransdorm = convertTimeZoneToUtc(date, timeZone)
    expect(dateTransdorm).toBe('2022-06-22T13:27:59.000Z')
})
	
