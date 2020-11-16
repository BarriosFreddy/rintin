import React from "react";
import "../assets/styles/components/ListItem.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const ListItem = ({ link, title, description, createdAt }) => (
  <section className="item">
    <Link to={link}>
      <Container>
        <Row>
          <Col xs="12" md="8">
            <h3 className="item__title">{title}</h3>
            <div className="item__description">{description}</div>
          </Col>
          <Col xs="6" md="4">
            <div className="pull-right">{moment(createdAt).format("LL")}</div>
          </Col>
        </Row>
      </Container>
    </Link>
  </section>
);

export default ListItem;
