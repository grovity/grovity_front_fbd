import React, {Component} from "react";
import NavBar from "../../components/NavBar/NavBar";
import {enquireScreen} from 'enquire-js';
import BannerBootcamp from "../../components/BannerBootcamp/BannerBootcamp";
import Footer from "../../components/Footer/Footer";
import DescripcionBootcamp from "../../components/DescripcionBootcamp/DescripcionBootcamp";
import ObjetivosBootcamp from "../../components/ObjetivosBootcamp/ObjetivosBootcamp";
import BootcampPodra from "../../components/BootcampPodra/BootcampPodra";
import AprenderaBootcamp from "../../components/AprenderaBootcamp/AprenderaBootcamp";
import TrainersBootcamp from "../../components/TrainersBootcamp/TrainersBootcamp";
import CallToActionBootcamp from "../../components/CallToActionBootcamp/CallToActionBootcamp";
import ContadorBootcamp from "../../components/ContadorBootcamp/ContadorBootcamp";

let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});


class BootcampEmprendedores extends Component {
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
                <BannerBootcamp
                    msg="Lanza y valida tu Startup en 8 semanas. Sé parte del Bootcamp de emprendimiento"
                    submsg="Bootcamp de Emprendimiento"
                    key="banner"
                    isMobile={this.state.isMobile}
                    navToShadow={this.navToShadow}/>
                <DescripcionBootcamp descripcion1='“De cero a tus primeras ventas. Un programa con una 
                                                        metodología innovadora y mentores expertos para cada etapa”'
                />
                <ObjetivosBootcamp objetivos=' Ayudar a los emprendedores que están en etapa inicial a arrancar 
                                                    su Startup optimizando sus recursos y probando en el mercado con ventas reales'
                                        dirigido="Emprendedores que están iniciando su empresa y buscan una metodología 
                                                sencilla de validación y experimentación"
                                        metodologia="1 mentoría grupal  ONLINE cada semana con un Mentor experto que asignará retos 
                                                que deben completarse en el tiempo acordado"
                                        key="objetivos-escuela" isMobile={this.state.isMobile}
                />
                <BootcampPodra podra1="Lanzar tu Startup rápidamente"
                                podra2="Crear el mejor modelo de negocio para tu idea" 
                                podra3="Crear un MVP (mínimo producto viable) utilizando tecnología Lean (sencilla)"
                                podra4="Validar tu idea de negocio con tus primeras ventas" 
                                podra5="Crear una estrategia para vender rápidamente tu servicio o producto" 
                                podra6="Conocer emprendedores como tú que están iniciando" 
                                podra7="Rodearte de Mentores expertos y una comunidad de apoyo constante" 
                                key="bootcamp-podra" isMobile={this.state.isMobile}/>
                <AprenderaBootcamp aprendera1='Cómo validar tu idea de negocio rápidamente en el mercado'
                                aprendera2='Cómo estructurar un modelo de negocio adecuado para tu Startup'
                                aprendera3='Cómo realizar tus primeras ventas'
                                aprendera4='Cómo analizar el mercado y detectar oportunidades'
                                aprendera5='Cómo crear un producto mínimo viable utilizando 
                                tecnología sencilla o sin ser experto en programación'
                                aprendera6='Y mucho, mucho más'
                                key="mentoresSection" isMobile={this.state.isMobile}/>
                <ContadorBootcamp inicio="Iniciamos en..."
                                    preventa="Aprovecha el precio especial de lanzamiento:"
                                    // preventa="Aprovecha el precio de Preventa hasta el 16 de septiembre:"
                                    preventaPrecio="$660.000"
                                    // inscripcion="La preventa acaba en:"
                                    segundaFecha="Del 17 al 20 de Septiembre $860.000"
                                    terceraFecha="Del 21 al 23 de Septiembre $1.038.000"
                                    />
                <TrainersBootcamp/>
                <CallToActionBootcamp cupos="Cupos LIMITADOS"
                                    accede="Accede YA al Bootcamp y lanza y valida tu Startup en 8 semanas"/>
                <Footer key="footer" isMobile={this.state.isMobile}/>
            </React.Fragment>

        );
    }
}

export default BootcampEmprendedores;