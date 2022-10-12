// EventCreateFastInput

import { Select } from 'antd';
import React,{useState} from 'react';
const { Option } = Select;
const children = [];

// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }


const EventCreateFastInput = (props) => {
    const {data,SetmenteesSelected} = props
children.push(data.map(c=>{
    return <Option key={c.id}>{c.first_name} {c.email}</Option>
}))
/**
 * I'm trying to get the selected values from the Select component and store them in a state variable.
 */
const handleChange = (value) => {

    
    // let a = value.map(c=>parseInt(c))
    //convertir todos los string que son numeros a int y dejar los string que no son numeros como estan
    let a = value.map(c=>{
        if(!isNaN(c)){
            return parseInt(c)
        }else{
            return c
        }
    })
    
    //eliminar valornes NaN

   
    SetmenteesSelected(a) 
    // SetmenteesSelected(value)
  };
  
 return(
    <Select
    mode="tags"
    style={{
      width: '100%',
    }}
    onChange={handleChange}
    tokenSeparators={[',']}
  >
    {children}
  </Select>
 )
};

export default EventCreateFastInput;