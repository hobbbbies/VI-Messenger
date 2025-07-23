import PropTypes from "prop-types"
import PendingContact from "./PendingContact"

export default function PendingDropdown({pendingContacts, setPendingContacts}) {
    return (
        <ul>
            {pendingContacts.map(contact => {
                // Create way to delete pending contact
                return <PendingContact 
                        key={contact.id}
                        contactId={contact.id} 
                        username={contact.username} 
                        email={contact.email}
                        pendingContacts={pendingContacts}
                        setPendingContacts={setPendingContacts}
                        />
            })} 
        </ul>
    )
}

PendingDropdown.propTypes = {
    pendingContacts: PropTypes.array
}