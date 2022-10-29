import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { AiOutlineRight } from "react-icons/ai";

export default class SwiperElement extends Component {
    static propTypes = {
        picture: PropTypes.object.isRequired,
        elementTitle: PropTypes.object.isRequired,
        agreeHandler: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="relative flex flex-col justify-end items-center max-w-full">
                <div className="max-h-[80vh] overflow-hidden rounded-lg">
                    {this.props.picture}
                </div>
                <div className="absolute bottom-0 left-0 bg-gray-800 w-full text-left text-xl sm:text-[1.5rem] max-h-min text-primary-color py-7 px-4 sm:whitespace-nowrap rounded-lg overflow-hidden flex justify-between">
                    {this.props.elementTitle}
                    <button
                        onClick={this.props.agreeHandler}
                        className="choise-button invisible flex justify-center items-center hover:text-green-400 duration-100 transition-colors cursor-pointer text-xl"
                    >
                        <p>Перейти</p>
                        <AiOutlineRight />
                    </button>
                </div>
            </div>
        );
    }
}
