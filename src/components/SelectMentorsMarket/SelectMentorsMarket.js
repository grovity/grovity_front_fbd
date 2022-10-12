import React from 'react'

import {Select, Spin, Button} from 'antd';
import debounce from 'lodash/debounce';
import {URL_BASE} from "../../constants";
import {toast} from "react-toastify";

const {Option} = Select;

class SelectMentorsMarket extends React.Component {
    constructor(props) {
        super(props);
        this.lastFetchId = 0;
        this.fetchUser = debounce(this.fetchUser, 800);
    }

    state = {
        data: [],
        value: [],
        fetching: false,
        info: []
    };

    fetchUser = async (value) => {
        // console.log('fetching user', value);
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({data: [], fetching: true});
        const request = await fetch(`${URL_BASE}/entidad/${this.props.id}/mentor`, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`
            }),
            method: 'GET'
        });
        const json = await request.json()

        if (fetchId !== this.lastFetchId) {
            // for fetch callback order
            return;
        }
        const data = json.mentor.map(user => ({
            text: `${user.email} ${user.first_name} ${user.last_name}`,
            value: user.id,
        }));
        this.setState({data, fetching: false});
    };

    handleChange = value => {
        this.setState({
            value,
            data: [],
            fetching: false,
            info: value,
        });
    };

    sendMentors = async () => {
        // console.log(this.state.info)
        let marketplace_mentores = []
        if (Array.isArray(this.state.info)) {
            this.state.info.map(user =>
                marketplace_mentores.push(user.value)
            )
        } else {
            toast.error('Ingrese por favor al menos un mentor')
        }
        const request = await fetch(`${URL_BASE}/entidad/${this.props.id}/marketplace/mentores`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({marketplace_mentores}),
        });
        if (request.status === 200) {
            toast.success('Menores enviados correctamente')
        } else {
            toast.error('Error al enviar los mentores, por favor intente nuevamente')
        }
    }

    render() {
        const {fetching, data, value} = this.state;
        return (
            <div>
                <Select
                    mode="multiple"
                    labelInValue
                    value={value}
                    placeholder="Ingrese correos de mentores para publicar en el marketplace de Grovity"
                    notFoundContent={fetching ? <Spin size="small"/> : null}
                    filterOption={false}
                    onSearch={this.fetchUser}
                    onChange={this.handleChange}
                    style={{width: '100%'}}
                >
                    {data.map(d => (
                        <Option key={d.value}>{d.text}</Option>
                    ))}
                </Select>
                <div className='mt-2'>
                    <Button onClick={this.sendMentors}>Enviar</Button>
                </div>

            </div>
        );
    }
}

export default SelectMentorsMarket