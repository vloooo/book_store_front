import React from 'react'
import { Container, Form as BootstrapForm, Button, Row } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { editUser } from '../utils/DButil';

interface IProps {
    handleEdit: Function,
    user: any
}

export default class EditUser extends React.Component<IProps> {

    render() {
        let vld = Yup.object().shape({
            username: Yup.string()
                .required('Username is required'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
        });

        return (

            <Container className="col-6">

                <Formik
                    initialValues={{
                        username: this.props.user.user.username,
                        email: this.props.user.user.email,
                        birthday: this.props.user.birthday,
                        gender: this.props.user.gender,
                        password: '',
                    }}
                    validationSchema={vld}
                    onSubmit={values => {
                        editUser(values).then(
                            response => this.props.handleEdit(response)).catch(error => {
                                alert(error.message || 'Sorry! Something went wrong. Please try again!')
                            });
                    }}
                    render={({ errors, status, touched }) => (
                        <Form>
                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Username</BootstrapForm.Label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Email</BootstrapForm.Label>
                                <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Birthday</BootstrapForm.Label>
                                <Field name="birthday" type="text" placeholder="1111-11-11" className='form-control' />
                                <ErrorMessage name="birthday" component="div" className="invalid-feedback" />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Gender</BootstrapForm.Label>
                                <Field component="select" name="gender" className='form-control'>
                                    <option value="Other">Other</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </Field>
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Password</BootstrapForm.Label>
                                <Field 
                                name="password" 
                                type="password" 
                                className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} 
                                placeholder="type if you want to change password"/>
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </BootstrapForm.Group>

                            <Row className="justify-content-end">
                                <Button type="submit" variant="dark" className="mx-4">Submit</Button>
                            </Row>
                        </Form>
                    )}
                />
            </Container>
        );
    }
}