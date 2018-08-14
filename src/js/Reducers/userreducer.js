export default function reducer(state={
    contacts: [],
    fetching: true,
    fetching_error:false,
    fetched: false,
    error: null,
    
  }, action) {

    switch (action.type) {
      
      case "FETCH_CONTACTS_FULLFILLED": {

        return {
          ...state,
          fetching: false,
          fetched: true,
          contacts: action.payload,
        }
        
      }
      case "FETCH_CONTACTS_REJECTED": {
         
          let newState = {...state}
          newState.error = action.payload
          newState.fetching_error = true,
          newState.fetching = false
          return newState
      }
      
    }

    return state
}
/*export default function reducer(state={
    user: {
  
      redirectToReferrer:false,

    },

    list:[],
    isLoggedin:false,
    
  }, action) {

    switch (action.type) {


     
      case "FETCH_USER": {

        return {
          ...state,isLoggedin: true,
          user: {...state.user,redirectToReferrer: true},
        }

      }
      

      case "SET_USER_NAME": {
       
          let temp = JSON.parse(localStorage.getItem('user_list'));
          temp.push(action.payload)
          localStorage.setItem('user_list',JSON.stringify(temp));
         
      }


}


    return state

}*/
