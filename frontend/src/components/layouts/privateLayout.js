import React from 'react';
import store from '@/store';

import { Header, Sidenav } from '@/components/common';

const PrivateLayout = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);

            store.subscribe(() => {
                const { user } = store.getState();

                if (user) {
                    this.props.history.push('/');
                } else {
                    this.props.history.push('/login');
                }
            });
        }

        componentDidMount() {
            const { user } = store.getState();

            if (!user) {
                this.props.history.push('/login');
                return;
            }
        }

        render() {
            return (
                <div className="flex w-full h-screen">
                    <Sidenav />

                    <div className="flex flex-col w-10/12">
                        <Header />

                        <div className="w-full mt-16">
                            <WrappedComponent {...this.props} />
                        </div>
                    </div>
                </div>
            );
        }
    };
};

export default PrivateLayout;