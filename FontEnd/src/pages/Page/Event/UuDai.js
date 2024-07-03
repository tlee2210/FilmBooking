import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
    Button,
    Input,
} from "reactstrap";
import { Image } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getHomeActor } from "../../../slices/home/CelebrityHome/thunk";
import withRouter from "../../../Components/Common/withRouter";
import RightColumn from "../CinemaCorner/RightColumn";
import "../CinemaCorner/css/CinemaCorner.css";
import { createSelector } from "reselect";
import { getMovieActiveLimitIntroduce } from "../../../slices/home/MovieHome/thunk";
import MovieIsShowing from "../BuyTicket/MovieIsShowing";
import buttonTicket from "../../../assets/images/buttonTicket/btn-ticket.png";

const UuDai = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedOption, setSelectedOption] = useState("");

    const [pageNo, setPageNo] = useState(
        parseInt(searchParams.get("pageNo"), 10) || 1
    );
    const [pageSize, setPageSize] = useState(
        parseInt(searchParams.get("pageSize"), 10) || 10
    );
    const [country, setCountry] = useState(searchParams.get("country") || "");

    // getMovieActiveLimitIntroduce
    useEffect(() => {
        dispatch(getMovieActiveLimitIntroduce());
    }, [dispatch]);

    const CelebrityState = (state) => state;
    const CelebrityStateData = createSelector(CelebrityState, (state) => ({
        error: state.Message.error,
        messageError: state.Message.messageError,
        data: state.HomeCelebrity.data,
        selectOptions: state.HomeCelebrity.selectOptions,
        MovieIntroduce: state.HomeMovie.MovieIntroduce,
    }));

    const { error, messageError, data, selectOptions, MovieIntroduce } =
        useSelector(CelebrityStateData);

    useEffect(() => {
        let params = {};
        if (country && country !== null && country !== undefined) {
            params.country = country;
        }

        params.pageNo = pageNo;
        params.pageSize = pageSize;

        setSearchParams(params);
        dispatch(getHomeActor(country ? country : null, pageNo, pageSize));

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [dispatch, country, pageNo, pageSize]);

    const handlePagination = (page) => {
        const newPageNo = page + 1;
        setPageNo(newPageNo);
        setSearchParams({ country, page: newPageNo, pageSize });
        dispatch(getHomeActor(country, pageNo, pageSize));
    };

    const getPagination = (totalPages, currentPage) => {
        if (totalPages <= 1) {
            return [1];
        }

        let delta = 2;
        let range = [];
        let rangeWithDots = [];
        let l;

        range.push(1);
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i >= 2 && i < totalPages) {
                range.push(i);
            }
        }
        range.push(totalPages);

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots.filter(
            (item, index) => rangeWithDots.indexOf(item) === index
        );
    };

    const paginationItems = data
        ? getPagination(data.totalPages, data.number)
        : [];

    const handleSelectChange = (event) => {
        const selectedCountry = event.target.value;
        setSelectedOption(event.target.value);
        // console.log(selectedCountry);
        setCountry(selectedCountry);
        setPageNo(1);
        setSearchParams({ country: selectedCountry, pageNo: 1, pageSize });
        // dispatch(getHomeActor(country, 1, pageSize));
    };

    document.title = "Actor";

    return (
        <React.Fragment>
            <Container style={{ paddingTop: 100 }}>
                <div className="page-content">
                    <Container fluid>
                        <Row>
                            <Col lg={8}>
                                <div className="director-header-container-cinemaCorner">
                                    <Row className="align-items-center">
                                        <Col md="3" className="d-flex align-items-center">
                                            <div className="title-icon-cinemaCorner"></div>
                                            <h2 className="title-cinemaCorner">Ưu Đãi</h2>
                                        </Col>
                                    </Row>
                                    <div className="bottom-border"></div>
                                </div>

                            </Col>
                            <Col lg={4}>
                                <RightColumn />
                                <MovieIsShowing MovieIntroduce={MovieIntroduce} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default withRouter(UuDai);
