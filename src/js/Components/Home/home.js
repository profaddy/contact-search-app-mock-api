/* 
*******************************************Home Component Overview***********************************

 This is the wrapper Component in which is calling below Child components 
 1) Serachbar -> Home component will call  Searchbar Module passing 'handleOnSearch' function
   as props
 2) Contactlist Component is being called passing current search term value recieving from Searchbar 
 as props
 
 handleOnSearch -> This function will recieve user input and will filter out the results based 
 on user input. the filtered out contacts based on search term will be stored in the internal state
 and will be passed as props to the ContacList Component.
*****************************************************************************************************
*/

import React, { Component } from "react";
import Searchbar from '../Searchbar/Searchbar';
//import contact from  "../../../../src/contact/contacts.json"
import ContactList from "../../Components/ContactList/ContactList"
import _ from "lodash"
import { connect } from 'react-redux'
import {bindActionCreators} from "redux"
import {fetchContacts} from '../../Actions/userActions'
import '../../../style.css'


class Home extends React.Component {

	constructor(props){
		super(props);
		this.state={

			sel_contact:[],
			applyFilter: false
		};
	
		this.handleOnSearch.bind(this);
		}

		
componentDidMount(){

	 this.props.dispatch(fetchContacts());
}



handleOnSearch(ser_term){

		var sel_contact = this.props.contact.filter((item) => {

			var query_term = new RegExp(ser_term,'i');
			
			if (this.props.filter.ser_typ === 'name'){
				var resp_fname = query_term.test(item.general.firstName)
				var resp_lname = query_term.test(item.general.lastName)
			return resp_fname || resp_lname
			}else if(this.props.filter.ser_typ === 'designation'){
				var resp_title = query_term.test(item.job.title)
				return resp_title
			}else if(this.props.filter.ser_typ === 'company'){
				var resp_comp = query_term.test(item.job.company)
				return resp_comp
			}else if(this.props.filter.ser_typ === 'email'){
				var resp_email = query_term.test(item.contact.email)
				return resp_email
			}
			else if(this.props.filter.ser_typ === 'phone'){
				var resp_phone = query_term.test(item.contact.phone)
				return resp_phone
			}else{
				var resp_fname = query_term.test(item.general.firstName)
				var resp_lname = query_term.test(item.general.lastName)
				var resp_comp = query_term.test(item.job.company)
				var resp_title = query_term.test(item.job.title)
				var resp_email = query_term.test(item.contact.email)
				var resp_phone = query_term.test(item.contact.phone)
				return resp_fname || resp_lname || resp_comp || resp_title || resp_comp || resp_email || resp_phone
			}
			
			/*if (resp_fname || resp_lname || resp_email || resp_phone|| resp_comp ||resp_title === true){
				return true
			}else{
				return false
			}*/
	

		})


		this.setState({sel_contact : sel_contact})
		this.setState({applyFilter : true})
}

 render() {
 	
 	// Initialize sel_contact state to show data when user has just visited the page
	if (this.state.sel_contact.length === 0 && this.state.applyFilter === false)
	 	{
	 		this.state.sel_contact = this.props.contact
	 	}
 	
 	let content
 	let contactprops = this.props.contactProps
 	
 	if(contactprops.fetching_error === true){

 		content = 
 		<div> Ooops! it seems error fetching data, Visit again 
 		in few minutes we are working to fix the issue at the earliest 
 		
 		</div>
 		
 	}else if (contactprops.fetching === true){

 		content = 
 		<div>Loading..</div>

 	}else{

 		content = 
 		<ContactList contacts = {this.state.sel_contact} history = {this.props.history}/> 
 	}

					

    return (

		<div class='container no-gutters'>
			<div class='row'>

				<div className='Login-wrapper col-sm-12 justify-content-center'>
						<Searchbar handleonSearch = {_.debounce((ser_term) => {this.handleOnSearch(ser_term)}, 300)}/>  
				</div>	

			 	 <div className='Login-wrapper col-sm-12 justify-content-center'>
						{content}
				</div>
			</div>   
		</div>
    );
  }
}

const mapStateToProps = state =>  ({

	filter :state.filter.filter,
	contact:state.contacts.contacts,
	contactProps:state.contacts
});

const mapDispatchToProps = (dispatch) => {
  
  return bindActionCreators({
    fetchContacts: fetchContacts
  }, dispatch);
};


export default connect(mapStateToProps)(Home);
