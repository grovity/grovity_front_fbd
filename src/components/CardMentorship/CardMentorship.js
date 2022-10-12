import getUrlMentorshipByTitle from "../../services/getUrlMentorshipByTitle";
import CardMentoria from "../CardMentoria/CardMentoria";
import React, {Component} from "react";
import {Col} from "reactstrap";
import "./style.css"

export const url_base_weather = "http://api.openweathermap.org/data/2.5/weather";
export const api_key = "c9fd696f9f5df5dd30f23c7c59550c0c";

const data = {
    tema: "Inicio de negocio",
    lastname: "Cano",
    name: "Alejo",
};

class CardMentorship extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name_mentorship: this.props.acc,
            data: data
        };


    }

    getWeatherState = weather_data => {
        return "soleado"
    };

    getData = weather_data => {
        const weatherState = this.getWeatherState(weather_data);
        const {humidity, temp} = weather_data.main;
        const city = weather_data.name;

        return {
            name: humidity,
            lastname: temp,
            tema: weatherState,
            city: city
        };
    };

    componentDidMount() {
        this.handleUpdateClick();
    }

    handleUpdateClick = () => {
        const api_weather = getUrlMentorshipByTitle(this.state.name_mentorship);

        fetch(api_weather).then(resolve => {
            return resolve.json();
        }).then(data => {
            const newMentor = this.getData(data);

            this.setState({
                data: newMentor
            });
        }).catch(
            function (re) {
                console.log(re)
            });
    };


    render() {
        const {onCardMentoriaClick} = this.props;

        return (
            <Col md="4" sm="12" className="p-0">
                <CardMentoria data={this.state.data}/>
                <button onClick={onCardMentoriaClick}>click</button>
                <button onClick={this.handleUpdateClick} className="apiweather">EMPEZAR</button>
            </Col>
        )
    }
}

export default CardMentorship;