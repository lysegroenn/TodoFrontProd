import React, { Component } from 'react';


class Header extends React.Component {

    render() {
        return (
            <div className="header-div">
                <h1>This is the Header.</h1>
                {this.props.user.googleId === '' ? 
                    <div>
                        <button onClick={e => window.open("http://www.lysegroenn.com/auth/google/", "_self")}>Log in with Google</button>
                    </div>
                :
                    <div>
                        <p>Logged in as: {this.props.user.displayName}</p>
                        <button onClick={e => this.props.logoutUser()}>Log Out</button>
                    </div>
                }
            </div>
        )
    }
}


export default Header;
