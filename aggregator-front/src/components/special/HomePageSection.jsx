import React, { Component } from "react";
import PropTypes from "prop-types";

export default class HomePageSection extends Component {
    static propTypes = {
        heightCoefficient: PropTypes.string.isRequired,
        backgroundPicture: PropTypes.string.isRequired,
        textside: PropTypes.string.isRequired,
        sectionTitle: PropTypes.object.isRequired,
        description: PropTypes.object.isRequired,
        button: PropTypes.object
    };

    render() {
        return (
            <div
                className={
                    "w-full relative flex justify-center " +
                    this.props.heightCoefficient
                }
            >
                <img
                    src={this.props.backgroundPicture}
                    alt=""
                    className="absolute top-0 left-0 z-[-1] h-full w-full object-none brightness-50"
                />
                <div
                    className={
                        "w-5/6 my-2 flex " +
                        (this.props.textside === "right"
                            ? "justify-end"
                            : "justify-start")
                    }
                >
                    <div className="lg:w-1/2 w-full flex flex-col gap-4 justify-center">
                        {this.props.sectionTitle}
                        {this.props.description}
                        {this.props.button}
                    </div>
                </div>
            </div>
        );
    }
}
