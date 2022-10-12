import {fetchCalifiacionbyMentor} from "../../actions/fetchMentors";
import React, {Component, Fragment} from "react";
import mobiscroll from "@mobiscroll/react";
import {connect} from "react-redux";
import ModalReviews from "../ModalEvent/ModalReviews";

class RatingMentor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calificacion: 0,
        };
    }

    async componentDidMount() {



    }

    handleSubmit = (values) => {
        this.setState({
            calificacion: values,
        })
    }



    render() {
        return (
            <div className='text-center' style={{marginBottom: '2%'}}>
                <span>De 1 a 5 ¿Qué tan satisfecho quedó con la mentoría?:</span>
                <mobiscroll.Rating className='pt-0 pb-0' onChange={this.props.calificacion}/>
            </div>
        )
    }
}

export default connect(null, {fetchCalifiacionbyMentor})(RatingMentor);