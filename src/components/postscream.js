import React from 'react'
import {GrFormAdd} from 'react-icons/gr';

// REDUX
import {connect} from 'react-redux';
import {addScream} from './redux/actions/dataActions.js';

class postscream extends React.Component {
	constructor(props){
		super(props);

		this.state ={
			open:false,
			body : '',
			errors : {}
		};
	};

	static getDerivedStateFromProps(nextProps,prevState){ //update our internal state due to changes in props
		// only returns an obj //cant access the this keyword here
		if(nextProps.UI.errors){
			return {errors : nextProps.UI.errors}
		}
		else{
			return null;
		}
	};

	componentDidUpdate(prevProps){
		if(prevProps.UI.errors !== this.props.UI.errors){
			this.setState({
				errors : prevProps.UI.errors
			});
		}
	};

	handleOpen = ()=>{
		this.setState({
			open : true
		})
	};
	handleClose = ()=>{
		this.setState({
			open : false
		})
	};

	handleChange =(e)=>{
		this.setState({
			[e.target.name] : e.target.value
		})
	};

	handleSubmit =(e)=>{
		e.preventDefault();
		const newScream ={
			body : this.state.body
		};

		this.props.addScream(newScream);
		this.handleClose();
	};

	render() {
		const {errors} = this.state;
		// console.log(errors);
		const {UI:{loading}} = this.props;

		const inputStyle = {
			borderTop : "none",
			borderLeft : "none",
			borderRight : "none"
		};
		return (
			<div className="nav-item nav-link">
			<button className="btn btn-sm btn-light" data-target="#addDetails" 
			data-toggle="modal" onClick={this.handleOpen}><GrFormAdd /></button>
			<div className="modal" id="addDetails" role="dialog">
		  <div className="modal-dialog modal-dialog-centered" role="document" >
		    <div className="modal-content">
		      <div className="modal-header">
		        <h5 className="modal-title text-info">Add scream</h5>
		        <button type="button" className="close" data-dismiss="modal" 
		        onClick={this.handleClose} aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		   
		      <div className="modal-body">
		        <input name="body" value={this.state.body} className="form-control"
		        onChange={this.handleChange} placeholder="type here" style={inputStyle}/>
		      </div>
		      <div className="modal-footer">
        <button type="submit" className="btn btn-sm btn-info" data-dismiss="modal"
        	onClick={this.handleSubmit}>Post scream</button>
      </div>
     
    </div>
  </div>
</div>
</div>
		)
	}
}

const mapStateToProps = (state)=>({
	data : state.data,
	UI : state.UI
});

const mapActionsToProps = {
	addScream
}
export default connect(mapStateToProps,mapActionsToProps)(postscream);