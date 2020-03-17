import React from 'react';
import { fileLawsuit, getCourts, getLawyer } from '@/api/data';
import { Card, Loading, Button, Title, Input } from '@/components/ui';
import PrivateLayout from '@/components/layouts/privateLayout';

import store from '@/store';

class FileLawsuit extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: false, ...store.getState() };

        this.handleData = this.handleData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.file = this.file.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.handleData();
    }

    async handleData() {
        const { user } = this.state;
        const citizenID = user.citizenID;
        const courts = await getCourts();
        const lawyers = await getLawyer(citizenID);

        this.setState({ courts, lawyers });

        this.setState({ isLoading: false });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async file() {
        console.log(this.state);
        const credentials = this.state;
        const result = await fileLawsuit(credentials);

        if (result.response && result.response.status === 400) {
            console.log("Error: ", result.response.data);
            return;
        }

        if (result.config || result.request || result.response) {
            console.log("Error: ", result.request.status, result.request.statusText);
            return;
        }

        if (result.query) {
            alert("Lawsuit is succesfully filed!");
            this.props.history.push('/displayLawsuits');
            return;
        }
    }

    render() {
        const { userType, isLoading, courts, lawyers } = this.state;

        return (
            <div className="flex flex-col justify-center items-center mt-20 text-center overflow-y-auto">
                <div className="w-10/12 flex">
                    <Title type="h3">File Lawsuit</Title>
                </div>

                <Card applyPadding={false} extraClassName="w-10/12" shadow="md">
                    {
                        isLoading ? <Loading /> :
                            <div className="flex w-full justify-center my-2">
                                <div className="flex flex-col w-4/12 items-center">
                                    <div className="flex justify-between items-center w-full my-4">
                                        <p>Court: </p>
                                        <select name="courtID" onChange={this.onChange}>
                                            <option value="">Please select a lawsuit type</option>
                                            {courts ? courts.map(court => {
                                                return (<option value={court.courtID}>{court.type + " -------- " + court.city}</option>);
                                            })
                                                : null
                                            }
                                        </select>
                                    </div>

                                    {userType === "lawyer" ?
                                        <div className="flex justify-between items-center w-full my-4">
                                            <p>Client: </p>
                                            <Input type="client" size="medium" placeholder="Client" onChange={this.onChange} />
                                        </div>
                                        : null
                                    }

                                    <div className="flex justify-between items-center w-full my-4">
                                        <p>For whom: </p>
                                        <Input name="forWhom" size="medium" placeholder="For whom" onChange={this.onChange} />
                                    </div>

                                    {userType === "citizen" ?
                                        <div className="flex justify-between items-center w-full my-4">
                                            <p>Lawyer: </p>
                                            <select name="lawyer" onChange={this.onChange}>
                                                <option value="">Please select a lawyer</option>
                                                {lawyers ? lawyers.map(lawyer => {
                                                    return (<option value={lawyer.barID}>{lawyer.name}</option>);
                                                })
                                                    : null
                                                }
                                            </select>
                                        </div>
                                        : null
                                    }

                                    <div className="flex justify-between w-full my-4">
                                        <p>Claim: </p>
                                        <textarea name="claim" rows="5" cols="50" onChange={this.onChange} className="border ml-4">Please, enter your claim.</textarea>
                                    </div>

                                    <Button onClick={this.file} label="File" />
                                </div>
                            </div>
                    }
                </Card>
            </div >
        );
    }
}

export default PrivateLayout(FileLawsuit);