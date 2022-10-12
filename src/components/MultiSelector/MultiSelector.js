import React from 'react';
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.scss';


class MultiSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{
                value: 1,
                text: 'Books'
            }, {
                value: 2,
                text: 'Movies, Music & Games'
            }, {
                value: 3,
                text: 'Electronics & Computers'
            }, {
                value: 4,
                text: 'Home, Garden & Tools'
            }, {
                value: 5,
                text: 'Health & Beauty'
            }, {
                value: 6,
                text: 'Toys, Kids & Baby'
            }, {
                value: 7,
                text: 'Clothing & Jewelry'
            }, {
                value: 8,
                text: 'Sports & Outdoors'
            }, {
                value: 9,
                text: 'Automotive & Industrial'
            }],
            names: [{
                value: 0,
                group: 'A',
                text: 'Adaline Shiver'
            }, {
                value: 1,
                group: 'A',
                text: 'Adella Cornell'
            }, {
                value: 2,
                group: 'A',
                text: 'Adolph Scriber'
            },
                {
                    value: 78,
                    group: 'B',
                    text: 'Barbara Mackay'
                }, {
                    value: 79,
                    group: 'B',
                    text: 'Barbera Phu'
                }, {
                    value: 80,
                    group: 'B',
                    text: 'Barbie Kaczorowski'
                }, {
                    value: 81,
                    group: 'B',
                    text: 'Barney Flurry'
                },
                // Showing partial data. Download full source.
            ]
        };
    }


    render() {
        // console.log(this.state.items)
        // console.log(typeof (this.state.items))

        return (
            <mobiscroll.Form inputStyle="box" labelStyle="stacked" theme="mobiscroll">
                <div id="content" className="mbsc-grid">
                    <mobiscroll.FormGroup className="mbsc-row">
                        <div className="mbsc-col-sm-12 mbsc-col-md-6">
                            <div className="mbsc-form-group-title">Desktop</div>
                            <div className="mbsc-row mbsc-form-grid">
                                <div className="mbsc-col-12">
                                    <label>
                                        Multi-select
                                        <mobiscroll.Select
                                            select="multiple"
                                            touchUi={false}
                                            value={[3, 4]}
                                            data={this.state.items}
                                        />
                                    </label>
                                </div>
                                <div className="mbsc-col-12">
                                    <label>
                                        With group wheel
                                        <mobiscroll.Select
                                            display="bubble"
                                            touchUi={false}
                                            select="multiple"
                                            group={true}
                                            groupLabel="&nbsp;"
                                            minWidth={[60, 320]}
                                            value={[1, 2, 80]}
                                            data={this.state.names}
                                        />
                                    </label>
                                </div>
                                <mobiscroll.Datetime dateWheels="|D M d|" value={this.state.date}
                                                     onSet={this.onSetDate}>
                                    <mobiscroll.Input>Date object</mobiscroll.Input>
                                </mobiscroll.Datetime>
                            </div>
                        </div>
                    </mobiscroll.FormGroup>
                </div>
            </mobiscroll.Form>
        );
    }
}

export default MultiSelector