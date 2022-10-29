import React, { Component } from "react";
import PropTypes from "prop-types";
import { EffectCards } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../components/Loader";
import axios from "axios";
import "../css/index.css";
import "swiper/swiper-bundle.min.css";
import hairWomanPictureUrl from "../static/pictures/hair_woman.jpg";
import hairManPictureUrl from "../static/pictures/hair_man.jpg";
import manicurePictureUrl from "../static/pictures/manicure.jpg";
import makeupPictureUrl from "../static/pictures/makeup.jpg";
import SwiperElement from "../components/special/SwiperElement";
import ServiceSublist from "../components/ServiceSublist";

export default class Services extends Component {
    static propTypes = {
        services: PropTypes.array,
        chosenService: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.sublistChild = React.createRef();
        this.state = {
            isLoading: true,
            chosenService: {},
            services: [
                {
                    id: 0,
                    title: "Женские стрижки",
                    iconPictureUrl: hairWomanPictureUrl
                },
                {
                    id: 1,
                    title: "Мужские стрижки",
                    iconPictureUrl: hairManPictureUrl
                },
                {
                    id: 2,
                    title: "Маникюр",
                    iconPictureUrl: manicurePictureUrl
                },
                {
                    id: 3,
                    title: "Макияж",
                    iconPictureUrl: makeupPictureUrl
                }
            ]
        };
    }

    getAllServices() {
        axios
            .get("https://www.google.com/", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
            .then((response) => {
                // add filling the services list
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                });
            });
    }

    componentDidMount() {
        this.getAllServices();
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="min-h-screen text-white flex justify-center">
                <div className="w-11/12 px-4 mt-20 h-full">
                    {this.state.isLoading ? (
                        <Loader
                            color="#111827"
                            height={100}
                            isOnFullScreen={true}
                        />
                    ) : (
                        <>
                            <div className="flex flex-col lg:flex-row justify-around items-center gap-8 mb-20">
                                <div className="text-center md:text-left lg:w-2/5 w-full">
                                    <h1 className="xl:text-6xl md:text-5xl text-4xl text-gray-500">
                                        Услуги
                                    </h1>
                                    <h2 className="xl:text-3xl md:text-2xl text-xl text-gray-400 mt-4">
                                        Здесь можно разместить полезную
                                        информацию об оказываемых услугах или
                                        какую-то другую полезную информацию.
                                    </h2>
                                </div>
                                <div className="mx-0">
                                    <Swiper
                                        effect={"cards"}
                                        id="swiper-color"
                                        slidesPerView={1}
                                        loop={true}
                                        modules={[EffectCards]}
                                        className="xl:w-[26vw] lg:w-[34vw] sm:w-[50vw] w-[65vw] min-w-[20vw] min-h-[10vh] max-h-[80vh] rounded-lg overflow-hidden"
                                    >
                                        {this.state.services.map((service) => (
                                            <SwiperSlide key={service.id}>
                                                <SwiperElement
                                                    picture={
                                                        <img
                                                            src={
                                                                service.iconPictureUrl
                                                            }
                                                            alt="men's haircuts"
                                                            className="z-[-1] object-cover overflow-hidden"
                                                        />
                                                    }
                                                    elementTitle={
                                                        <p>{service.title}</p>
                                                    }
                                                    agreeHandler={() => {
                                                        this.sublistChild.current.getServiceById(
                                                            service.id
                                                        );
                                                        this.setState(() => ({
                                                            chosenService:
                                                                service
                                                        }));
                                                    }}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            <ServiceSublist
                                ref={this.sublistChild}
                                chosenService={this.state.chosenService}
                            />
                        </>
                    )}
                </div>
            </div>
        );
    }
}
