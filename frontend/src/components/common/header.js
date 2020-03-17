import React from 'react';
import store from '@/store';
import { removeUser } from '@/actions';

import { Card, Icon, Link } from '@/components/ui';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userType: null
        };

        this.logout = this.logout.bind(this);
    }

    logout() {
        store.dispatch(removeUser());
    }

    componentDidMount() {
        this.setState(store.getState());
    }

    render() {
        const { user, userType } = this.state;
        // <Input placeholder="Search" iconLeft="Search" />
        return (
            <div className="w-full h-16">
                <Card applyMargin={false} applyPadding={false} extraClassName="px-6 py-4 h-full" shadow="md">
                    <div className="flex justify-center w-full h-full">
                        <Link type="outline" extraClassName="flex items-center w-3/12">
                            <div className="flex px-6 items-center w-full h-full">
                                <Icon name="Activity" className="text-primary" />
                                <p className="px-2">Database Project</p>
                            </div>
                        </Link>

                        {user ? <div className="w-3/12"></div> :
                            <div className="flex justify-center items-center w-9/12 text-center">
                                <Link url="/login?type=citizen" extraClassName="w-2/12 p-2">Citizen Portal</Link>
                                <Link url="/login?type=lawyer" extraClassName="w-2/12 p-2">Lawyer Portal</Link>
                                <Link url="/login?type=judge" extraClassName="w-2/12 p-2">Judge Portal</Link>
                                <Link url="/login?type=conciliator" extraClassName="w-2/12 p-2">Conciliator Portal</Link>
                            </div>
                        }

                        {user ?
                            <div className="flex justify-end items-center w-9/12">
                                {userType ?
                                    <Link extraClassName="pr-12 capitalize">
                                        <p>{user.name} ({userType})</p>
                                    </Link>
                                    : null
                                }
                                <Link onClick={this.logout} type="secondary" extraClassName="p-2">Logout</Link>
                            </div> :
                            <div className="flex justify-end items-center w-3/12">
                                <Link url="/register" type="secondary" extraClassName="p-2">Create an account!</Link>
                            </div>
                        }
                    </div>
                </Card>
            </div>
        );
    }
}


export default Header;