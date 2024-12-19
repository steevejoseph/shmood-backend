/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import Dropzone from './Dropzone';
import { getImgurUrl } from '../../../actions';

const styles = {
  form: {
    marginTop: 50,
    flexDirection: 'column',
    color: '#fff',
  },
};

class PlaylistNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  onSubmit(values) {
    // getImgurUrl automatically submits the photo to azure afterwards
    this.props.getImgurUrl(values);
  }

  renderField(field) {
    const {
      meta: { touched, error },
    } = field;
    const className = `${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className} style={{ marginTop: 20, marginBottom: 20 }}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  render() {
    const { handleSubmit, photoBeingSubmitted } = this.props;
    const { form } = styles;

    if (photoBeingSubmitted) {
      return <Spinner name="line-scale" color="white" />;
    }

    return (
      <div className="container" style={form}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field label="Playlist Name" name="name" component={this.renderField} />
          <Field label="Image" name="image" component={Dropzone} />
          <button type="submit" className="btn btn-primary" style={{ margin: 20 }}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.name) errors.name = 'Playlist must have a name';
  if (!values.image) errors.image = 'Playlist must have an image';
  return errors;
}

const mapStateToProps = state => ({
  photoBeingSubmitted: state.photo.photoBeingSubmitted,
});

export default withRouter(
  reduxForm({
    validate,
    form: 'playlistNewForm',
  })(
    connect(
      mapStateToProps,
      { getImgurUrl }
    )(PlaylistNew)
  )
);
