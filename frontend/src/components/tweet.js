// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI Imports
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import { blue500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

// App Imports
import { postTweet } from '../actions/tweets';

class Tweet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            isLoading: false,
            error: '',
            notification: false
        };
    }

    onSubmit(event) {
        event.preventDefault();

        console.log('E - submit #form-tweet');

        this.setState({ isLoading: true });

        let input = {};
        input.text = this.state.text;

        if(input.text !=='') {
            this.props.postTweet(input).then((response) => {
                this.setState({ isLoading: false, notification: true, text: '', error: '' });
            });
        } else {
            this.setState({ isLoading: false, error: 'Tweet cannot be empty.', notification: false });
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <section>
                <h2>Tweet to the world</h2>

                { this.state.error ? <p className="alert alert-danger">{ this.state.error }</p> : '' }

                { this.state.message ? <p className="alert alert-success">{ this.state.message }</p> : '' }

                <form id="form-tweet" onSubmit={ this.onSubmit.bind(this) }>
                    <TextField
                        name="text"
                        value={ this.state.text }
                        onChange={ this.onChange.bind(this) }
                        floatingLabelText="What's happening?"
                        multiLine={ true }
                        rows={1}
                        fullWidth={ true }
                    />

                    <br/>

                    <RaisedButton label="Submit" type="submit" backgroundColor={ blue500 } labelColor="white" />
                </form>

                <Snackbar
                    open={this.state.notification}
                    message="Tweet has been posted"
                    autoHideDuration={4000}
                />
            </section>
        )
    }
}

Tweet.propTypes = {
    postTweet: React.PropTypes.func.isRequired
};

export default connect(null, { postTweet })(Tweet);