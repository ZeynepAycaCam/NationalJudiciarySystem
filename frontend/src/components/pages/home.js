import React from 'react';
import { getCourt, getLawyer } from '@/api/data';
import { Card, Loading, Button } from '@/components/ui';
import PrivateLayout from '@/components/layouts/privateLayout';

import store from '@/store';

import { KEYWORDS } from '@/constants';

import avatar from '@/images/avatar.png';

class Home extends React.Component {
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
    const { user, userType } = this.state;

    if (userType === "citizen") {
      const lawyers = await getLawyer(user.citizenID);
      console.log(lawyers);
      this.setState({ lawyers });
    }

    if (userType === "lawyer") {

    }

    if (userType === "judge") {
      const court = await getCourt(user.courtID);
      this.setState({ court });
    }

    if (userType === "conciliator") {

    }

    this.setState({ isLoading: false });
  }

  render() {
    const { user, userType, isLoading, court, lawyers } = this.state;

    return (
      <div className="flex flex-col items-center mt-20 text-center overflow-y-auto">
        <Card applyPadding={false} extraClassName="w-10/12" shadow="md">
          {
            isLoading ? <Loading /> :
              <div className="flex w-full">
                <div className="flex flex-col w-8/12 h-full justify-center items-center">
                  {user ?
                    Object.keys(user).map(key => {
                      return (
                        KEYWORDS[key] ?
                          <div key={key} className="flex w-full">
                            <div className="flex justify-end w-6/12 pr-8 py-5">
                              <p className="font-semibold">{KEYWORDS[key]}</p>
                            </div>
                            <div className="flex justify-start w-6/12 pl-3 py-5">
                              <p>{key === "dateOfBirth" ? user[key].slice(0, 10) : user[key]}</p>
                            </div>
                          </div>
                          : null
                      );
                    }) : null
                  }

                  {userType && userType === "citizen" ?
                    <div className="flex w-full border-t-2">
                      <div className="flex justify-end w-6/12 pr-8 py-5">
                        <p className="font-semibold">Lawyer</p>
                      </div>
                      <div className="flex flex-col justify-start items-start w-6/12 pl-3 py-5">
                        {lawyers ? lawyers.map(lawyer => {
                          return (<p>{lawyer.name}</p>);
                        })
                          : ""
                        }
                      </div>
                    </div>
                    : null
                  }

                  {userType && userType === "lawyer" ?
                    <div className="flex w-full border-t-2">
                      <div className="flex justify-end w-6/12 pr-8 py-5">
                        <p className="font-semibold">Number of Clients</p>
                      </div>
                      <div className="flex justify-start w-6/12 pl-3 py-5">
                        <p>12</p>
                      </div>
                    </div>
                    : null
                  }

                  {userType && userType === "judge" ?
                    <div className="flex flex-col w-full border-t-2 capitalize">
                      <div className="flex w-full">
                        <div className="flex justify-end w-6/12 pr-8 py-5">
                          <p className="font-semibold">Court</p>
                        </div>
                        <div className="flex justify-start w-6/12 pl-3 py-5">
                          <p>{court && court[0] ? court[0].courtID : ""}</p>
                        </div>
                      </div>

                      <div className="flex w-full">
                        <div className="flex justify-end w-6/12 pr-8 py-5">
                          <p className="font-semibold">Type</p>
                        </div>
                        <div className="flex justify-start w-6/12 pl-3 py-5">
                          <p>{court && court[0] ? court[0].type : ""}</p>
                        </div>
                      </div>

                      <div className="flex w-full">
                        <div className="flex justify-end w-6/12 pr-8 py-5">
                          <p className="font-semibold">City</p>
                        </div>
                        <div className="flex justify-start w-6/12 pl-3 py-5">
                          <p>{court && court[0] ? court[0].city : ""}</p>
                        </div>
                      </div>
                    </div>
                    : null
                  }

                </div>

                <div className="flex flex-col justify-center items-center py-1 w-4/12 bg-gunmetal">
                  <div className="flex items-center w-4/12 pt-1 pb-4">
                    <img src={avatar} alt="" className="p-1 border rounded-full border-white" />
                  </div>

                  <Button disabled={false} label="Update" />
                </div>
              </div>
          }
        </Card>
      </div>
    );
  }
}

/*
<div className="flex flex-col w-4/12 h-full justify-start items-end pr-8 py-1 border-r-2">
  {user ? Object.keys(user).map(key => {
    return <p key={key} className="flex-grow my-4">{KEYWORDS[key]}</p>;
  }) : null}
</div>

  <div className="flex flex-col w-4/12 h-full justify-start items-start pl-3 py-1">
    {user ? Object.keys(user).map(_key => {
      return <p key={_key} className="flex-grow my-4">{KEYWORDS[_key] ? user[_key] : null}</p>;
    }) : null}

    <p key="lawyer" className="flex-grow my-4 text-red">Harvey Specter</p>
  </div>
*/
export default PrivateLayout(Home);
