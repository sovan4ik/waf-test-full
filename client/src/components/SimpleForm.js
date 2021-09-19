import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

class Example extends Component {
    render() {
        return(
            <form >
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <button>
          Submit
        </button>
      </div>
    </form>
        )
    }
    // ...
};

const mapStateToProps = state => {
    return {
        products: state.productReducer.products
    };
  };


Example = connect(
    mapStateToProps
)(Example);

export default reduxForm({
    form: 'example' // a unique name for this form
})(Example);