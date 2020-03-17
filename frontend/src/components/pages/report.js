import React from 'react';
import { Card, Loading, Button, Title } from '@/components/ui';
import PrivateLayout from '@/components/layouts/privateLayout';

import store from '@/store';

import { KEYWORDS } from '@/constants';

class Report extends React.Component {
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
        this.setState({ isLoading: true });
    }

    render() {
        const { user, isLoading } = this.state;

        return (
            <div className="flex flex-col justify-center items-center text-center overflow-y-auto h-full">
                <div className="w-10/12 flex">
                    <Title type="h3">Reports</Title>
                </div>

                <Card applyPadding={false} extraClassName="w-10/12" shadow="md">
                    {
                        isLoading ? <Loading /> :
                            <div className="flex w-full my-2">
                            
                            </div>
                    }
                </Card>
            </div>
        );
    }
}

export default PrivateLayout(Report);
