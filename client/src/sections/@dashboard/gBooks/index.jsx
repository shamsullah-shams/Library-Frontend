import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import {
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Popover,
  Stack,
  Typography,
  InputBase,
} from '@mui/material';
import { Alert } from '@mui/lab';
import { useParams } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import { apiUrl, routes } from '../../../constants';
import Header from './Header';
import Nav from './Nav';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledBookImage = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid #f0efef',
    borderRadius: '20px',
  },
}));

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const BookPage = () => {
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const handleKeyPress = async (event) => {
    const name = event.target.value;
    if (event.key === 'Enter') {
      if (name === '') {
        setLoading(true);
        try {
          const response = await axios.get(apiUrl(routes.BOOK));
          const data = response.data;
          setBooks(data.results);
          setTotalPages(data.totalPages);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast.error(error.message || 'Something went wrong, please try again');
        }
      } else {
        setLoading(true);
        try {
          const response = await axios.get(apiUrl(routes.BOOK), {
            params: { name },
          });
          const data = response.data;
          setBooks(data.results);
          setTotalPages(data.totalPages);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast.error(error.message || 'Something went wrong, please try again');
        }
      }
    }
  };

  // API operations

  const getAllBooks = () => {
    axios
      .get(apiUrl(routes.BOOK), { params: { categoryId } })
      .then((response) => {
        // handle success
        const data = response.data;
        setBooks(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        toast.error(error.message || 'Something went wrong, please try again');
      });
  };

  // Handler functions
  const handleOpenMenu = (event) => {
    setIsMenuOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(null);
  };

  // Load data on initial page load
  useEffect(() => {
    getAllBooks();
  }, [categoryId]);

  const previewBook = () => {
    const selectedBook = books.find((element) => element.id === selectedBookId);
    if (selectedBook) {
      window.open(`/images/${selectedBook?.pdf}`, '_blank');
    } else {
      alert('something went wrong');
    }
  };

  const handlePageChange = (event, value) => {
    setLoading(true);

    axios
      .get(apiUrl(routes.BOOK), {
        params: {
          page: value,
          categoryId,
        },
      })
      .then((response) => {
        // handle success
        const data = response.data;
        setBooks(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        toast.error(error.response.data.message || 'Something went wrong, please try again');
        setLoading(false); // Ensure loading state is reset on error
      });

    setLoading(false);
    setPage(value); // Update the current page state
  };

  return (
    <Layout>
      <Helmet>
        <title> Books </title>
      </Helmet>

      <Container>
        <Container sx={{ mb: 5 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              style={{ width: '100%' }}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyDown={handleKeyPress}
            />
          </Search>
        </Container>

        {loading ? (
          <Grid padding={2} style={{ textAlign: 'center' }}>
            <CircularProgress />
          </Grid>
        ) : books.length > 0 ? (
          <Grid container spacing={4}>
            {books.map((book) => (
              <Grid key={book._id} item xs={4} sm={6} md={4}>
                <Card>
                  <Box sx={{ pt: '80%', position: 'relative' }}>
                    <Label
                      variant="filled"
                      sx={{
                        zIndex: 9,
                        top: 12,
                        right: 16,
                        position: 'absolute',
                        borderRadius: '100%',
                        width: '30px',
                        height: '30px',
                        color: 'white',
                        backgroundColor: 'white',
                      }}
                    >
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          setSelectedBookId(book.id);
                          handleOpenMenu(e);
                        }}
                      >
                        <Iconify icon={'eva:more-vertical-fill'} />
                      </IconButton>
                    </Label>

                    <StyledBookImage alt={book.name} src={`/images/${book.image}`} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 2 }}>
                    <Typography textAlign="center" variant="h5" margin={0} noWrap>
                      {book.name}
                    </Typography>
                    <Typography variant="subtitle2" textAlign="center" paddingTop={1}>
                      ISBN: {book.isbn}
                    </Typography>
                    <Typography variant="body2">{book.summary}</Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="warning" color="warning">
            No books found
          </Alert>
        )}

        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '50px',
            marginBottom: '50px',
          }}
        >
          <Pagination count={totalPages} page={page} color="primary" onChange={handlePageChange} />
        </Grid>
      </Container>

      <Popover
        open={Boolean(isMenuOpen)}
        anchorEl={isMenuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={previewBook}>
          <FiEye size={20} style={{ marginRight: '12px' }} />
          Preview
        </MenuItem>
      </Popover>
    </Layout>
  );
};

const Layout = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>{props.children}</Main>
    </StyledRoot>
  );
};

export default BookPage;
