import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import {
  Box,
  Button,
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
} from '@mui/material';
import { Alert } from '@mui/lab';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import { apiUrl, routes } from '../../../constants';

// ----------------------------------------------------------------------

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

const BookPage = () => {
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
  };

  // API operations

  const getAllBooks = () => {
    axios
      .get(apiUrl(routes.BOOK), {})
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
  }, []);

  const previewBook = () => {
    const selectedBook = books.find((element) => element.id === selectedBookId);
    if (selectedBook) {
      window.open(`http://10.10.12.45:5000/images/${selectedBook?.pdf}`, '_blank');
    } else {
      alert('something went wrong');
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Helmet>
        <title> Books </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" marginTop={5}>
          <Typography variant="h3" sx={{ mb: 5 }}>
            <img src="../../../assets/libraryLogo.png" alt="logo" width={130} />
          </Typography>
          <Typography variant="h3" sx={{ mb: 5 }}>
            <Link to="/login" className="header-login">
              <Button variant="outlined">Login</Button>
            </Link>
          </Typography>
        </Stack>
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
              <Grid key={book._id} item xs={12} sm={6} md={4}>
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

                    <StyledBookImage alt={book.name} src={`http://10.10.12.45:5000/images/${book.image}`} />
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
          <Iconify icon={'eva:eye-outline'} sx={{ mr: 2 }} />
          Preview
        </MenuItem>
      </Popover>
    </>
  );
};

export default BookPage;
