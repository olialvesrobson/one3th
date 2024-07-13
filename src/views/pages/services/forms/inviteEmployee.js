import { useState, useEffect } from 'react';

// material-ui
import { Box, Button, FormHelperText, Grid, Typography } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import OneOutlinedTextInput from 'utils/OneOutlinedTextInput';
import OneSelect from 'utils/OneSelect';
import { fetchServicesById, inviteEmployee } from '../actions';
import { UserState } from 'views/pages/authentication/actions';
import { useDispatch, useSelector } from 'react-redux';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const InviteEmployeeToService = ({ ...others }) => {
    const scriptedRef = useScriptRef();
    //const customization = useSelector((state) => state.customization);
    const getUser = UserState();
    const serviceId = useSelector((state) => state.users.user.serviceEnrolled);
    const dispatch = useDispatch();
    const [saved, setSaved] = useState(false);
    const getService = useSelector((state) => state.services.service);
    // const ausAbr = require('aus-abr');

    useEffect(() => {
        setSaved(false);
        dispatch(fetchServicesById({ serviceId: serviceId }));
    }, [dispatch, getService, getUser, serviceId]);

    const roles = [
        { key: 'Admin', value: 'admin' },
        { key: 'Owner', value: 'owner' },
        { key: 'Employee', value: 'employee' },
        { key: 'Visitor', value: 'visitor' }
    ];

    function handleSave(values) {
        inviteEmployee({
            email: values.employeeEmail,
            role: values.employeeRole,
            serviceId: serviceId,
            serviceName: getService.name
        });
    }

    const renderSavedWithSuccess = () => {
        return (
            <Box>
                <h1>Saved successfully!</h1>
            </Box>
        );
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">
                            Please provide the email address of the person you would like to add to this service.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    employeeEmail: '',
                    employeeRole: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    console.log('submitting', values);
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <OneOutlinedTextInput
                            error={Boolean(touched.employeeEmail && errors.employeeEmail)}
                            layout="fullWidth"
                            label="Email"
                            id="outlined-adornment-employee-email"
                            name="employeeEmail"
                            type="email"
                            value={values.employeeEmail}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                            touched={
                                touched.employeeEmail &&
                                errors.employeeEmail && (
                                    <FormHelperText error id="standard-weight-helper-text-employee-email">
                                        {errors.employeeEmail}
                                    </FormHelperText>
                                )
                            }
                        />
                        <OneSelect
                            layout="fullWidth"
                            label="Role"
                            id="select-adornment-employeeRole"
                            name="employeeRole"
                            type="text"
                            value={values.employeeRole}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            items={roles}
                        />
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        handleSave(values);
                                    }}
                                >
                                    Invite
                                </Button>
                            </AnimateButton>
                        </Box>
                        {saved && renderSavedWithSuccess()}
                    </form>
                )}
            </Formik>
        </>
    );
};

export default InviteEmployeeToService;
