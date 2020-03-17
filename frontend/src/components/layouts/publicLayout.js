import React from 'react';
import store from '@/store';

import { Header } from '@/components/common';

const PublicLayout = (WrappedComponent) => {
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

        render() {
            return (
                <div className="flex flex-col overflow-hidden h-screen">
                    <Header />
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    };
};

export default PublicLayout;