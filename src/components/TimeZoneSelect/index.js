import React from 'react'
import AllCountryWithTimeZone, {
  getTimeZone,
  setTimeZone,
} from "../../helpers/countrys";
import {

    Select,

} from 'antd';
import {URL_BASE, URL_BASE_GOLANG, USER_LOADED} from "../../constants";
const {Option} = Select;
const SelectTimeZone = () => {
  let getTimeZoneUser = getTimeZone();  
  let user_slug = localStorage.getItem('username');

  return (
    <Select
      defaultValue={getTimeZoneUser}
      showSearch
      style={{ width: 120 }}
      onChange={  (e) =>  {

        setTimeZone(e);
        
      }}
    >
      {AllCountryWithTimeZone.map((country) => {
        return (
          <Option key={country.id} value={country.label}>
            {country.label}
          </Option>
        );
      })}
    </Select>
  );
};


export default SelectTimeZone;

