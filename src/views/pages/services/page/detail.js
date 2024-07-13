// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import FormWrapper1 from '../../FormWrapper1';
import FormCardWrapper from '../../FormCardWrapper';
import AuthFooter from '../../../../ui-component/cards/AuthFooter';
import Detail from '../forms/detail';

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const detaultValues = {
        serviceName: 'teste',
        serviceEmail: 'teste@teste.com',
        serviceABN: '1234567890',
        numberOfEmployees: '1-2'
    };

    return (
        <FormWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '85vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(85vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <FormCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                            <Typography
                                                color={theme.palette.secondary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h2'}
                                            >
                                                Service detail
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Detail
                                            serviceEmail={detaultValues.serviceEmail}
                                            numberOfEmployees={detaultValues.numberOfEmployees}
                                            serviceName={detaultValues.serviceName}
                                            serviceABN={detaultValues.serviceABN}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                </Grid>
                            </FormCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </FormWrapper1>
    );
};

export default Register;
