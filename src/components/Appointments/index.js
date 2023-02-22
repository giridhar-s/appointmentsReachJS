import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem/index'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isFilterActive: false}

  onTitleUpdate = event => {
    this.setState({title: event.target.value})
  }

  onDateUpdate = event => {
    this.setState({date: event.target.value})
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: v4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onFavorites = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive === true) {
      this.setState({isFilterActive: false})
    } else {
      this.setState({isFilterActive: true})
    }
    if (isFilterActive) {
      const starredAppointments = appointmentsList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
      this.setState({
        appointmentsList: starredAppointments,
      })
    } else {
      const unStarredAppointments = appointmentsList.filter(
        eachAppointment => eachAppointment.isFavorite === false,
      )
      this.setState({
        appointmentsList: unStarredAppointments,
      })
    }
  }

  render() {
    const {title, date, appointmentsList} = this.state
    return (
      <div className="container">
        <div className="appointments-container">
          <div className="top-section">
            <div className="form-container">
              <h1 className="heading">Add Appointment</h1>
              <form
                className="user-input-form"
                onSubmit={this.onAddAppointment}
              >
                <div className="input-container">
                  <label htmlFor="title">TITLE</label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    value={title}
                    className="user-input"
                    onChange={this.onTitleUpdate}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="date">DATE</label>
                  <input
                    type="date"
                    id="date"
                    placeholder="Title"
                    value={date}
                    className="user-input"
                    onChange={this.onDateUpdate}
                  />
                </div>
                <div className="button-container">
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="logo-img"
                alt="appointments"
              />
            </div>
          </div>

          <div className="bottom-section">
            <div className="heading-section">
              <h1 className="sub-heading">Appointments</h1>
              <button
                type="button"
                className="starred-button"
                onClick={this.onFavorites}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-section">
              {appointmentsList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  toggleIsFavorite={this.toggleIsFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
