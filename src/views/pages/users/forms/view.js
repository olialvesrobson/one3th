import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Divider, FormControl, FormHelperText, Grid, Typography, useMediaQuery } from '@mui/material';

// third party
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import OneOutlinedTextInput from 'utils/OneOutlinedTextInput';
import OneTextInput from 'utils/OneTextInput';
import OneSelect from 'utils/OneSelect';
import { fetchUser } from '../actions';
import { UserState } from 'views/pages/authentication/actions';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FormView = ({ ...others }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    //const customization = useSelector((state) => state.customization);
    const getUser = UserState();
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    // const ausAbr = require('aus-abr');

    useEffect(() => {
        const companies = fetchUser({ user: getUser });
        console.log(companies);
    }, []);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">User account.</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    companyEmail: '',
                    numberOfEmployees: '',
                    companyName: '',
                    companyABN: ''
                }}
            >
                {({ errors, handleBlur, values }) => (
                    <form {...others}>
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
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FormView;
