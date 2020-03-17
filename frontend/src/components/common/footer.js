import React from 'react';

import { Card, Link } from '@/components/ui';

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    render() {
        return (
            <div className="w-full fixed h-16 pin-b">
                <Card applyMargin={false} applyPadding={false} extraClassName="px-6 py-4 h-full" shadow="md">
                    <div className="flex justify-center items-center w-full">
                        <div className="w-3/12"></div>
                        <div className="flex justify-center items-center w-6/12 text-center">
                            <Link extraClassName="w-2/12 p-2">About Us</Link>
                            <Link extraClassName="w-2/12 p-2">Contact</Link>
                            <Link extraClassName="w-2/12 p-2">License</Link>
                        </div>
                        <div className="w-3/12"></div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Footer;