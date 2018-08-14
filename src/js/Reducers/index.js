import { combineReducers } from "redux"

//import items from "./tweetsReducer"
import filter from "./filterReducer"
import contacts from "./userreducer"


export default combineReducers({
	filter: filter,
	contacts: contacts
 
})
