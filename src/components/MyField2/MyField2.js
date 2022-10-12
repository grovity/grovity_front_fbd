import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const MyField = ({
                            input,
                            meta: {touched, error, warning},
                            type,
                            label,
                            name,
                            placeholder
                        }) => (
    <div>
        <input {...input} placeholder={placeholder} type={!type ? "text" : type}/>

        {

            touched && ((error &&
                <span className="errorForms"><FontAwesomeIcon className="errorForms" icon={faExclamationCircle}/>{error}</span>) ||
                (warning && <span>{error}</span>))
        }
    </div>
);