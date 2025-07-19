import { navigate } from "react-router-dom"
import PropTypes from "prop-types"

export default function Contact({id, email, username}) {
    const handeClick =  () => {
        navigate(`/contacts/${id}`)
    }

    return (
        <div onClick={handeClick}>
            <div>{username}</div>
            <div>{email}</div>
        </div>
    )
}

Contact.propTypes = {
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.username.isRequired
}