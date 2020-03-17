import React from 'react';
import { getTrial, getPersonalStatements } from '@/api/data';
import { Card, Loading, Link, Title } from '@/components/ui';
import PrivateLayout from '@/components/layouts/privateLayout';

import store from '@/store';

class DetailTrial extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lawsuitID: null,
            trialNumber: null,
            isLoading: false,
            ...store.getState()
        };

        this.handleData = this.handleData.bind(this);
    }

    componentDidMount() {
        const lawsuitID = this.props.match.params.lawsuitID;

        if (lawsuitID < 0) {
            this.props.history.push('/displayLawsuits');
            return;
        }

        const trialNumber = this.props.match.params.trialNumber;

        if (trialNumber < 0) {
            this.props.history.push('/displayLawsuits');
            return;
        }

        this.setState({ lawsuitID: lawsuitID, trialNumber: trialNumber });

        this.setState({ isLoading: true });
        this.handleData();
    }

    async handleData() {
        const lawsuitID = this.props.match.params.lawsuitID;
        const trialNumber = this.props.match.params.trialNumber;
        const trial = await getTrial(lawsuitID, trialNumber);
        this.setState({ trial });

        const personalStatements = getPersonalStatements(lawsuitID, trialNumber);

        personalStatements.then(_v => {
            this.setState({ personalStatements: _v });
        });

        this.setState({ isLoading: false });
    }

    render() {
        const { user, isLoading, lawsuitID, trialNumber, userType, trial, personalStatements } = this.state;
        console.log(personalStatements);
        return (
            <div className="flex flex-col justify-center items-center text-center overflow-y-auto h-full">
                <div className="flex justify-between items-end w-10/12">
                    <Title type="h3">Trial Detail</Title>
                    <Link url={"/detailLawsuit/" + lawsuitID} size="large" extraClassName="pr-2">Back</Link>
                </div>

                <Card applyPadding={false} extraClassName="w-10/12" shadow="md">
                    <div className="flex justify-between items-center w-full p-4">
                        <div className="flex w-3/12 justify-start">
                            <p className="font-semibold">Lawsuit ID:</p>
                            <p className="pl-2">{lawsuitID}</p>
                        </div>

                        <div className="flex w-3/12 justify-center">
                            <p className="font-semibold">Trial Number:</p>
                            <p className="pl-2">{trialNumber}</p>
                        </div>

                        <div className="flex w-3/12 justify-center">
                            <p className="font-semibold">Price:</p>
                            <p className="pl-2">{trial && trial[0] ? trial[0].price : ""}</p>
                        </div>

                        <div className="flex w-3/12 justify-end">
                            <p className="font-semibold">Date:</p>
                            <p className="pl-2">{trial && trial[0] ? trial[0].date.slice(0, 10) : ""}</p>
                        </div>
                    </div>
                </Card>

                {
                    personalStatements ? personalStatements.map(val => {
                        return (
                            <Card key={val.statementID} applyPadding={false} extraClassName="w-10/12" shadow="md">
                                {isLoading ? <Loading /> :
                                    <div className="flex flex-col w-full">
                                        {(userType === "citizen" && user.citizenID === val.citizenID) || (userType !== "citizen") ?
                                            <div className="flex w-full px-4 border-b-2 border-paleBlue">
                                                <div className="flex flex-col w-full p-4">
                                                    <div className="flex justify-center w-full">
                                                        <p className="w-2/12 font-semibold text-right">Statement ID</p>
                                                        <p className="w-10/12 text-left pl-3">{val.statementID}</p>
                                                    </div>

                                                    <div className="flex justify-center w-full my-4">
                                                        <p className="w-2/12 font-semibold text-right">Personal Statement</p>
                                                        <p className="w-10/12 text-left pl-3">{val.personelStatementText}</p>
                                                    </div>

                                                    {userType !== "citizen" ?
                                                        <div className="flex justify-center w-full my-4">
                                                            <p className="w-2/12 font-semibold text-right">By:</p>
                                                            <p className="w-10/12 text-left pl-3">{val.name}</p>
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                            : <div className="flex w-full p-4">Citizens cannot see other side's statement!</div>
                                        }
                                    </div>
                                }
                            </Card>
                        );
                    }) : null
                }
            </div>
        );
    }
}

export default PrivateLayout(DetailTrial);
