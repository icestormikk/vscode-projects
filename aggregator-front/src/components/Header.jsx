import "../css/index.css";
import { Component, React } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            links: [
                { name: "Услуги", url: "/services" },
                { name: "О нас", url: "/about" },
                { name: "Сертификаты", url: "/sertificates" },
                { name: "Контакты", url: "/contacts" },
                { name: "Работы", url: "/jobs" }
            ]
        };
        this.handleListOpen = this.handleListOpen.bind(this);
    }

    handleListOpen() {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        return (
            <nav className="w-full bg-primary-color relative z-1">
                <div
                    className={
                        "lg:flex relative items-center justify-between py-6 lg:px-10 px-7 "
                    }
                >
                    <Link
                        to="/"
                        className="font-bold text-3xl flex items-center text-secondary-color w-max"
                    >
                        {this.props.companyName}
                    </Link>
                    {this.state.isOpen ? (
                        <AiOutlineClose
                            onClick={this.handleListOpen}
                            className="navbar-buttons"
                        />
                    ) : (
                        <GiHamburgerMenu
                            onClick={this.handleListOpen}
                            className="navbar-buttons"
                        />
                    )}
                    <div className="absolute z-10 left-0 lg:static w-full lg:w-max">
                        <ul
                            className={
                                "text-3xl lg:flex lg:items-center bg-gray-100 lg:gap-10 lg:static lg:w-auto lg:px-0 lg:pb-0 text-secondary-color px-9 pb-4 transition-all duration-75 ease-in " +
                                (this.state.isOpen
                                    ? "top-20 opacity-100"
                                    : "top-[-490px] lg:opacity-100 opacity-0")
                            }
                        >
                            {this.state.links.map((link) => (
                                <li
                                    key={link.name}
                                    className={
                                        'cursor-pointer my-4 lg:my-0 before:content-[""] before:h-[2px] before:w-0 hover:before:w-full relative before:absolute before:right-0 hover:before:left-0 hover:before:right-auto before:bottom-0 before:bg-gray-800 before:transition-all before:duration-200 ' +
                                        (this.state.isOpen
                                            ? "text-2xl"
                                            : "text-xl")
                                    }
                                >
                                    <Link
                                        onClick={this.handleListOpen}
                                        to={link.url}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
