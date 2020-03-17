import React from 'react';
import { displayLawsuits, getReconcilation, finalizeReconcilation } from '@/api/data';

import { Card, Loading, Button, Title, Icon } from '@/components/ui';
import PrivateLayout from '@/components/layouts/privateLayout';

import store from '@/store';

import { COLORS, ICONS } from '@/constants';

class Reconciliation extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: false, ...store.getState() };

        this.handleData = this.handleData.bind(this);
        this.finalize = this.finalize.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.handleData();
    }

    async handleData() {
        const lawsuits = displayLawsuits();

        lawsuits.then(async _v => {
            const result = _v;

            for (let i = 0; i < result.length; i++) {
                const data = await getReconcilation(result[i].lawsuitID);
                result[i].reconciliation = data;
            }

            this.setState({ result });
        });

        this.setState({ isLoading: false });
    }

    async finalize(lawsuitID) {
        const result = await finalizeReconcilation(lawsuitID);

        if (result.query) {
            alert("Reconciliation is finalized!");
            this.props.history.push('/reconciliation');
            return;
        }
    }

    render() {
        const { result, isLoading } = this.state;

        return (
            <div className="flex flex-col justify-center items-center text-center overflow-y-auto h-full">
                <div className="w-10/12 flex">
                    <Title type="h3">Reconciliation</Title>
                </div>

                <Card applyPadding={false} extraClassName="w-10/12" shadow="md">
                    {
                        isLoading ? <Loading /> :
                            <div className="flex w-full my-2">
                                <table name="reconciliation" className="w-full border">
                                    <thead className="shadow">
                                        <tr>
                                            <th>Lawsuit ID</th>
                                            <th>Date</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            result ? result.map(key => {
                                                console.log(key);
                                                return (
                                                    <tr key={key.lawsuitID}>
                                                        <td>{key.lawsuitID}</td>
                                                        <td>{key.date.slice(0, 10)}</td>
                                                        <td className="flex justify-center items-center">
                                                            <p className="pr-2">{(key.reconciliation && key.reconciliation[0]) ? key.reconciliation[0].name : ""}</p>
                                                            <Icon name={ICONS[key.reconciliation[0].decision]} className={COLORS[key.reconciliation[0].decision]} />
                                                        </td>
                                                        <td className="flex justify-center items-center">
                                                            <p className="pr-2">{(key.reconciliation && key.reconciliation[1]) ? key.reconciliation[1].name : ""}</p>
                                                            <Icon name={ICONS[key.reconciliation[0].decision]} className={COLORS[key.reconciliation[1].decision]} />
                                                        </td>
                                                        <td className="flex justify-center items-center">
                                                            <Button disabled={key.status === "closed"} onClick={() => { this.finalize(key.lawsuitID) }} label="Finalize" />
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

export default PrivateLayout(Reconciliation);
