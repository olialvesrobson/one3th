// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://one3th.oatogether.com" target="_blank" underline="hover">
            one3th.oatogether.com
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://oatogether.com" target="_blank" underline="hover">
            &copy; oatogether.com
        </Typography>
    </Stack>
);

export default AuthFooter;
