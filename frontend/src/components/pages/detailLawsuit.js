import React from 'react';
import { detailLawsuit, getCourt, getTrials } from '@/api/data';
import { Card, Loading, Link, Title } from '@/components/ui';
import PrivateLayout from '@/components/layouts/privateLayout';

import store from '@/store';

import { KEYWORDS } from '@/constants';

class DetailLawsuit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lawsuitID: null,
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

        this.setState({ lawsuitID: lawsuitID });

        this.setState({ isLoading: true });
        this.handleData();
    }

    async handleData() {
        const lawsuitID = this.props.match.params.lawsuitID;
        const result = await detailLawsuit(lawsuitID);
        this.setState({ result });

        if (result.length === 0) {
            this.props.history.push('/displayLawsuits');
            return;
        }

        const court = await getCourt(result[0].courtID);
        this.setState({ court: court[0] });

        if (court.length === 0) {
            this.props.history.push('/displayLawsuits');
            return;
        }

        const trials = await (getTrials(lawsuitID));
        this.setState({ trials });

        this.setState({ isLoading: false });

        console.log(trials);
    }

    render() {
        const { userType, isLoading, result, court, trials } = this.state;
        const lawsuit = result ? result[0] || null : null;
        console.log(result);

        return (
            <div className="flex flex-col justify-center items-center text-center overflow-y-auto h-full">
                <div className="flex justify-between items-end w-10/12">
                    <Title type="h3">Lawsuit Detail</Title>
                    <Link url="/displayLawsuits/" size="large" extraClassName="pr-2">Back</Link>
                </div>

                <Card applyPadding={false} extraClassName="w-10/12" shadow="md">
                    {
                        isLoading ? <Loading /> :
                            <div className="flex flex-col w-full">
                                <div className="flex w-full px-4 border-b-2 border-paleBlue">
                                    <div className="flex flex-col items-start w-6/12 py-4 border-r-2 border-paleBlue capitalize">
                                        <div className="flex w-full py-4">
                                            <p className="w-4/12 text-left font-semibold">Lawsuit ID:</p>
                                            <p className="w-8/12 text-left">{lawsuit ? lawsuit.lawsuitID : -1}</p>
                                        </div>

                                        {userType === "citizen" ?
                                            <div className="flex w-full py-4">
                                                <p className="w-4/12 text-left font-semibold">Role:</p>
                                                <p className="w-8/12 text-left">{lawsuit ? lawsuit.role : ""}</p>
                                            </div>
                                            : null
                                        }

                                        <div className="flex w-full py-4">
                                            <p className="w-4/12 text-left font-semibold">Court:</p>
                                            <p className="w-8/12 text-left">{court ? court.type + ', ' + court.city : ""}</p>
                                        </div>

                                        <div className="flex w-full py-4">
                                            <p className="w-4/12 text-left font-semibold">Status:</p>
                                            <p className="w-8/12 text-left">{lawsuit ? lawsuit.status : ""}</p>
                                        </div>

                                        {userType === "judge" ?
                                            <div className="flex w-full py-4">
                                                <p className="w-4/12 text-left font-semibold">Conciliator Result:</p>
                                                <p className="w-8/12 text-left">{lawsuit ? KEYWORDS[lawsuit.conciliatorResult] : ""}</p>
                                            </div>
                                            : null
                                        }
                                    </div>

                                    <div className="flex flex-col items-end w-6/12 pl-4 py-4">
                                        <div className="flex flex-col w-full h-full">
                                            <div className="flex w-full h-full ">
                                                <p className="w-2/12 text-left font-semibold">Claim:</p>
                                                <p className="w-10/12 h-full text-left">{lawsuit ? lawsuit.claim : ""}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full p-4">
                                    <div className="flex w-6/12">
                                        <Title type="h4">Filters:</Title>
                                        <div className="flex justify-between w-6/12 px-4">
                                            <select name="filter_date" onChange={this.onChange}>
                                                <option value="">Date</option>
                                                <option value="ascending">Ascending</option>
                                                <option value="decending">Decending</option>
                                            </select>
                                            <select name="filter_price" onChange={this.onChange}>
                                                <option value="">Price</option>
                                                <option value="ascending">Ascending</option>
                                                <option value="decending">Decending</option>
                                            </select>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="flex w-full mt-4">
                                        <table name="detailLawsuit" className="w-full border">
                                            <thead className="shadow">
                                                <tr>
                                                    <th>Number</th>
                                                    <th>Date</th>
                                                    <th>Price</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    trials ? trials.map(key => {
                                                        return (
                                                            <tr key={key.number}>
                                                                <td>{key.number}</td>
                                                                <td>{key.date.slice(0, 10)}</td>
                                                                <td>{key.price} TL</td>
                                                                <td className="flex justify-center items-center">
                                                                    <Link url={"/detailLawsuit/" + (lawsuit ? lawsuit.lawsuitID : -1) + "/trial/" + key.number} extraClassName="pr-2">View Trial</Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }) : null
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                    {((userType && userType === "judge") && (lawsuit && lawsuit.status !== "closed")) ?
                                        <div className="flex justify-end items-center w-full mt-4">
                                            <Link url={"/detailLawsuit/" + (lawsuit ? lawsuit.lawsuitID : -1) + "/edit"} size="large" type="white" extraClassName="p-2 bg-primary rounded-8">Update</Link>
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                    }
                </Card>
            </div>
        );
    }
}

export default PrivateLayout(DetailLawsuit);
