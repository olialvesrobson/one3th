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
import { fetchUserCompanies, setUserEnrolledToCompany, UserContext } from 'views/pages/users/actions';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const CompanyView = () => {
    const dispatch = useDispatch();
    const user = useContext(UserContext);
    const companies = useSelector((state) => state.users.companies);
    const getUser = UserState();
    dispatch(fetchUserCompanies({ userId: user.uid }));
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
                        color={action.companyId == user.companyEnrolled ? 'secondary' : 'primary'}
                        onClick={() => {
                            if (action.companyId == user.companyEnrolled) {
                                console.log('already logged');
                            } else {
                                setUserEnrolledToCompany({ companyId: action.companyId, companyName: action.companyName, user: getUser });
                            }
                        }}
                    >
                        {action.companyId == user.companyEnrolled ? 'Enrolled' : 'Enroll'}
                    </Button>
                </AnimateButton>
            </Box>
        );
    };

    useEffect(() => {
        //setCompanies()
        console.log();
    }, []);
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center"></Grid>
            </Grid>

            <MainCard title="Companies">
                <Grid container rowSpacing={gridSpacing} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={6} lg={4}>
                        {companies &&
                            companies.map((companies) => {
                                return (
                                    <SubCard
                                        key={companies.id}
                                        title={companies.name}
                                        secondary={renderEnrollButton({ companyId: companies.id, companyName: companies.name })}
                                    >
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <MuiTypography variant="subtitle2" gutterBottom>
                                                    {companies.role}
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

export default CompanyView;
