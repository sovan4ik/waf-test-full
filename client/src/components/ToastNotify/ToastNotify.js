import React, { Component } from 'react';
import { ToastContainer, Toast } from "react-bootstrap";

export default class ToastNotify extends Component {
    render() {
        return (
            <ToastContainer className="p-3" position={'bottom-end'}>
                <Toast onClose={this.props.onClose} show={this.props.show} delay={this.props.delay || 3000} autohide={this.props.autohide || true}>
                    <Toast.Header>
                        <strong className="me-auto">{this.props.title}</strong>
                        <small>{this.props.date || null}</small>
                    </Toast.Header>
                    <Toast.Body>{this.props.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        )
    }
}