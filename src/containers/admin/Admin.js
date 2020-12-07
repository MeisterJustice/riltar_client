import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';

class Admin extends Component {
    render() {
        if (isMobile) {
            return (
                <div>Admin Page on Mobile</div>
            )
        }
        return (
            <div>Admin Page on PC</div>
        )
    }
}

export default Admin;