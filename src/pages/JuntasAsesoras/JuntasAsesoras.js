import React, {Component} from "react";
import {enquireScreen} from 'enquire-js';
import StartupsJuntas from '../../components/StartupsJuntas/StartupsJuntas';
import BannerJuntasAsesoras from '../../components/BannerJuntasAsesoras/BannerJuntasAsesoras';
import Footer from "../../components/Footer/Footer";
import DescripcionBootcamp from "../../components/DescripcionBootcamp/DescripcionBootcamp";
import ObjetivosBootcamp from "../../components/ObjetivosBootcamp/ObjetivosBootcamp";
//import AprenderaBootcamp from "../../components/AprenderaBootcamp/AprenderaBootcamp";
import CallToActionBootcamp from "../../components/CallToActionBootcamp/CallToActionBootcamp";
//import ContadorBootcamp from "../../components/ContadorBootcamp/ContadorBootcamp";
import NavBar from "../../components/NavBar/NavBar";
import JuntasAsesorasPodra from '../../components/JuntasAsesorasPodra/JuntasAsesorasPodra';

let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});


class JuntasAsesoras extends Component {
    state = {
        isMobile,
        showShadow: false,
    };

    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });
        });
    }

    navToShadow = (e) => {
        this.setState({showShadow: e.mode === 'leave'});
    }

    render() {
        return (
            <React.Fragment>
                <NavBar key="header" className={this.state.showShadow ? 'show-shadow' : ''}></NavBar>
                <BannerJuntasAsesoras
                    msg="Toma mejores decisiones en tu Startup. Te ayudamos a formar una junta asesora con expertos senior"
                    submsg="Programa de Juntas Asesoras"
                    key="banner"
                    isMobile={this.state.isMobile}
                    navToShadow={this.navToShadow}/>
                <DescripcionBootcamp descripcion1='¿Te imaginas cómo cambiaría tu Startup si asesores expertos te ayudaran a tomar las mejores decisiones?'
                >
                </DescripcionBootcamp>
                <ObjetivosBootcamp objetivos='Ayudar a las Startups a formar una junta asesora que impulse su crecimiento'
                                        dirigido="Startups y empresas que estén creciendo y necesiten asesores aliados"
                                        metodologia="Las juntas asesoras se reúnen con las Startups cada mes para apoyar 
                                        estrategias y pensar nuevas formas de crecer. Puedes acceder a 6 o 12 juntas al año"
                                        key="objetivos-escuela" isMobile={this.state.isMobile}>
                </ObjetivosBootcamp>
                <JuntasAsesorasPodra podra1="Formar una junta asesora de expertos"
                                podra2="Tener más información y perspectiva para tomar mejores decisiones" 
                                podra3="Analizar mejor el mercado y encontrar oportunidades de innovación"
                                podra4="Crear metodologías para lanzar nuevos productos al mercado" 
                                key="con-juntas-podra" isMobile={this.state.isMobile}/>
                {/* <AprenderaEscuela aprendera1='Relación entre la JD, la Gestión con la Asamblea'
                                aprendera2='Tamaño, conformación, diseño y funcionamiento de la Junta '
                                aprendera3='Decisiones críticas'
                                aprendera4='Virtualización del Gobierno Corporativo'
                                aprendera5='Soft Skills'
                                aprendera6='Orientación estratégica'
                                aprendera7='El rol de los miembros independientes'
                                aprendera8='Presentación de informes a la junta directiva'
                                aprendera9='La participación del Gerente y otros ejecutivos'
                                aprendera10='El rol de las mujeres en las Juntas'
                                aprendera11='Effective Meetings'
                                aprendera12='Manejo de conflictos de interés'
                                />

                <ContadorEscuelaJuntas inicio="Iniciamos el 16 de Octubre"
                                    preventa="Aproveche el precio de preventa hasta el 14 de Octubre:"
                                    preventaPrecio="$3.800.000 COP + IVA"
                                    // preventaPrecio="$3.230.000 COP + IVA"
                                    inscripcion="La preventa acaba en:"
                                    segundaFecha="Del 17 al 22 de Septiembre $3.800.000 COP + IVA"
                                    terceraFecha="Del 26 al 30 de Septiembre $4.200.000 COP + IVA"/> */}

                <StartupsJuntas key="startups-juntas" isMobile={this.state.isMobile}/>
                <CallToActionBootcamp cupos="¿Una junta asesora es lo que necesitas?"
                                    accede="Regístrate y obtén un diagnóstico gratuito de tu empresa"
                                    boton="OBTENER MI DIAGNÓSTICO"/>
                <Footer key="footer" isMobile={this.state.isMobile}/>
            </React.Fragment>

        );
    }
}

export default JuntasAsesoras;