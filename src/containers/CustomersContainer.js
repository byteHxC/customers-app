import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import AppFrame from '../components/AppFrame';
import CustomerList from '../components/CustomerList';
import CustomersActions from '../components/CustumersActions';

import { fetchCustomers } from '../actions/fetchCustomers';
import { getCustomers } from '../selectors/customers';

class CustomersContainer extends Component {
    renderBody = customers => (
        <div>
            <CustomerList 
                customers={customers}
                urlPath={`customer/`}
                />
            <CustomersActions>
                <button onClick={this.handleAddNew}>Nuevo cliente</button>
            </CustomersActions>
        </div>
    )
    handleAddNew = () => {
        this.props.history.push('/customers/new');
    }
    componentDidMount(){
        this.props.fetchCustomers();
    }
    render() {
        return (
            <div>
                <AppFrame 
                    header='Listado de clientes'
                    body={this.renderBody(this.props.customers)}/>
            </div>
        );
    }
}


CustomersContainer.propTypes = {
    fetchCustomers: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired
};
CustomersContainer.defaultProps = {
    customers: []
}
const mapStateToProps = state => ({
    customers: getCustomers(state)
});

export default withRouter(connect(mapStateToProps, { fetchCustomers })(CustomersContainer));
