import { useEffect, useState } from "react"
import PendingDropdown from '../Dropdown/PendingDropdown'
import { fetchDataViaAuth } from "../../../helpers/fetchData";

export default function Pending() {
    const [pendingContacts, setPendingContacts] = useState([]);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => {
        setDropdown(!dropdown);    
    };

    useEffect(() => {
        fetchDataViaAuth('/contacts/pending')
            .then(data => {
                setPendingContacts(data.data);
            })
            .catch(error => {
                console.error('Failed to fetch pending contacts:', error);
            });
    }, []);
    
    return (
        <div>
            <div>{pendingContacts.length}</div>
            <button onClick={handleClick}>Show Pending</button>
            {dropdown && <PendingDropdown pendingContacts={pendingContacts} setPendingContacts={setPendingContacts}/>}
        </div>
    );
}