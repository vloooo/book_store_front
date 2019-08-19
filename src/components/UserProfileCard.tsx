import React from 'react'
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, ListGroup, Card, Button } from 'react-bootstrap'
import { capitalize } from '../utils/general_utils';
import { USER_PROFILE_FIELDS } from '../const/const_fields';
import { Link } from 'react-router-dom';

interface IProps {
    user: any
}

export default class UserProfileCard extends React.Component<IProps> {

    collectProfileList = () => {
        let user = this.props.user;
        let listItems: any = [];
        let fields = USER_PROFILE_FIELDS;

        fields.map((item: string, index: number) => {
            listItems.push(
                <ListGroup.Item key={index} className="bg-dark border-0">
                    <FontAwesomeIcon icon={faLongArrowAltRight} className="align-middle" />
                    {item ? capitalize(item) : ""}:  {index < 2 ? user.user[item] : (user[item] ? user[item] : "----")}
                </ListGroup.Item>)
        })
        return listItems;
    }

    render() {
        return (
            <Container className="col-sm-12 col-md-8 col-xl-6">
                <Row className="mb-3 text-white bg-dark p-2 rounded flex-column">
                    <Card.Title>Profile</Card.Title>
                    <Card.Text className="ml-3">
                        <ListGroup variant="flush" className="mt-3">
                            {this.collectProfileList()}
                        </ListGroup>
                    </Card.Text>

                    <Row className="justify-content-end">
                        <Link to="/user/edit">
                            <Button variant='outline-light' className="mx-3">
                                Edit
                            </Button>
                        </Link>
                    </Row>
                </Row>
            </Container>
        );
    }
}
