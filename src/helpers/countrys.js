//all countries in the world
const AllCountryWithTimeZone = [
    { id: 0, value: "America/Bogota", label: "Colombia", short: "CO" },
    { id: 1, value: "America/Buenos_Aires", label: "Argentina", short: "AR" },
    { id: 2, value: "America/Cancun", label: "Mexico", short: "MX" },
    { id: 3, value: "America/Caracas", label: "Venezuela", short: "VE" },
    { id: 4, value: "America/Chicago", label: "Estados Unidos", short: "US" },
    { id: 5, value: "America/Lima", label: "Perú", short: "PE" },
    { id: 6, value: "Asia/Pekín", label: "China", short: "CH" },
    { id: 7, value: "America/Mexico_City", label: "México", short: "MX" },
    { id: 8, value: "America/New_York", label: "EEUU", short: "US" },
    { id: 9, value: "America/Santiago", label: "Chile", short: "CL" },
    { id: 10, value: "America/Sao_Paulo", label: "Brasil", short: "BR" },
    { id: 11, value: "Asia/Bangkok", label: "Tailandia", short: "TH" },
    { id: 12, value: "Asia/Jakarta", label: "Indonesia", short: "ID" },
    { id: 13, value: "Asia/Kuala_Lumpur", label: "Malasia", short: "MY" },
    { id: 14, value: "Asia/Kolkata", label: "India", short: "IN" },
    { id: 15, value: "Asia/Seoul", label: "Corea del Sur", short: "KR" },
    { id: 16, value: "Asia/Shanghai", label: "China", short: "CN" },
    { id: 17, value: "Asia/Tokyo", label: "Japón", short: "JP" },
    { id: 18, value: "Australia/Sydney", label: "Australia", short: "AU" },
    { id: 19, value: "Europe/Berlin", label: "Alemania", short: "DE" },
    { id: 20, value: "Europe/London", label: "Reino Unido", short: "UK" },
    { id: 21, value: "Europe/Madrid", label: "España", short: "ES" },
    { id: 22, value: "Europe/Moscow", label: "Rusia", short: "RU" },
    { id: 23, value: "Europe/Paris", label: " Francia", short: "FR" },
    { id: 24, value: "Europe/Rome", label: "Italia", short: "IT" },
    { id: 25, value: "Europe/Stockholm", label: "Suecia", short: "SE" },
    { id: 26, value: "Europe/Zurich", label: "Suiza", short: "CH" },
    { id: 27, value: "Pacific/Auckland", label: "Nueva Zelanda", short: "NZ" },
    { id: 28, value: "", label: "Australia", short: "AU" },
];


export function setTimeZone(timeZone) {
    localStorage.setItem("timeZone", timeZone);
    return timeZone;
  }
  
  export function getTimeZone() {
    let timeZone = localStorage.getItem("timeZone");
    if (timeZone) {
      return timeZone;
    } else {
      timeZone = AllCountryWithTimeZone[0].label;
    }
    return timeZone;
  }
  export default AllCountryWithTimeZone;
  

// export function setTimeZone(timeZone) {
//   localStorage.setItem("timeZone", JSON.stringify(timeZone));
//   return timeZone;
// }

// export function getTimeZone() {
//   let timeZone = localStorage.getItem("timeZone");
//   if (timeZone) {
//     timeZone = JSON.parse(timeZone);
//   } else {
//     timeZone = AllCountryWithTimeZone[0];
//   }
//   return timeZone;
// }
// export default AllCountryWithTimeZone;
