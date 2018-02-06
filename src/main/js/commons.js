'use strict';

import React, {Component} from 'react'
import {Helmet} from "react-helmet"

export default class Header extends Component {

    render() {
        return (
            <nav>
                <Helmet>
                    <title>{this.props.title}</title>
                </Helmet>
            </nav>
        )
    }
}
