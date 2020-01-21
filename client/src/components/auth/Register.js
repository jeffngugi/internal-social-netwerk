import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser, clearErrors } from '../../actions/authAction';
import { Redirect } from 'react-router-dom';

const Register = ({ registerUser, auth, errors, clearErrors }) => {
    //states
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        job_role: '',
        department: '',
        address: '',
        gender: ''
    });
    const { email, first_name, last_name, job_role, department, address, gender } = formData;

    useEffect(() => {
        clearErrors();
    }, [clearErrors])

    //****functions/methods */
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        registerUser(formData);
        if (!errors) {
            setFormData({
                email: '',
                first_name: '',
                last_name: '',
                job_role: '',
                department: '',
                address: '',
                gender: ''
            });
        }
    }


    const errorAlert = (

        Object.entries(errors).length === 0 ? null : <div className="alert alert-warning" role="alert">
            {errors}
        </div>

    )
    const successAlert = (
        Object.entries(auth.user).length === 0 ? null : <div className="alert alert-success" role="alert">
            {auth.user}
        </div>
    )

    const { isAuthenticated } = auth;
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <form className='form' onSubmit={e => onSubmit(e)} noValidate>

            <div className='RegisterForm'>
                {/* {errorAlert} */}
                {successAlert ? successAlert : errorAlert}
                <h3>
                    Get registered now
                </h3>
                <div className='form-group'>

                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        placeholder='Email' />
                </div>
                <div className='form-group'>

                    <input
                        type='text'
                        className='form-control'
                        id='first_name'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        placeholder='First Name' />
                </div>
                <div className='form-group'>

                    <input
                        type='text'
                        className='form-control'
                        id='last_name'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        placeholder='Last Name' />
                </div>
                <div className='form-group'>

                    <input
                        type='text'
                        className='form-control'
                        id='job_role'
                        name='job_role'
                        value={job_role}
                        onChange={e => onChange(e)}
                        placeholder='Job Role' />
                </div>
                <div className='form-group'>

                    <input
                        type='text'
                        className='form-control'
                        id='department'
                        name='department'
                        value={department}
                        onChange={e => onChange(e)}
                        placeholder='Department' />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        id='address'
                        name='address'
                        value={address}
                        onChange={e => onChange(e)}
                        placeholder='Address' />
                </div>
                <div className='form-group'>
                    <label>
                        Gender
                    </label>
                    <select name='gender' value={gender} onChange={e => onChange(e)}>
                        <option></option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>
                <input type='submit' className='btn btn-primary' value='Register' />
            </div>

        </form>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser, clearErrors })(Register);
