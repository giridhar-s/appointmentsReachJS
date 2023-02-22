import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {id, title, date, isFavorite} = appointmentDetails

  const onClickFavorite = () => {
    toggleIsFavorite(id)
  }

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div className="heading-section">
        <p className="appointment-name">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={onClickFavorite}
          data-testid="star"
        >
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="date-paragraph">{date}</p>
    </li>
  )
}

export default AppointmentItem
