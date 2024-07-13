// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import FormWrapper1 from '../../FormWrapper1';
import FormCardWrapper from '../../FormCardWrapper';
import AuthFooter from '../../../../ui-component/cards/AuthFooter';
import InviteEmployeeToService from '../forms/inviteEmployee';
import ViewInviteEmployee from '../forms/viewInviteEmployee';

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Settings = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <FormWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                        Service settings
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
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
                                                Invite Employee
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InviteEmployeeToService />
                                    </Grid>
                                </Grid>
                            </FormCardWrapper>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <FormCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                            <Typography
                                                color={theme.palette.secondary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h2'}
                                            >
                                                My invites
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ViewInviteEmployee />
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

export default Settings;
