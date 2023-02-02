import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Divider, FormControl, FormHelperText, Grid, Typography, useMediaQuery } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import OneOutlinedTextInput from 'utils/OneOutlinedTextInput';
import OneTextInput from 'utils/OneTextInput';
import OneSelect from 'utils/OneSelect';
import { add } from '../actions';
import { UserContext } from 'views/pages/users/actions';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FormAdd = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    //const customization = useSelector((state) => state.customization);
    const user = useContext(UserContext);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [saved, setSaved] = useState(false);
    // const ausAbr = require('aus-abr');

    useEffect(() => {
        setLevel(0);
        setStrength(0);
        setSaved(false);
    }, []);

    const dataNumberOfEmployees = [
        { key: '1-2', value: '1-2' },
        { key: '3-10', value: '3-10' },
        { key: '11-25', value: '11-25' },
        { key: '25-50', value: '25-50' },
        { key: '+50', value: '+50' }
    ];

    function handleSave(values) {
        add({
            name: values.companyName,
            email: values.companyEmail,
            abn: values.companyABN,
            numberOfEmployees: values.numberOfEmployees,
            owner: user.uid,
            userName: user.firstName + ' ' + user.lastName
        });
        <Navigate to="/companies" />;
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
                        <Typography variant="subtitle1">Follow the fields and click Save.</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    companyEmail: '',
                    numberOfEmployees: '',
                    companyName: '',
                    companyABN: '',
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
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <OneTextInput
                                label="Company Name"
                                id="outlined-adornment-companyName-register"
                                name="companyName"
                                type="text"
                                value={values.companyName}
                                defaultValue=""
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            <OneTextInput
                                label="Company ABN"
                                id="outlined-adornment-companyABN-register"
                                name="companyABN"
                                type="number"
                                value={values.companyABN}
                                defaultValue=""
                                onChange={handleChange}
                                inputProps={{}}
                            />
                        </Grid>

                        <OneOutlinedTextInput
                            error={Boolean(touched.email && errors.email)}
                            layout="fullWidth"
                            label="Email Address"
                            id="outlined-adornment-email-register"
                            name="companyEmail"
                            type="email"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                            touched={
                                touched.email &&
                                errors.email && (
                                    <FormHelperText error id="standard-weight-helper-text--register">
                                        {errors.email}
                                    </FormHelperText>
                                )
                            }
                        />

                        <Divider />
                        <OneSelect
                            layout="fullWidth"
                            label="Number of Employees"
                            id="select-adornment-numberofEmployees-register"
                            name="numberOfEmployees"
                            type="text"
                            value={values.numberOfEmployees}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            items={dataNumberOfEmployees}
                        />

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}
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
                                    Save
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

export default FormAdd;
