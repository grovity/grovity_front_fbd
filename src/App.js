import InstitutionForm from "./components/FormRegisterInstitution/FormRegisterInstitution";
import Alert from "./components/Alerts/Alert";
import './components/styles/App.scss';
import '@mobiscroll/react/dist/css/mobiscroll.scss';
import {Fragment, useState, useEffect} from 'react'

import HomeInstitusionalContainer from "./containers/HomeInstitusionalContainer";
import RegisterProgramContainer from "./containers/RegisterProgramContainer";
import MentorshipContainerData from "./containers/MentorshipContainerData";
import MentorshipsContainer from "./containers/MentorshipsContainer";
import MentorContainerData from "./containers/MentorContainerData";
import ReportsContainer from "./containers/ReportsContainer";

import ReportEntityPerProgramContainer from "./containers/ReportEntityPerProgramContainer";


import HomeUserContainer from "./containers/HomeUserContainer";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MentorContainer from "./containers/MentorContainer";
import UsersContainer from "./containers/UsersContainer";
import UserContainer from "./containers/UserContainer";
import PrivateRoute from "./router/PrivateRouter";
import setAuthToken from "./helpers/setAuthToke";
import React from 'react';
import CalendarContainer from "./containers/CalendarContainer";
import FuncionariosContainer from "./containers/FuncionariosContainer";
import Checkbox from './components/Checkbox/Checkbox'
import Rating from "./components/Rating/Rating";
import FilterTable from "./components/FilterTable/FilterTable";
import NewUserEmprendedorFileContainer from "./containers/NewUserEmprendedorFileContainer";
import FilesContainer from "./containers/FilesContainer";
import Confirmation_mail from "./components/Confirmation_mail/Confirmation_mail"
import Integraciones from "./components/Integraciones/Integraciones";
import SoporteContainer from "./containers/SoporteContainer";
import NewFuncionarioFileContainer from "./containers/NewFuncionarioFileContainer";
import PostsContainer from "./containers/PostsContainer";
import PostContainer from "./containers/PostContainer";
import FilesContainer_user from "./containers/FilesContainer_user";
import {ToastContainer} from "react-toastify";
import FileAllContainer from "./containers/FileAllContainer";

import ThanksRegistration from "./pages/ThanksPages/ThanksRegistration";
import ThanksAfterForm from "./pages/ThanksPages/ThanksAfterForm";
import ThanksConfirmationEmail from "./pages/ThanksPages/ThanksConfirmEmail";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SingUp";
import EscuelaJuntas from "./pages/EscuelaJuntas/EscuelaJuntas";
import BootcampEmprendedores from "./pages/BootcampEmprendedores/BootcampEmprendedores";
import ThanksRegistrationJuntas from "./pages/ThanksPages/ThanksRegistrationJuntas";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad/PoliticaPrivacidad";
import CentroSoporte from "./pages/CentroSoporte/CentroSoporte";
import SoporteVideos from "./pages/CentroSoporte/SoporteVideos";
import NotFound from './pages/ErrorPages/NotFound';
import SomethingWentWrong from './pages/ErrorPages/SomethingWentWrong';
import JuntasAsesoras from "./pages/JuntasAsesoras/JuntasAsesoras";
import ThanksJuntasAsesoras from './pages/ThanksPages/ThanksJuntasAsesoras';
import SesionProgramada from './pages/SesionProgramada/SesionProgramada';

import Video from "./components/Video/Video";
import Marketplace from "./pages/Marketplace/Marketplace";
import UserContainerData from "./containers/UserContainerData";
import SesionNo from "./pages/SesionProgramada/SesionNo";
import ChangePassSection from "./components/ChangePassSection/ChangePassSection";

import Home3 from './pages/Home3/Home3';

import ProgramEmprendedor from "./pages/ProgramEmprendedor/ProgramEmprendedor";
import PlanTrabajoMenEnti from './pages/PlanTrabajoMenEnti/PlanTrabajoMenEnti';
import ProgramsEntidad from "./pages/ProgramsEntidad/ProgramsEntidad";
import MentorsEntidad from "./pages/MentorsEntidad/MentorsEntidad";
import EmpresaUser from "./pages/EmpresaUser/EmpresaUser";
import Dashboard from "./pages/DashboardUsuario/Dashboard";
import SalesForce from "./components/SalesForce/SalesForce";
import HomeEco from './pages/HomeEco/HomeEco';
import SalesForceError from "./components/SalesForceError/SalesForceError";

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

function App() {
    const [theme, setTheme] = useState(()=> localStorage.getItem('theme'));
    const [count, setCount] = useState(0);

    useEffect(() => {
       const tema = localStorage.getItem('theme');
       setTheme(tema);

       if (count > 0) {
              let theme_name = 'grovity';

              if (tema === 'davivienda') {
                     theme_name = tema;
              }
              document.getElementsByTagName('html')[0].classList.add(theme_name);
       } else {
              // Cuando no existe tema en el local storage igual vuelve a llamar el useEffect
              setTheme('');
       }

       setCount((c) => c + 1);
    }, [theme])

    return (
        <Fragment>
            <BrowserRouter>
                <Alert/>
                <Switch>
                    <Route exact path="/salesforce/:id"
                           render={props => <SalesForce {...props} id={props.match.params.id}/>}/>
                           <Route exact path='/salesforce/error' component={SalesForceError}/>
                    <Route exact path="/salesforce"
                           render={props => <SalesForce {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/confirmation_mail" component={Confirmation_mail}/>
                    <Route exact path="/marketplace" component={Marketplace}/>
                    {/*<Route exact path="/escuela" component={EscuelaJuntas}/>*/}
                    <Route exact path="/user/mentor/:id"
                           render={props => <UserContainer {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/user/detail/:id"
                           render={props => <UserContainerData {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/user/user/detail/:id"
                           render={props => <UserContainerData {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/users/users/detail/:id"
                           render={props => <UserContainerData {...props} id={props.match.params.id}/>}/>


                    <PrivateRoute exact path="/posts" component={PostsContainer}/>

                    <PrivateRoute exact path="/user/files" component={FileAllContainer}/>
                    <PrivateRoute exact path="/table" component={FilterTable}/>
                    <Route exact path="/checkbox" component={Checkbox}/>
                    <Route exact path="/rating" component={Rating}/>
                    <PrivateRoute exact path="/institution" component={HomeInstitusionalContainer}/>
                    <PrivateRoute exact path="/posts" component={PostsContainer}/>
                    <PrivateRoute exact path="/empresa" component={EmpresaUser}/>
                    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/dashboard/:id"
                           render={props => <Dashboard {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/empresa/:id"
                           render={props => <EmpresaUser {...props} id={props.match.params.id}/>}/>
                    <PrivateRoute exact path="/user" component={HomeUserContainer}/>
                    <Route exact path="/institutions/new" component={InstitutionForm}/>
                    <PrivateRoute exact path="/programs/programs/new" component={RegisterProgramContainer}/>
                    <PrivateRoute exact path="/funcionarios/funcionarios/file/new"
                                  component={NewFuncionarioFileContainer}/> 
                    <PrivateRoute exact path="/users/users/file/new" component={NewUserEmprendedorFileContainer}/>
                    <PrivateRoute exact path="/users/file/new" component={NewUserEmprendedorFileContainer}/>
                    <PrivateRoute exact path="/mentors" component={MentorsEntidad}/>
                    <PrivateRoute exact path="/users" component={UsersContainer}/>
                    <PrivateRoute exact path="/user/users" component={UsersContainer}/>
                    <PrivateRoute exact path="/funcionarios" component={FuncionariosContainer}/>
                    <PrivateRoute exact path="/calendar" component={CalendarContainer}/>
                    <PrivateRoute exact path="/programs" component={ProgramsEntidad}/>
                    <PrivateRoute exact path="/reports" component={ReportsContainer}/>
                    <PrivateRoute exact path="/reports/resumen-entidad-por-programa"
                                  component={ReportEntityPerProgramContainer}/>
                    <Route exact path="/programs/programs/mentorships/:id"
                           render={props => <MentorshipsContainer {...props} id={props.match.params.id}/>}/>

                    <Route exact path="/" component={Home3}/>
                    <Route exact path="/software-para-aceleradoras" component={HomeEco}/>
                    
                    <Route exact path="/gracias" component={ThanksAfterForm}/>
                    <Route exact path="/gracias-escuela-juntas" component={ThanksRegistrationJuntas}/>
                    <Route exact path="/registro-exitoso" component={ThanksRegistration}/>
                    <Route exact path="/email-confirmacion" component={ThanksConfirmationEmail}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/sign-up" component={SignUp}/>
                    <Route exact path="/escuela-juntas" component={EscuelaJuntas}/>
                    <Route exact path="/bootcamp" component={BootcampEmprendedores}/>
                    <Route exact path="/politica-privacidad" component={PoliticaPrivacidad}/>
                    <Route exact path="/juntas-asesoras" component={JuntasAsesoras}/>
                    <Route exact path="/gracias-juntas-asesoras" component={ThanksJuntasAsesoras}/>
                    <Route exact path="/politica-privacidad" component={PoliticaPrivacidad}/>
                    <Route exact path="/centro-soporte" component={CentroSoporte}/>
                    <Route exact path="/videos-soporte" component={SoporteVideos}/>
                    <Route exact path="/500" component={SomethingWentWrong}/>
                    <Route exact path="/sesion-programada" component={SesionProgramada}/>
                    <Route exact path="/sesion-no" component={SesionNo}/>
                    <Route exact path="/programs/programs/:id"
                           render={props => <ProgramEmprendedor {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/plan/:id/:id_program"
                           render={props => <PlanTrabajoMenEnti {...props} id={props.match.params.id}
                                                                id_program={props.match.params.id_program}/>}/>
                    <Route path="/user/:id"
                           render={props => <UserContainer {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/mentors/mentors/:id/edit"
                           render={props => <MentorContainer {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/programs/programs/mentorships/mentorships/:id/data"
                           render={props => <MentorshipContainerData {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/mentors/mentors/:id/data"
                           render={props => <MentorContainerData {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/programs/programs/mentorships/mentorships/:id_m/mentors/:id/data"
                           render={props => <MentorContainerData {...props} id_m={props.match.params.id_m}
                                                                 id={props.match.params.id}/>}/>
                    <Route path="/users/users/:id"
                           render={props => <UserContainer {...props} id={props.match.params.id}/>}/>
                    <Route path="/users/:id"
                           render={props => <UserContainer {...props} id={props.match.params.id}/>}/>
                    <Route path="/confirmation/users/:id"
                           render={props => <UserContainer {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/user_confirmation/:id"
                           render={props => <ThanksRegistration {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/change_password"
                           render={props => <ChangePassSection {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/integraciones"
                           render={props => <Integraciones {...props} id={props.match.params.id}/>}/>
                    <Route exact path="/soporte"
                           render={props => <SoporteContainer {...props} id={props.match.params.id}/>}/>
                    <Route path="/calendar/event/files/:id"
                           render={props => <FilesContainer {...props} id={props.match.params.id}/>}/>
                    <Route path="/files/user/:id"
                           render={props => <FilesContainer_user {...props} id={props.match.params.id}/>}/>
                    <Route path="/posts/:id"
                           render={props => <PostContainer {...props} id={props.match.params.id}/>}/>
                    <Route path="/video/:id"
                           render={props => <Video {...props} id={props.match.params.id}/>}/>
                    <Route component={NotFound}/>

                    
                </Switch>

            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        </Fragment>
    );
}

export default App;