import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import AppFrame from '../components/AppFrame';
import CustomerData from '../components/CustomerData';
import CustomerEdit from '../components/CustomerEdit';
import { getCustomerByDni } from '../selectors/customers';
import withRouter from 'react-router-dom/withRouter';
import { fetchCustomers } from '../actions/fetchCustomers';
import { updateCustomer } from '../actions/updateCustomer';

class CustomerContainer extends Component {
    componentDidMount() {
        if(!this.props.customer){
            this.props.fetchCustomers();
        }
    }
    handleSubmit = values => {
        const { id } = values;
        return this.props.updateCustomer(id, values);
    }
    handleOnBack = () => {
        this.props.history.goBack();
    }
    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }
    renderBody = () => (
        <Route path="/customer/:dni/edit" 
            children={({ match }) => 
                    {
                        if(this.props.customer){
                            const CustomerControl = match ? CustomerEdit : CustomerData;
                            return (<CustomerControl {...this.props.customer} 
                                        onSubmit={this.handleSubmit}
                                        onSubmitSuccess={this.handleOnSubmitSuccess}
                                        onBack={this.handleOnBack}  />)  
                        }
                        return null;
                        
                    }
                 }  
        />
    )
    // <p>Datos del cliente "{this.props.customer.name}" </p>
    render(){
        return (
            <div>
                <AppFrame 
                    header={`Cliente ${this.props.dni}`}
                    body={this.renderBody()}/>
            </div>
        );
    }
};


CustomerContainer.propTypes = {
    dni: PropTypes.string.isRequired,
    customer: PropTypes.object,
    fetchCustomers: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    customer: getCustomerByDni(state, props)
})
export default withRouter(connect(mapStateToProps, { fetchCustomers, updateCustomer })(CustomerContainer));
