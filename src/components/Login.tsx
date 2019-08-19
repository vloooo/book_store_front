import React from 'react'
import { Container, Form as BootstrapForm, Button, Row } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setLogin } from '../utils/DButil';
import { Link } from 'react-router-dom';

interface IProps {
    handleLogin: Function
}

export default class Login extends React.Component<IProps> {

    render() {

        let vld = Yup.object().shape({
            username: Yup.string()
                .required('Username is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
        });

        return (
            <Container className="col-6">

                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={vld}
                    onSubmit={values => {
                        setLogin(values).then(
                            response => this.props.handleLogin(response)).catch(error => {
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
                                <BootstrapForm.Label>Password</BootstrapForm.Label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </BootstrapForm.Group>

                            <Row className="justify-content-end">
                                <Button type="submit" variant="dark" className="mx-4">Submit</Button>
                                <Link to="/signup" className="nav-link">
                                    Or Signup?
                                </Link>
                            </Row>
                        </Form>
                    )}
                />
            </Container>
        );
    }
}