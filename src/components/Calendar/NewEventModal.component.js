
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, FormControl, FormGroup, Label} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
import Select from 'react-select';
import moment from 'moment';

export default class NewEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title         : "",
      date          : moment().format(),
      end_date      : moment().format(),
      type          : "Single",
      timeIn        : (7 * 3600),
      timeOut       : (7 * 3600) + (5 * 60),
      description   : "",
      recurringDays : []
    };
    this.processNewEvent = this.processNewEvent.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({title: "", description: "", startDate: moment(), endDate: moment(), recuringDays: []});
  }

  componentWillUpdate(nextProps, nextState) {
  }

  processNewEvent() {
    var evt = {id: -1, title: this.state.title, start: this.state.startDate.toDate(), end: this.state.endDate.toDate(), startTime: "00:00", endTime: "00:30", recurringDays: this.state.recurringDays, desc: this.state.description};
    this.props.addEvent(evt);
  }

	timeIn = (e) => {
		this.setState({timeIn: e});
	}

	timeOut = (e) => {
		this.setState({timeOut: e});
	}

  handleEndChange(date) {
    this.setState({endDate: date});
  }

  handleDate = (e) => {
    this.setState({date: moment(e).format()});
  }

  handleType = (e) => {
    console.log(e.target.value);
    if(this.state.type === "Single" && e.target.value !== "Single") {
      return this.setState({type: e.target.value, end_date: moment().format()});
    } else if(this.state.type !== "Single" && e.target.value === "Single") {
      return this.setState({type: e.target.value, date: moment().format()});
    }
    this.setState({type: e.target.value});
  }

  handleDaySelectChange = (e) => {
    console.log("Testing Recurring Days", e);
    this.setState({recurringDays: e});
  }

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.close}>
        <Modal.Header closeButton>New Calendar Event</Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label>Event Type:</Label>
            <FormControl componentClass="select" value={this.state.type} onChange={this.handleType}>
              <option value="Single">Single</option>
              <option value="Week">Weekly</option>
              <option value="BI">BI-Weekly</option>
              <option value="Month">Monthly</option>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <Label>Title:</Label>
            <FormControl placeholder="Your event title here..." onChange={(evt)=>{this.setState({title: evt.target.value})}}/>
          </FormGroup>

          <FormGroup>
            <Label>Description:</Label>
            <FormControl placeholder="Your event description here..." onChange={(evt)=>{this.setState({description: evt.target.value})}}/>
          </FormGroup>

          { this.state.type === "Single" && 
            <FormGroup>
              <Label>Event Date</Label>
              <DatePicker autoComplete="on" placeholder="Date" 
              value={this.state.date} onChange={this.handleDate} dateFormat="MM-DD-YYYY"/>
            </FormGroup>
          }
          { this.state.type !== "Single" && 
            <FormGroup>
              <Label>End Date: </Label>
              <DatePicker autoComplete="on" placeholder="Date" 
              value={this.state.end_date} onChange={this.endDate} dateFormat="MM-DD-YYYY"/>
            </FormGroup>
          }

          <FormGroup>
            <Label>Starting Time: </Label>
						<TimePicker value={this.state.timeIn} onChange={this.timeIn} step={5} start={'07:00 AM'} />
          </FormGroup>
          
          <FormGroup>
            <Label>Ending Time:</Label>
						<TimePicker value={this.state.timeOut} onChange={this.timeOut} step={5} start={'07:05 AM'} />
          </FormGroup>

          { (this.state.type === "Week" || this.state.type === "BI") && 
            <FormGroup>
            <Label>Recurring Days:</Label><Select multi options={[{label: "Sunday", value: 0}, {label: "Monday", value: 1}, {label: "Tuesday", value: 2}, {label: "Wednesday", value: 3}, {label: "Thursday", value: 4}, {label: "Friday", value: 5}, {label: "Saturday", value: 6}]} value={this.state.recurringDays} onChange={this.handleDaySelectChange} />
            </FormGroup>
          }
          <br/>
          <Button bsStyle="success" onClick={this.processNewEvent}>Add Event</Button>

        </Modal.Body>
      </Modal>

    );
  }
}

NewEventModal.defaultProps = {
  isOpen: false,
  toggleModal : null,
  addEvent: null
};

NewEventModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  addEvent: PropTypes.func
};

