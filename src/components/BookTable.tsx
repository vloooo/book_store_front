import React from "react"
import { Container, Table, Row, Button } from "react-bootstrap"
import { createHeader, collectRow } from "../utils/tableUtils"
import { BOOK_TABLE_FIELDS } from '../const/const_fields';
import InfoAlert from './SAlerts'
import SPaginator from './SPaginator'

interface IProps {
    books: any
    handleDeleteBook: Function,
    handleShowEditBookForm: Function,
    handleShowBookProfile: Function,
    handleAddBook: Function,
    handlePageClick: Function
}

export default class BooksTable extends React.Component<IProps>{

    handlePageClick = (page: any) => {
        this.props.handlePageClick(page);
    }

    handleShowBookProfile = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();

        let book = this.props.books.results.find(
            (item: any) => item.title == ev.currentTarget.parentElement.firstChild.innerHTML);
        this.props.handleShowBookProfile(book);
    }

    handleAddBook = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.props.handleAddBook();
    }

    handleDeleteBook = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.props.handleDeleteBook(ev.currentTarget.value);
    }

    handleEditBook = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();
        let book = this.props.books.results.find((item: any) => item.id == ev.currentTarget.value);
        this.props.handleShowEditBookForm(book)
    }

    render() {
        if (this.props.books.length === 0 || !('title' in this.props.books.results[0]))
            return <div></div>

        if (!this.props.books.count) 
            return (
                <InfoAlert text={"We haven't books yet."} />
            );

        let fields = BOOK_TABLE_FIELDS;
        let tableData: any = [];
        this.props.books.results.forEach((element: any) => {
            tableData.push(
                collectRow(
                    element,
                    fields,
                    this.handleDeleteBook,
                    this.handleEditBook,
                    this.handleShowBookProfile)
            );
        });


        fields = fields.concat(['', '']);
        let tableHeader = createHeader(fields);

        return (
            <Container fluid>
                <Row className="justify-content-end">
                    <Button variant="dark" className="m-3" onClick={this.handleAddBook}>
                        Add Book
                    </Button>
                </Row>

                <Table hover className="mb-5">
                    <thead className="thead-light">
                        {tableHeader}
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </Table>

                <SPaginator
                    count={this.props.books.count}
                    prev={this.props.books.previous}
                    next={this.props.books.next}
                    handlePageClick={this.handlePageClick} />
            </Container>
        );
    }
}