import { useContext, useEffect } from 'react';

// material-ui
import { Box, Button, Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import { fetchEmployeeInvites, removeInviteEmployee } from '../actions';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useDispatch, useSelector } from 'react-redux';
import { setServiceToUser, UserContext } from 'views/pages/users/actions';
import { setUserToService } from 'views/pages/services/actions';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const ViewInviteEmployee = () => {
    const dispatch = useDispatch();
    const user = useContext(UserContext);
    // const ausAbr = require('aus-abr');
    const invites = useSelector((state) => state.services.employeeInvites);
    // const services = invites.reduce((previous, current) => {
    //     fetchService.find((item) => {
    //         if (item.id == current.serviceId) {
    //             return { ...item };
    //         }
    //     });
    // });

    const renderEnrollButton = (action) => {
        return (
            <Box sx={{ mt: 2 }}>
                <AnimateButton>
                    <Button
                        disableElevation
                        size="small"
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setServiceToUser({
                                serviceId: action.serviceId,
                                serviceName: action.serviceName,
                                user: user.uid,
                                role: action.role
                            });
                            setUserToService({ serviceId: action.serviceId, userId: user.uid, userName: user.name, role: action.role });
                            removeInviteEmployee({ email: action.email });
                        }}
                    >
                        Accept
                    </Button>
                </AnimateButton>
            </Box>
        );
    };

    useEffect(() => {
        //setServices()
        dispatch(fetchEmployeeInvites({ email: user.email }));
    }, [dispatch, user.email]);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center"></Grid>
            </Grid>

            <MainCard title="Services">
                <Grid container rowSpacing={gridSpacing} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} lg={12}>
                        {invites &&
                            invites.map((item) => {
                                return (
                                    <SubCard
                                        key={item.id}
                                        title={item.serviceName}
                                        secondary={() => (
                                            <Button
                                                onClick={removeInviteEmployee({ email: item })}
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                color="red.secondary"
                                            >
                                                delete
                                            </Button>
                                        )}
                                    >
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <MuiTypography variant="subtitle1" gutterBottom>
                                                    Email: {item.email}
                                                </MuiTypography>
                                                <MuiTypography variant="subtitle2" gutterBottom>
                                                    {renderEnrollButton(item)}
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

export default ViewInviteEmployee;
