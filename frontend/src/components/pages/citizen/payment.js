import React from 'react';
import { payment } from '@/api/data';
import { Card, Loading, Link, Title } from '@/components/ui';
import PrivateLayout from '@/components/layouts/privateLayout';


import store from '@/store';

class Payment extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false, ...store.getState() };
    this.state = { isLoading: false, ...store.getState() };
    this.state = { isLoading: false, ...store.getState() };

    this.handleData = this.handleData.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.handleData();
  }

  async handleData() {
    const { user } = this.state;
    const userID = user.citizenID;
    const result = await payment(userID);

    let amount = 0;
    result.map(key => { amount += key.amount; return amount; });
    result.totalAmount = amount;

    this.setState({ result, isLoading: false });
  }

  render() {
    const { isLoading, result } = this.state;

    return (
      <div className="flex flex-col justify-center items-center text-center">
        <div className="w-10/12 flex">
          <Title type="h3">Payment</Title>
        </div>

        <Card applyPadding={false} extraClassName="w-10/12" shadow="md">
          {
            isLoading ? <Loading /> :
              <div name="payment" className="flex flex-col justify-center items-center w-full my-2">
                <table name="payment" className="w-full my-2 border">
                  <thead className="shadow">
                    <tr>
                      <th>Lawsuit ID</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Creditor</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      (result && !result.errno) ? result.map(key => {
                        return (
                          <tr key={key.lawsuitID}>
                            <td>{key.lawsuitID}</td>
                            <td>{key.type}</td>
                            <td>{key.amount} TL</td>
                            <td>{key.creditor}</td>
                            <td>{key.status}</td>
                            <td>
                              <Link url={"/payment/" + 0}>Pay</Link>
                            </td>
                          </tr>
                        );
                      }) : null
                    }
                  </tbody>
                </table>

                <div className="flex w-full justify-end pr-8">
                  <Link url={"/payment/all"} type="secondary">Pay All</Link>
                  <p className="pl-2">Total amount of payment: {(result && result.totalAmount) ? result.totalAmount : 0} TL</p>
                </div>
              </div>
          }
        </Card>
      </div>
    );
  }
}

export default PrivateLayout(Payment);
