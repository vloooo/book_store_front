import React from 'react'
import { Container, Form as BootstrapForm, Button, Row } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setRegister } from '../utils/DButil';

interface IProps {
    handleReg: Function
}

export default class SignUp extends React.Component<IProps> {

    render() {
        let vld = Yup.object().shape({
            username: Yup.string()
                .required('Username is required'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), ''], 'Passwords must match')
                .required('Confirm Password is required')
        });

        return (
            <Container className="col-6">
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        birthday: '',
                        gender: '',
                        password: '',
                        confirm_password: ''
                    }}
                    validationSchema={vld}
                    onSubmit={values => {
                        setRegister(values).then(
                            response => this.props.handleReg(response)).catch(error => {
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
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Confirm password</BootstrapForm.Label>
                                <Field name="confirm_password" type="password" className={'form-control' + (errors.confirm_password && touched.confirm_password ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirm_password" component="div" className="invalid-feedback" />
                            </BootstrapForm.Group>
                            
                            <Row className="justify-content-end">
                                <Button type="submit" variant="dark" className="mx-4">Submit</Button>
                                <Button type="reset" variant="dark" className="mx-4">Reset</Button>
                            </Row>
                        </Form>
                    )}
                />
            </Container>
        );
    }
}