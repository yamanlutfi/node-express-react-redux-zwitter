// Imports
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// UI Imports
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// App Imports
import { userLogout } from '../../../actions/user';

class UserButtonLogged extends Component {
    constructor() {
        super();

        this.state = {
            notification: false,
            loggedOut: false
        };
    }

    logout(event) {
        event.preventDefault();

        this.props.userLogout();
    }

    render() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon color="white"/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <Link to="/tweet"><MenuItem primaryText="Tweet"/></Link>
                <MenuItem primaryText="Sign out" onClick={ this.logout.bind(this) }/>
            </IconMenu>
        );
    }
}

UserButtonLogged.propTypes = {
    userLogout: React.PropTypes.func.isRequired,
};

export default connect(null, { userLogout })(UserButtonLogged);