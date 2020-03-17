import React from 'react';
import { register } from '@/api/data';
import { Button, Card, Input, Title } from '@/components/ui';
import PublicLayout from '@/components/layouts/publicLayout';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {

    }

    async register() {
        const validation = await this.isValid();

        if (!validation) {
            return;
        }

        const credentials = this.state;
        const result = await register(credentials);

        if (result.response && result.response.status === 400) {
            console.log("Error: ", result.response.data);

            const { errors } = this.state;

            if (result.response.data.errno === 1062) {
                const index = result.response.data.err.indexOf('for key');
                const sliced = result.response.data.err.slice(index + 8);
                const key = sliced.substring(1, sliced.length - 1);

                errors[key] = "Has been already used!";
                this.setState({ errors });
                return;
            }

            if (result.response.data.errno === 499) {
                errors['type'] = result.response.data.err;
                this.setState({ errors });
                return;
            }

            return;
        }

        if (result.config || result.request || result.response) {
            console.log("Error: ", result.request.status, result.request.statusText);
            return;
        }


        if (result.query) {
            alert("Registration is successful!");
            this.props.history.push('/login');
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

        const { errors } = this.state;
        errors[e.target.name === 'TCKno' ? 'PRIMARY' : e.target.name] = [];
        this.setState({ errors });
    }

    isValid() {
        return new Promise((resolve, reject) => {
            const { type, courtID, TCKno, firstName, lastName, dateOfBirth, phoneNumber, addressStreet, addressApartment, addressZip, addressCity, password, passwordAgain } = this.state;

            this.setState({ errors: [] });

            const errors = [];

            if (!type) {
                errors['type'] = "This field cannot be empty!";
            }

            if (type && type === "judge" && !courtID) {
                errors['courtID'] = "This field cannot be empty!";
            }

            if (!TCKno) {
                errors['PRIMARY'] = "This field cannot be empty!";
            }

            if (!firstName) {
                errors['firstName'] = "This field cannot be empty!";
            }

            if (!lastName) {
                errors['lastName'] = "This field cannot be empty!";
            }

            if (!dateOfBirth) {
                errors['dateOfBirth'] = "This field cannot be empty!";
            }

            if (!phoneNumber) {
                errors['phoneNumber'] = "This field cannot be empty!";
            }

            if (!addressStreet) {
                errors['addressStreet'] = "This field cannot be empty!";
            }

            if (!addressApartment) {
                errors['addressApartment'] = "This field cannot be empty!";
            }

            if (!addressZip) {
                errors['addressZip'] = "This field cannot be empty!";
            }

            if (!addressCity) {
                errors['addressCity'] = "This field cannot be empty!";
            }

            if (!password) {
                errors['password'] = "This field cannot be empty!";
            }

            if (!passwordAgain) {
                errors['passwordAgain'] = "This field cannot be empty!";
            }

            console.log(Object.keys(errors).length);

            if (Object.keys(errors).length !== 0) {
                this.setState({ errors });
                resolve(false);
            }

            if (password !== passwordAgain) {
                errors['passwordAgain'] = "Passwords are not match!";
                this.setState({ errors });
                resolve(false);
            }

            resolve(true);
        });
    }

    render() {
        const { type, errors } = this.state;

        return (
            <div className="flex flex-col items-center mt-20 text-center overflow-y-auto">
                <div className="w-3/12">
                    <Card applyPadding={false} shadow="md" extraClassName="px-6 py-4">
                        <Title type="h5">Register</Title>
                        <hr />
                        <div className="flex flex-col my-2">
                            <select name="type" onChange={this.onChange}>
                                <option value="">Please select a user type</option>
                                <option value="citizen">Citizen</option>
                                <option value="lawyer">Lawyer</option>
                                <option value="judge">Judge</option>
                                <option value="conciliator">Conciliator</option>
                            </select>
                            <p className="p-2 text-red">{errors['type']}</p>
                            <hr />

                            {type && type === "judge" ?
                                <div className="flex flex-col w-full">
                                    <select name="courtID" onChange={this.onChange}>
                                        <option value="">Please select a court</option>
                                        <option value="1">Ankara, Civil Case</option>
                                        <option value="2">Ankara, xxx</option>
                                        <option value="3">İstanbul, yyy</option>
                                    </select>
                                    <p className="p-2 text-red">{errors['type']}</p>
                                    <hr />
                                </div>
                                : null
                            }

                            <Input name="TCKno" type="text" size="large" placeholder="TCKno" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['PRIMARY']}</p>
                            <hr />
                            <Input name="firstName" type="text" size="large" placeholder="Firstname" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['firstName']}</p>
                            <Input name="lastName" type="text" size="large" placeholder="Lastname" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['lastName']}</p>
                            <hr />
                            <Input name="dateOfBirth" type="date" size="large" placeholder="Birth Date" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['dateOfBirth']}</p>
                            <hr />
                            <Input name="phoneNumber" type="tel" size="large" placeholder="Phone Number" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['phoneNumber']}</p>
                            <Input name="e_mail" type="email" size="large" placeholder="E-mail" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['e_mail']}</p>
                            <hr />
                            <Title type="h6">Address</Title>
                            <Input name="addressStreet" type="text" size="large" placeholder="Street" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['addressStreet']}</p>
                            <Input name="addressApartment" type="text" size="large" placeholder="Apartment No" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['addressApartment']}</p>
                            <Input name="addressZip" type="text" size="large" placeholder="Zip Code" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['addressZip']}</p>
                            <Input name="addressCity" type="text" size="large" placeholder="City" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['addressCity']}</p>
                            <hr />
                            <Input name="password" type="password" size="large" placeholder="Password" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['password']}</p>
                            <Input name="passwordAgain" type="password" size="large" placeholder="Password (Again)" onChange={this.onChange} />
                            <p className="p-2 text-red">{errors['passwordAgain']}</p>
                            <hr />
                            <Button onClick={this.register} size="large" label="Register" />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default PublicLayout(Register);