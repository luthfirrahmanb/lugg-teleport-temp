import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { PassBookData, GetAirlineData, GetAirportData } from '../actions'
import '../App.css';
import axios from 'axios';
import * as moment from 'moment';
import PlacesAutocomplete from 'react-places-autocomplete';
import { inputProps, OrderASC } from './helper';
import { TimePicker, DatePicker } from 'antd';

class HotelToAirport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            PhoneNumber: '',
            Hotel: '',
            Airport: '',
            Airline: '',
            HotelBookingRef: '',
            NameUnderHotelRsv: localStorage.getItem('CustName'),
            PickupDatetime: null,
            FlightNumber: '',
            DepartureTime: '',
            BookingType: 'HTA'
        }

        this.handleChangeDateTime = this.handleChangeDateTime.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
        this.onChange = (Hotel) => this.setState({ Hotel });
    }

    handleChangeDateTime(dateTime) {
        this.setState({
            PickupDatetime: dateTime
        });
    }

    handleTime(time) {
        this.setState({
            DepartureTime: time
        });
    }

    disabledDate(current) {
        return current && current < moment().endOf('day');
    }

    ValidationForm() {
        const {
            Hotel,
            Airport,
            Airline,
            HotelBookingRef,
            NameUnderHotelRsv,
            PickupDatetime,
            FlightNumber,
            DepartureTime,
        } = this.state

        return (
            Hotel.length > 0 && Airport.length > 0 && Airline.length > 0
            && HotelBookingRef.length > 0 && FlightNumber.length > 0
        )
    }

    buttonSubmit() {
        return (
            <Link to="/addluggage" style={{ color: 'black' }}>
                <button
                    className="btn btn-lg"
                    onClick={() => this.SubmitHotelToAirportData()}
                    type="button"
                    style={{ backgroundColor: 'yellow', width: '260px' }}
                    disabled={!this.ValidationForm()}
                >
                    Next
                </button>
            </Link>
        )
    }

    SubmitHotelToAirportData() {
        let datas = [];
        datas.push(this.state);
        this.props.PassBookData(datas);
    }

    componentWillMount() {
        axios.get('https://el3ceo7dwe.execute-api.us-west-1.amazonaws.com/dev/handler/Airport-scan')
            .then((res) => {
                OrderASC(res.data.Myresult, 'string');
                this.props.GetAirportData(res.data.Myresult);
            }).catch((err) => {
                console.log(err)
            })

        axios.get('https://el3ceo7dwe.execute-api.us-west-1.amazonaws.com/dev/handler/Airline-scan')
            .then((res) => {
                OrderASC(res.data.Myresult, 'string');
                this.props.GetAirlineData(res.data.Myresult);
            }).catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        const { Email, PhoneNumber } = this.props.user;
        this.setState({ Email, PhoneNumber })
    }

    render() {
        const CustomerName = localStorage.getItem('CustName');
        return (
            <div className="polaroid">
                <div className="container">
                    <div className="form-inline">
                        <div className="form-group">
                            {/**
                         * Hotel Section
                         */}
                            <form align="center">

                                <PlacesAutocomplete
                                    inputProps={inputProps(this.state.Hotel, this.onChange, 'Search Hotel for Pick Up')}
                                />

                                <hr />
                                <div className="inner-addon left-addon">
                                    <i className="glyphicon glyphicon-home" style={{ color: '#00bfff' }}></i>
                                    <input
                                        type='text'
                                        onChange={e => this.setState({ HotelBookingRef: e.target.value })}
                                        placeholder="Hotel Booking Reference"
                                        className="form-control"
                                        style={{ width: '260px' }}
                                    />
                                </div>
                                <hr />
                                <div className="inner-addon left-addon">
                                    <i className="glyphicon glyphicon-user" style={{ color: '#00bfff' }}></i>
                                    <input
                                        defaultValue={CustomerName}
                                        type='text'
                                        onChange={e => this.setState({ NameUnderHotelRsv: e.target.value })}
                                        placeholder="Name under Hotel Reservation"
                                        className="form-control"
                                        style={{ width: '260px' }}
                                    />
                                </div>
                                <hr />
                                <DatePicker
                                    format="YYYY-MM-DD HH:mm"
                                    disabledDate={this.disabledDate}
                                    onChange={this.handleChangeDateTime}
                                    placeholder="Pick up Date and Time"
                                    style={{width: '260px'}}
                                    showTime={{ defaultOpenValue: moment() }}
                                />
                                <hr />
                                {
                                    /**
                                     * Airport Section
                                     */
                                }

                                <select
                                    className="form-control"
                                    style={{ height: '35px', width: '260px' }}
                                    onChange={event => this.setState({ Airport: event.target.value })}>
                                    <option value="" selected disabled>Choose Airport for Drop off</option>
                                    {
                                        this.props.AirportData.map((airport) => {
                                            return <option key={airport.id} value={airport.name}>{airport.name}</option>
                                        })
                                    }
                                </select>

                                <hr />
                                <select
                                    className="form-control"
                                    style={{ height: '35px', width: '260px' }}
                                    onChange={event => this.setState({ Airline: event.target.value })}>
                                    <option value="" selected disabled>Airline</option>
                                    {
                                        this.props.AirlineData.map((airline) => {
                                            return <option key={airline.id} value={airline.name}>{airline.name}</option>
                                        })
                                    }
                                </select>

                                <hr />
                                <div className="inner-addon left-addon">
                                    <i className="glyphicon glyphicon-plane" style={{ color: '#e6e600' }}></i>
                                    <input
                                        type="text"
                                        onChange={e => this.setState({ FlightNumber: e.target.value })}
                                        placeholder="Flight Number"
                                        className="form-control"
                                        style={{ width: '260px' }}
                                    />
                                </div>
                                <hr />
 
                                <TimePicker
                                    onChange={this.handleTime}
                                    defaultOpenValue={moment()}
                                    style={{ width: '260px' }}
                                    placeholder="Departure Time"
                                    format="HH:mm" />
                                {
                                    this.buttonSubmit()
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapsStateToProps(state) {
    const { user, AirportData, AirlineData } = state;
    return {
        user,
        AirportData,
        AirlineData
    }
}

export default connect(mapsStateToProps, { PassBookData, GetAirlineData, GetAirportData })(HotelToAirport);