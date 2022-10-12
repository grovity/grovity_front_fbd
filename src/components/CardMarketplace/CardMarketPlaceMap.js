import React, {Fragment} from 'react'
import CardMarketplace from "./CardMarketPlace";



class CardMarketPlaceMap extends React.Component {
    
    render = (props) => {
        return (
            <Fragment>

                {
                    Array.isArray(this.props.mentores && this.props.mentores.results) ?
                        this.props.mentores.results.map(function (mentor) {
                            return <CardMarketplace mentor={mentor} key={mentor.id}/>;
                        })
                        : ""
                }
                
            </Fragment>
        )
    }
}

export default CardMarketPlaceMap
