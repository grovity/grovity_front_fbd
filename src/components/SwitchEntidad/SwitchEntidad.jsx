import React, { Fragment, useEffect, useState } from "react";
import {

  Switch,
} from "antd";
import "./scss/component-sm.scss";
import "./scss/component-md.scss";
import "./scss/component-lg.scss";
import PropTypes from "prop-types";
import {URL_BASE} from '../../constants'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {fetchUser} from "../../actions/fetchUsers";
import {loadUser} from "../../actions/auth";



const SwitchEntidad = (props) => {
  const { programs, entidad, id_entidad, mentorships } = props;
  const [isEntidad , setIsEntidad] = useState(props.auth.user[0].entidad_entidad ? true : false)
  
  const loginSwithEntidad = async (data) => {
    let payload =  await props.fetchUser()
    await props.loadUser()

    window.location.reload()
    if (payload) {
     if (!data.mentor) {
          localStorage.setItem("entidad", true);
          localStorage.setItem("mentor", false);
 
          window.location.replace("/institution");

        } else {
          localStorage.setItem("entidad", false);
          localStorage.setItem("mentor", true);
          //if url  is /institution  redirect to /user
          window.location.replace("/user");
         
        }
      
    }
  };
  const changeEntidad = async () => {
    fetch(`${URL_BASE}/usuario/switchusertype/`, {
      headers: new Headers({
        Authorization: `Token ${localStorage.getItem("token")}`,
      }),

      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsEntidad(!isEntidad)
        console.log("Success:");
        loginSwithEntidad(data)
    
    

      });
  };
  useEffect(() => {}, []);

  return (
    <>
      <Switch className="sw" checked={isEntidad} onChange={changeEntidad} size="default" />
    </>
  );
};

SwitchEntidad.propTypes = {};

SwitchEntidad.defaultProps = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, {fetchUser,loadUser})(SwitchEntidad));
