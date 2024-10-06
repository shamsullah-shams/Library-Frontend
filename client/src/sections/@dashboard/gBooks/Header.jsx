import React from 'react';
import { Box, Button, IconButton, Stack, AppBar, Toolbar } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { bgBlur } from '../../../utils/cssStyles';
import Iconify from '../../../components/iconify';

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const StyledHeaderRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const Header = ({ onOpenNav }) => {
  return (
    <StyledHeaderRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <Link to="/login" className="header-login">
            <Button variant="outlined">Login</Button>
          </Link>
        </Stack>
      </StyledToolbar>
    </StyledHeaderRoot>
  );
};

export default Header;
