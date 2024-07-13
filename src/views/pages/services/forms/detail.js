import { useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Divider, Grid, Typography, useMediaQuery } from '@mui/material';

// third party
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import OneOutlinedTextInput from 'utils/OneOutlinedTextInput';
import OneTextInput from 'utils/OneTextInput';
import OneSelect from 'utils/OneSelect';
import { UserState } from 'views/pages/authentication/actions';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const Detail = ({ ...others }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    //const customization = useSelector((state) => state.customization);
    const getUser = UserState();
    // const ausAbr = require('aus-abr');

    useEffect(() => {
        console.log(getUser);
    }, [getUser]);

    const dataNumberOfEmployees = [
        { key: '1-2', value: '1-2' },
        { key: '3-10', value: '3-10' },
        { key: '11-25', value: '11-25' },
        { key: '25-50', value: '25-50' },
        { key: '+50', value: '+50' }
    ];

    const detaultValues = {
        serviceName: 'teste',
        serviceEmail: 'teste@teste.com',
        serviceABN: '1234567890',
        numberOfEmployees: '1-2'
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
                    serviceEmail: detaultValues.serviceEmail,
                    numberOfEmployees: detaultValues.numberOfEmployees,
                    serviceName: detaultValues.serviceName,
                    serviceABN: detaultValues.serviceABN
                }}
            >
                {({ handleBlur, values }) => (
                    <form {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <OneTextInput
                                label="Service Name"
                                id="outlined-adornment-serviceName-register"
                                name="serviceName"
                                type="text"
                                value={values.serviceName}
                                defaultValue=""
                                inputProps={{}}
                            />
                            <OneTextInput
                                label="Service ABN"
                                id="outlined-adornment-serviceABN-register"
                                name="serviceABN"
                                type="number"
                                value={values.serviceABN}
                                defaultValue=""
                                inputProps={{}}
                            />
                        </Grid>

                        <OneOutlinedTextInput
                            layout="fullWidth"
                            label="Email Address"
                            id="outlined-adornment-email-register"
                            name="serviceEmail"
                            type="email"
                            value={values.email}
                            onBlur={handleBlur}
                            inputProps={{}}
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
                            items={dataNumberOfEmployees}
                        />
                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        console.log('Go to View');
                                    }}
                                >
                                    Go back to View
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Detail;
