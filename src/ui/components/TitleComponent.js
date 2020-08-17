import React, {Component} from "react";
import Helmet from "react-helmet";

class TitleComponent extends Component {
    render() {
        let title = this.props.title;
        if (this.props.count > 0) {
            title = `[${this.props.count}] ${title}`
        }
        return (
            <Helmet>
                <title>{title}</title>
            </Helmet>
        )
    }
}

export default TitleComponent;
