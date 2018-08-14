import axios from "axios";

 export function fetchContacts() {
  return function(dispatch) {
  dispatch({type: "FETCH_CONTACTS"});
    
    axios.get("http://demo2769628.mockable.io/contacts")
      .then((response) => {
        dispatch({type: "FETCH_CONTACTS_FULLFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_CONTACTS_REJECTED", payload: err})
      })
  }
}

export function filterBySerType(ser_typ) {
  console.log('filterBySerType',ser_typ)
  return {
    type: "filterBySerType",
    payload: ser_typ
          }
        }

/*export function setUserName(user_details) {
   console.log('console user actions',user_details)
  return {
   type: 'SET_USER_NAME',
    payload: user_details,
  }
}

export function setUserPwd(pwd) {
  return {
    type: 'SET_USER_PWD',
    payload: pwd,
  }
}
export function setUserdetails(name,pwd,email) {
  return {
    type: 'SET_USER_DETAILS',
    payload: {
    name,
    pwd,
    email
  }
  }
}
*/
