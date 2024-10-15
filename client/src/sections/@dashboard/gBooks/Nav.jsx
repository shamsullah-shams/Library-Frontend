import React, { useEffect, useState } from 'react';
import { Typography, Drawer, Box, List, ListItemButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation, NavLink as RouterLink } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { MdCategory } from 'react-icons/md';
import useResponsive from '../../../hooks/useResponsive';
import Scrollbar from '../../../components/scrollbar';
import { StyledNavItem, StyledNavItemIcon } from '../../../components/nav-section/styles';
// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

const NAV_WIDTH = 240;
const navConfig = [
  {
    title: 'Categories',
    path: '/categories',
    icon: <FiChevronDown />,
  },
];

function NavSection({ data = [], innerData = [], ...other }) {
  const [collapse, setCollapse] = useState(false);

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <NavButton key={item.title} item={item} collapse={collapse} setCollapse={setCollapse} />
            {collapse && (
              <>
                {innerData.map((innerItem, index) => {
                  return <InnerNavItem key={index} item={innerItem} />;
                })}
              </>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

function NavItem(props) {
  const { title, path, icon, info } = props.item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
      onClick={props.onClick}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </StyledNavItem>
  );
}

const InnerNavItem = ({ item }) => {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
      style={{ marginLeft: '40px' }}
    >
      <MdCategory size={20} style={{ marginRight: '10px' }} />
      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
};

const NavButton = ({ item, collapse, setCollapse }) => {
  return (
    <ListItemButton
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
      style={{
        height: 48,
        position: 'relative',
        textTransform: 'capitalize',
        borderRadius: '6px',
      }}
      onClick={() => setCollapse(!collapse)}
    >
      {collapse ? <FiChevronUp style={{ marginRight: '20px' }} /> : <FiChevronDown style={{ marginRight: '20px' }} />}
      {item.title}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
};

const Nav = ({ openNav, onCloseNav }) => {
  const [collapse, setCollapse] = useState(false);
  const categories = useSelector((state) => state.categories.categories);
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', justifyContent: 'center' }}>
        <Typography variant="h3" sx={{ mb: 5 }} textAlign="center">
          <img src="../../../assets/libraryLogo.png" alt="logo" width={130} />
        </Typography>
      </Box>
      <NavSection data={navConfig} innerData={categories} collapse={collapse} setCollapse={setCollapse} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default Nav;
