import { useContext, useEffect } from 'react';

// material-ui
import { Box, Button, Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import { UserState } from 'views/pages/authentication/actions';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserServices, setUserEnrolledToService, UserContext } from 'views/pages/users/actions';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const ServiceView = () => {
    const dispatch = useDispatch();
    const user = useContext(UserContext);
    const services = useSelector((state) => state.users.services);
    const getUser = UserState();
    dispatch(fetchUserServices({ userId: user.uid }));
    // const ausAbr = require('aus-abr');

    const renderEnrollButton = (action) => {
        return (
            <Box sx={{ mt: 2 }}>
                <AnimateButton>
                    <Button
                        disableElevation
                        size="small"
                        type="button"
                        variant="contained"
                        color={action.serviceId == user.serviceEnrolled ? 'secondary' : 'primary'}
                        onClick={() => {
                            if (action.serviceId == user.serviceEnrolled) {
                                console.log('already logged');
                            } else {
                                setUserEnrolledToService({ serviceId: action.serviceId, serviceName: action.serviceName, user: getUser });
                            }
                        }}
                    >
                        {action.serviceId == user.serviceEnrolled ? 'Enrolled' : 'Enroll'}
                    </Button>
                </AnimateButton>
            </Box>
        );
    };

    useEffect(() => {
        //setServices()
        console.log();
    }, []);
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center"></Grid>
            </Grid>

            <MainCard title="Services">
                <Grid container rowSpacing={gridSpacing} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={6} lg={4}>
                        {services &&
                            services.map((services) => {
                                return (
                                    <SubCard
                                        key={services.id}
                                        title={services.name}
                                        secondary={renderEnrollButton({ serviceId: services.id, serviceName: services.name })}
                                    >
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <MuiTypography variant="subtitle2" gutterBottom>
                                                    {services.role}
                                                </MuiTypography>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                );
                            })}
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default ServiceView;
