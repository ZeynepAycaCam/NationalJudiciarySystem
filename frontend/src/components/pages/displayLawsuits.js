import React from 'react';
import { displayLawsuits, getCourt } from '@/api/data';
import { Card, Loading, Icon, Title, Link } from '@/components/ui';
import PrivateLayout from '@/components/layouts/privateLayout';

import store from '@/store';

class DisplayLawsuit extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: false, ...store.getState() };

        this.handleData = this.handleData.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.handleData();
    }

    async handleData() {
        const result = await displayLawsuits();

        for(let i = 0; i < result.length; i++) {
            const court = await getCourt(result[0].courtID);
            result[i].court = court[0];
        }

        this.setState({ result, isLoading: false });

        console.log(result);
    }

    render() {
        const { result, userType, isLoading } = this.state;
        console.log(result);
        return (
            <div className="flex flex-col justify-center items-center text-center">
                <div className="w-10/12 flex">
                    <Title type="h3">Display Lawsuits</Title>
                </div>

                <Card applyPadding={false} extraClassName="w-10/12" shadow="md">
                    {
                        isLoading ? <Loading /> :
                            <div className="flex w-full">
                                <table name="displayLawsuits" className="w-full">
                                    <thead className="shadow">
                                        <tr>
                                            <th>Lawsuit ID</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Price</th>
                                            <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (result && !result.errno) ? result.map(key => {
                                                return (
                                                    <tr key={key.lawsuitID} className="capitalize">
                                                        <td>{key.lawsuitID}</td>
                                                        <td>{key.court ? key.court.type : ""}</td>
                                                        <td>{key.status}</td>
                                                        <td>{key.price} TL</td>
                                                        <td className="flex justify-center items-center">
                                                            <Link url={"/detailLawsuit/" + key.lawsuitID} extraClassName="pr-2">View</Link>
                                                            {userType === "citizen" ?
                                                                <Icon name="Circle" className={key.role === "victim" ? "text-green" : "text-red"} />
                                                                : null
                                                            }
                                                        </td>
                                                    </tr>
                                                );
                                            }) : null
                                        }
                                    </tbody>
                                </table>
                            </div>
                    }
                </Card>
            </div>
        );
    }
}

export default PrivateLayout(DisplayLawsuit);
