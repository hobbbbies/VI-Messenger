import PropTypes from "prop-types"
import PendingContact from "./PendingContact"
import styles from './PendingDropdown.module.css'

export default function PendingDropdown({pendingContacts, setPendingContacts}) {
    return (
        <ul className={styles.contactList}>
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
            {!pendingContacts.length && <p className={styles.noPending}>No Pending Contacts</p>}
        </ul>
    )
}

PendingDropdown.propTypes = {
    pendingContacts: PropTypes.array
}