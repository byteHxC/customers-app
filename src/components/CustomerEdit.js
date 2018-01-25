import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import CustomersActions from './CustumersActions';

const isRequired = value => (
    !value && "Este campo es requerido"
);
const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser un número"
)
const validate = values => {
    const error = {};
    if(!values.name){
        error.name = "El campo nombre es requerido";
    }
    if(!values.dni){
        error.dni = "El Dni es un campo obligatorio";
    }

    return error;
}
const MyField = ({ input, meta, type, label, name }) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input {...input} type={!type ? 'text' : type}/>
        { meta.touched && meta.error &&  <span>{meta.error}</span>}
    </div>
);
const toNumber = value => value && Number(value);
const onlyGrow = (value, previousValues, values) => 
    value && previousValues && (value > previousValues ? value : previousValues)
const CustomerEdit = ({ name, dni, age, handleSubmit, submitting, onBack }) => {
    return (
        <div>
            <h2>Edición del cliente</h2>
            <form onSubmit={handleSubmit}>
                    <Field 
                        name="name" 
                        label="Nombre"
                        component={MyField} 
                        validate={isRequired}></Field>
                    <Field 
                        name="dni" 
                        label="Dni"
                        component={MyField} 
                        type="text"
                        validate={[isRequired, isNumber]}></Field>
                    <Field 
                        name="age" 
                        label="Edad"
                        component={MyField}
                        type="number"
                        validate={isNumber}
                        parse={toNumber}
                        normalize={onlyGrow}
                        ></Field>
                    <CustomersActions>
                        <button type="submit" disable={submitting.toString()}>Aceptar</button>
                        <button onClick={onBack}>Cancelar</button>
                    </CustomersActions>
            </form>
        </div>
    );
};

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired,
};

const CustomerEditForm = reduxForm({ 
    form: 'CustomerEdit' ,
    validate
    })(CustomerEdit);
export default setPropsAsInitial(CustomerEditForm);
