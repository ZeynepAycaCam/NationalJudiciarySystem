import React from 'react';
import { getConciliators, getLawyersViaLawsuitID, finalize, assignConciliator, postpone } from '@/api/data';
import { Card, Loading, Link, Title, Button, Input } from '@/components/ui';
import PrivateLayout from '@/components/layouts/privateLayout';

import store from '@/store';

class EditLawsuit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lawsuitID: this.props.match.params.lawsuitID,
            isLoading: false,
            ...store.getState()
        };

        this.onChange = this.onChange.bind(this);
        this.handleData = this.handleData.bind(this);
        this.openFinalizeTab = this.openFinalizeTab.bind(this);
        this.openAssignTab = this.openAssignTab.bind(this);
        this.openPostponeTab = this.openPostponeTab.bind(this);

        this.finalizeLawsuit = this.finalizeLawsuit.bind(this);
        this.assignConciliatorLawsuit = this.assignConciliatorLawsuit.bind(this);
        this.postponeLawsuit = this.postponeLawsuit.bind(this);
    }

    componentDidMount() {
        const lawsuitID = this.props.match.params.lawsuitID;

        if (lawsuitID < 0) {
            this.props.history.push('/displayLawsuits');
            return;
        }

        const { userType } = store.getState();

        if (userType !== "judge") {
            this.props.history.push('/detailLawsuit/' + lawsuitID);
        }

        this.setState({ isLoading: true });
        this.handleData();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleData() {
        const { lawsuitID } = this.state;
        const conciliators = await getConciliators();
        const lawyers = await getLawyersViaLawsuitID(lawsuitID);

        this.setState({ conciliators, lawyers });
        this.setState({ isLoading: false });
    }

    openFinalizeTab() {
        const finalizeTab = document.getElementById('finalizeTab');
        finalizeTab.style.display = "block";

        const assignTab = document.getElementById('assignTab');
        assignTab.style.display = "none";

        const postponeTab = document.getElementById('postponeTab');
        postponeTab.style.display = "none";
    }

    openAssignTab() {
        const finalizeTab = document.getElementById('finalizeTab');
        finalizeTab.style.display = "none";

        const assignTab = document.getElementById('assignTab');
        assignTab.style.display = "block";

        const postponeTab = document.getElementById('postponeTab');
        postponeTab.style.display = "none";
    }

    openPostponeTab() {
        const finalizeTab = document.getElementById('finalizeTab');
        finalizeTab.style.display = "none";

        const assignTab = document.getElementById('assignTab');
        assignTab.style.display = "none";

        const postponeTab = document.getElementById('postponeTab');
        postponeTab.style.display = "block";
    }

    async finalizeLawsuit() {
        const { lawsuitID, claimText, lawyerID } = this.state;
        const result = await finalize(lawsuitID, claimText, lawyerID);
        
        if (result.query) {
            alert("Lawsuit is succesfully closed!");
            this.props.history.push('/detailLawsuit/' + lawsuitID);
            return;
        }
    }

    async assignConciliatorLawsuit() {
        const { lawsuitID, conciliatorID } = this.state;
        const result = await assignConciliator(lawsuitID, conciliatorID);
        
        if (result.query) {
            alert("Conciliator is successfully assigned!");
            this.props.history.push('/detailLawsuit/' + lawsuitID);
            return;
        }
    }

    async postponeLawsuit() {
        const { lawsuitID, postponeDate } = this.state;
        const result = await postpone(lawsuitID, postponeDate);
        
        if (result.query) {
            alert("Lawsuit is succesfully postponed!");
            this.props.history.push('/detailLawsuit/' + lawsuitID);
            return;
        }
    }

    render() {
        const { isLoading, lawsuitID, conciliators, lawyers } = this.state;

        return (
            <div className="flex flex-col justify-center items-center text-center">
                <div className="flex justify-between items-end w-10/12">
                    <Title type="h3">Edit Lawsuit</Title>
                    <Link url={"/detailLawsuit/" + lawsuitID} size="large" extraClassName="pr-2">Back</Link>
                </div>

                <Card applyPadding={false} extraClassName="w-10/12" shadow="md">
                    {
                        isLoading ? <Loading /> :
                            <div className="flex flex-col w-full">
                                <div className="flex w-full border-b overflow-hidden bg-transparent">
                                    <Button onClick={this.openFinalizeTab} label="Finalize" groupOrder="middle" styleType="outline" size="large" />
                                    <Button onClick={this.openAssignTab} label="Assign Conciliator" groupOrder="middle" styleType="outline" size="large" />
                                    <Button onClick={this.openPostponeTab} label="Postpone" groupOrder="middle" styleType="outline" size="large" />
                                </div>

                                <div className="flex flex-col w-full p-4">
                                    <div key="finalizeTab" id="finalizeTab" className="flex flex-col w-full hidden">
                                        <div className="flex w-full justify-start items-center">
                                            <Title type="h5">Finalize</Title>
                                        </div>

                                        <div className="flex justify-between w-full my-4">
                                            <p>Decision: </p>
                                            <textarea name="claimText" rows="5" cols="70" onChange={this.onChange} className="border ml-4" defaultValue="Please, enter your final decision." />
                                        </div>

                                        <div className="flex justify-between w-full my-4">
                                            <p className="py-4">Winnig Side: </p>
                                            <select name="lawyerID" onChange={this.onChange}>
                                                <option value="-1">Please select a winning side</option>
                                                {lawyers ? lawyers.map(key => {
                                                    return (<option key={key.barID} value={key.barID}>{key.name}</option>);
                                                })
                                                    : null
                                                }
                                            </select>
                                        </div>

                                        <div className="flex justify-end w-full">
                                            <Button onClick={this.finalizeLawsuit} label="Finalize" />
                                        </div>
                                    </div>

                                    <div key="assignTab" id="assignTab" className="flex w-full hidden">
                                        <div className="flex w-full justify-start items-center">
                                            <Title type="h5">Assign Conciliator</Title>
                                        </div>

                                        <div className="flex justify-between w-full my-4">
                                            <select name="conciliatorID" onChange={this.onChange}>
                                                <option value="">Please select a conciliator to assign</option>
                                                {conciliators ? conciliators.map(key => {
                                                    return (<option key={key.barID} value={key.barID}>{key.name}</option>);
                                                })
                                                    : null
                                                }
                                            </select>
                                            <Button onClick={this.assignConciliatorLawsuit} label="Assign" />
                                        </div>
                                    </div>

                                    <div key="postponeTab" id="postponeTab" className="flex w-full hidden">
                                        <div className="flex w-full justify-start items-center">
                                            <Title type="h5">Postpone</Title>
                                        </div>

                                        <div className="flex justify-between w-full my-4">
                                            <div className="w-6/12">
                                                <Input name="postponeDate" type="date" size="large" placeholder="Postpone Date" onChange={this.onChange} />
                                            </div>
                                            <Button onClick={this.postponeLawsuit} label="Postpone" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </Card>
            </div>
        );
    }
}

export default PrivateLayout(EditLawsuit);
