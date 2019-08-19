import React from "react"
import { Pagination } from "react-bootstrap"

interface IProps {
    count: number,
    next: any,
    prev: any,
    handlePageClick: Function
}

export default class SAlert extends React.Component<IProps>{

    handlePageClick = (indx: any, ev: any) => {
        this.props.handlePageClick(indx);
    }

    render() {
        if (this.props.count < 5)
            return <div></div>

        let prev = this.props.prev;
        let next = this.props.next; 

        next =  next ? next.slice(next.lastIndexOf('=') + 1) : null;
        prev =  prev ? (prev.lastIndexOf('=') != -1 ? prev.slice(prev.lastIndexOf('=') + 1) : 1) : 0;

        let active_page, start, items = [];
        if (prev === 0) {
            active_page = 1;
            start = 1;
        }
        else {
            active_page = prev + 1;
            start = prev;
        }

        let end = start + 3;
        for (let number = start; number < end; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    value={number}
                    active={number === active_page}
                    onClick={this.handlePageClick.bind(this, number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        
        return (

            <Pagination className="justify-content-center">
                <Pagination.Prev onClick={this.handlePageClick.bind(this, start)} />
                {items}
                <Pagination.Next onClick={this.handlePageClick.bind(this, active_page + 1)}/>
            </Pagination>

        );
    }
}