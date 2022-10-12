import React from 'react'
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'


const LogoSidebar = ({logo, logoClass}) => {
    return (
        <div id={!logoClass ? 'icono-sidebar' : 'icono-sidebar-fbd' }>
            <img src={logo} alt='Home'/>
        </div>
    )
}

export default LogoSidebar