import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { PassBookData, GetAirlineData, GetAirportData } from '../actions';
import '../App.css';
import axios from 'axios';

class AirportToAirport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            PhoneNumber: '',
            dateType: 'text',
            timeType: 'text',
            AirportPickup: '',
            AirlinePickup: '',
            PickupFlightNumber: '',
            PickupDate: '',
            ArrivalTime: '',
            AirportDropoff: '',
            AirlineDropoff: '',
            DropoffFlightNumber: '',
            DepartureTime: '',
            BookingType: 'ATA'
        }
    }

    validationForm() {
        const {
            AirportPickup,
            AirlinePickup,
            PickupFlightNumber,
            PickupDate,
            ArrivalTime,
            AirportDropoff,
            AirlineDropoff,
            DropoffFlightNumber,
            DepartureTime
        } = this.state;

        return (
            AirportPickup.length > 0 && AirlinePickup.length > 0 && PickupFlightNumber.length > 0 &&
            PickupDate.length > 0 && ArrivalTime.length > 0 && AirportDropoff.length > 0 &&
            AirlineDropoff.length > 0 && DropoffFlightNumber.length > 0 && DepartureTime.length > 0
        )
    }

    buttonSubmit() {
        return (
            <Link to="/atareview" style={{ color: 'black' }}>
                <button
                    className="btn btn-lg"
                    onClick={() => this.SubmitAirportToAirportData()}
                    type="button"
                    disabled={!this.validationForm()}
                    style={{ backgroundColor: 'yellow', width: '260px' }}>
                    Next
                 </button>
            </Link>
        )
    }

    SubmitAirportToAirportData() {
        let datas = [];
        datas.push(this.state);
        this.props.PassBookData(datas);
    }

    componentWillMount() {
        axios.get('https://el3ceo7dwe.execute-api.us-west-1.amazonaws.com/dev/handler/Airport-scan')
            .then((res) => {
                res.data.Myresult.sort(function (a, b) {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                });
                this.props.GetAirportData(res.data.Myresult);
            }).catch((err) => {
                console.log(err)
            })

        axios.get('https://el3ceo7dwe.execute-api.us-west-1.amazonaws.com/dev/handler/Airline-scan')
            .then((res) => {
                res.data.Myresult.sort(function (a, b) {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                });
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
        return (
            <div className="polaroid">
                <div className="container">
                    <div className="form-inline">
                        <div className="form-group">
                            <form align="center">
                                {/**
                                * Airport A Section
                                */}

                                <select
                                    className="form-control"
                                    style={{ height: '35px', width: '260px' }}
                                    onChange={event => this.setState({ AirportPickup: event.target.value })}>
                                    <option value="" selected disabled>Choose Airport for pickup</option>
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
                                    onChange={event => this.setState({ AirlinePickup: event.target.value })}>
                                    <option value="" selected disabled>Airline</option>
                                    {
                                        this.props.AirlineData.map((airline) => {
                                            return <option key={airline.id} value={airline.name}>{airline.name}</option>
                                        })
                                    }
                                </select>
                                <hr />
                                <div className="inner-addon left-addon">
                                    <i className="glyphicon glyphicon-plane" style={{ color: '#00bfff' }}></i>
                                    <input
                                        type="text"
                                        onChange={e => this.setState({ PickupFlightNumber: e.target.value })}
                                        placeholder="Flight Number"
                                        className="form-control"
                                        style={{ width: '260px' }}
                                    />
                                </div>
                                <hr />
                                <div className="inner-addon left-addon">
                                    <i className="glyphicon glyphicon-calendar" style={{ color: '#00bfff' }}></i>
                                    <input
                                        type={this.state.dateType}
                                        className="form-control"
                                        placeholder="Pick up Date"
                                        onChange={e => this.setState({ PickupDate: e.target.value })}
                                        onFocus={() => this.setState({ dateType: 'date' })}
                                        onBlur={() => this.setState({ dateType: 'text' })}
                                        style={{ width: '260px' }}
                                    />
                                </div>
                                <hr />
                                <div className="inner-addon left-addon">
                                    <i className="glyphicon glyphicon-time" style={{ color: '#00bfff' }}></i>
                                    <input
                                        type={this.state.timeType}
                                        placeholder="Estimated Time of Arrival"
                                        className="form-control"
                                        onChange={e => this.setState({ ArrivalTime: e.target.value })}
                                        onFocus={() => this.setState({ timeType: 'time' })}
                                        onBlur={() => this.setState({ timeType: 'text' })}
                                        style={{ width: '260px' }}
                                    />
                                </div>
                                {/**
                             * Airport B Section
                             */}
                                <hr />
                                <select
                                    className="form-control"
                                    style={{ height: '35px', width: '260px' }}
                                    onChange={event => this.setState({ AirportDropoff: event.target.value })}>
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
                                    onChange={event => this.setState({ AirlineDropoff: event.target.value })}>
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
                                        onChange={e => this.setState({ DropoffFlightNumber: e.target.value })}
                                        placeholder="Flight Number"
                                        className="form-control"
                                        style={{ width: '260px' }}
                                    />
                                </div>
                                <hr />
                                <div className="inner-addon left-addon">
                                    <i className="glyphicon glyphicon-time" style={{ color: '#e6e600' }}></i>
                                    <input
                                        type={this.state.timeType}
                                        placeholder="Departure Time"
                                        className="form-control"
                                        onChange={e => this.setState({ DepartureTime: e.target.value })}
                                        onFocus={() => this.setState({ timeType: 'time' })}
                                        onBlur={() => this.setState({ timeType: 'text' })}
                                        style={{ width: '260px' }}
                                    />
                                </div>
                                <hr />
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

export default connect(mapsStateToProps, { PassBookData, GetAirportData, GetAirlineData })(AirportToAirport);

