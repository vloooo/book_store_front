import React from 'react'
import { Container, Form as BootstrapForm, Button, Row } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { editBook } from '../utils/DButil';
import Dropzone from 'react-dropzone'

interface IProps {
    handleEdit: Function,
    book?: any
}

interface IState {
    image: any
}

export default class EditUser extends React.Component<IProps, IState> {

    state = {
        image: ''
    }

    onDrop = (file: any) => {
        this.setState({
            image: file
        });
    }

    render() {

        let vld = Yup.object().shape({
            title: Yup.string()
                .required('Username is required'),
            year: Yup.string()
                .required('Email is required'),
            price: Yup.string()
                .required('Email is required'),
            amount: Yup.string()
                .required('Email is required'),
        });

        let initVal, hidenInp: any;

        if (this.props.book) {
            initVal = {
                id: this.props.book.id,
                title: this.props.book.title,
                author: this.props.book.author,
                genre: this.props.book.genre,
                price: this.props.book.price,
                year: this.props.book.year,
                amount: this.props.book.amount,
                available: this.props.book.available,
                image: this.props.book.image,
            }
            hidenInp = <input type="hidden" name="id" value={this.props.book.id} />;
        }
        else {
            initVal = {
                title: '',
                author: '',
                genre: '',
                price: '',
                year: '',
                amount: '',
                available: true,
                image: ''
            }
        }
        return (
            <Container className="col-6">

                <Formik
                    initialValues={initVal}
                    validationSchema={vld}
                    onSubmit={values => {
                        let method = this.props.book ? "PUT" : "POST"
                        editBook(values, method, this.state.image).then(
                            response => this.props.handleEdit(response)).catch(error => {
                                alert(error.message || 'Sorry! Something went wrong. Please try again!')
                            });
                    }}
                    render={({ values, errors, status, touched }) => (
                        <Form>
                            {hidenInp}
                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Title</BootstrapForm.Label>
                                <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Author</BootstrapForm.Label>
                                <Field name="author" type="text" className='form-control' />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Genre</BootstrapForm.Label>
                                <Field name="genre" type="text" className='form-control' />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Price</BootstrapForm.Label>
                                <Field name="price" type="number" placeholder="100" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
                                <ErrorMessage name="price" component="div" className="invalid-feedback" />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Year</BootstrapForm.Label>
                                <Field name="year" type="number" placeholder="2001" className={'form-control' + (errors.year && touched.year ? ' is-invalid' : '')} />
                                <ErrorMessage name="year" component="div" className="invalid-feedback" />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Amount</BootstrapForm.Label>
                                <Field name="amount" type="number" placeholder="100" className={'form-control' + (errors.amount && touched.amount ? ' is-invalid' : '')} />
                                <ErrorMessage name="amount" component="div" className="invalid-feedback" />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Available</BootstrapForm.Label>
                                <Field name="available" type="checkbox" className='form-control' checked={values.available} />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group>
                                <Dropzone onDrop={this.onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {this.props.book.image ? this.props.book.image : "Click me to upload a file!"}
                                        </div>
                                    )}
                                </Dropzone>
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