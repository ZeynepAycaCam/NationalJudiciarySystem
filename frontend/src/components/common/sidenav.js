import React from 'react';
import store from '@/store';
import { Link } from '@/components/ui';

class Sidenav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userType: null
        };
    }

    componentDidMount() {
        this.setState(store.getState());
    }

    render() {
        const { userType } = this.state;

        return (
            <div className="w-2/12 overflow-x-hidden border-r-2 border-paleBlue h-full">
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <ul className="list-reset flex flex-col items-center">
                        {userType === "citizen" ?
                            <li className="m-3">
                                <Link url="/hireLawyer">Hire a Lawyer</Link>
                            </li>
                            : null
                        }

                        {userType === "citizen" || userType === "lawyer" ?
                            <li className="m-3">
                                <Link url="/fileLawsuit">File Lawsuit</Link>
                            </li>
                            : null
                        }

                        {userType !== "conciliator" ?
                            <li className="m-3">
                                <Link url="/displayLawsuits">Display Lawsuits</Link>
                            </li>
                            : null
                        }

                        {userType === "citizen" ?
                            <li className="m-3">
                                <Link url="/payment">Payment</Link>
                            </li>
                            : null
                        }

                        {userType === "conciliator" ?
                            <li className="m-3">
                                <Link url="/reconciliation">Reconciliation</Link>
                            </li>
                            : null
                        }

                        <li className="m-3">
                            <Link url="/report">Reports</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default Sidenav;