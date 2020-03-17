import React from 'react';
import { getLawyers, hireLawyer } from '@/api/data';
import { Card, Loading, Button, Title } from '@/components/ui';
import PrivateLayout from '@/components/layouts/privateLayout';

import store from '@/store';

class HireLawyer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            error: null,
            ...store.getState()
        };

        this.handleData = this.handleData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hire = this.hire.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.handleData();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleData() {
        const lawyers = await getLawyers();
        this.setState({ lawyers });
        this.setState({ isLoading: false });
    }

    async hire() {
        const { barID } = this.state;

        if (!barID || barID < 0) {
            const error = "Invalid lawyer type!";
            this.setState({ error });
            return;
        }

        const result = await hireLawyer(barID);

        if (result.query) {
            alert("Lawyer successfully hired!");
            return;
        }

        if (result.response && result.response.status === 400) {
            if (result.response.data.result.errno === 1062) {
                alert("Lawyer has been already hired!");
                return;
            }

            return;
        }
    }

    render() {
        const { lawyers, isLoading } = this.state;

        return (
            <div className="flex flex-col justify-center items-center text-center overflow-y-auto h-full">
                <div className="w-10/12 flex">
                    <Title type="h3">Hire a Lawyer</Title>
                </div>

                <Card applyPadding={false} extraClassName="w-10/12" shadow="md">
                    {
                        isLoading ? <Loading /> :
                            <div className="flex w-full my-2">
                                <div className="flex justify-between w-full p-2">
                                    <select name="barID" onChange={this.onChange}>
                                        <option value="">Please select a lawyer</option>
                                        {lawyers ? lawyers.map(key => {
                                            return (
                                                <option value={key.barID}>{key.name}</option>
                                            );
                                        })
                                            : null
                                        }
                                    </select>

                                    <Button onClick={this.hire} size="large" label="Hire" />

                                </div>
                            </div>
                    }
                </Card>
            </div>
        );
    }
}

export default PrivateLayout(HireLawyer);
