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
import { useParams } from 'react-router-dom';
import { Alert } from '@mui/lab';
import { FiEdit3, FiEye } from 'react-icons/fi';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Delete } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../../hooks/useAuth';
import Label from '../../../components/label';
import BookDialog from './BookDialog';
import BookForm from './BookForm';
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
  const { user, tokens } = useAuth();

  const { categoryId } = useParams();

  // Data
  const [book, setBook] = useState({
    name: '',
    isbn: '',
    summary: '',
    categoryId: '',
    categoryName: '',
  });
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pdf, setPDF] = useState(null);
  const [image, setImage] = useState(null);

  // API operations

  const getAllBooks = () => {
    axios
      .get(
        apiUrl(routes.BOOK),
        { params: { categoryId } },
        {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        }
      )
      .then((response) => {
        // handle success
        const data = response.data;
        setBooks(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        setLoading(false);
        toast.error(error.message || 'Something went wrong, please try again');
      });
  };

  const addBook = () => {
    const formdata = new FormData();
    formdata.append('name', book.name);
    formdata.append('isbn', book.isbn);
    formdata.append('summary', book.summary);
    formdata.append('categoryId', book.categoryId);
    formdata.append('image', image);
    formdata.append('pdf', pdf);

    axios
      .post(apiUrl(routes.BOOK), formdata, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('Book added');
        handleCloseModal();
        getAllBooks();
        clearForm();
      })
      .catch((error) => {
        toast.error(error.response.data.message || 'Something went wrong, please try again');
      });
  };

  const updateBook = () => {
    const formdata = new FormData();
    formdata.append('name', book.name);
    formdata.append('isbn', book.isbn);
    formdata.append('summary', book.summary);

    if (image) {
      formdata.append('image', image);
    }

    if (pdf) {
      formdata.append('pdf', pdf);
    }

    axios
      .patch(apiUrl(routes.BOOK, selectedBookId), formdata, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('Book updated');
        handleCloseModal();
        handleCloseMenu();
        getAllBooks();
        clearForm();
      })
      .catch((error) => {
        toast.error(error.response.data.message || 'Something went wrong, please try again');
      });
  };

  const deleteBook = (bookId) => {
    axios
      .delete(apiUrl(routes.BOOK, selectedBookId), {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
      })
      .then((response) => {
        toast.success('Book deleted');
        handleCloseDialog();
        handleCloseMenu();
        getAllBooks();
      })
      .catch((error) => {
        toast.error(error.response.data.message || 'Something went wrong, please try again');
      });
  };

  const getSelectedBookDetails = () => {
    const selectedBook = books.find((element) => element.id === selectedBookId);
    setBook(selectedBook);
  };

  const clearForm = () => {
    setBook({ name: '', isbn: '', summary: '' });
    setImage(null);
    setPDF(null);
  };

  // Handler functions
  const handleOpenMenu = (event) => {
    setIsMenuOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(null);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Load data on initial page load
  useEffect(() => {
    getAllBooks();
  }, [categoryId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyPress = async (event) => {
    const name = event.target.value;
    if (event.key === 'Enter') {
      if (name === '') {
        setLoading(true);
        try {
          const response = await axios.get(apiUrl(routes.BOOK), { params: { categoryId } });
          const data = response.data;
          setBooks(data.results);
          setTotalPages(data.totalPages);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.message || 'Something went wrong, please try again');
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
          toast.error(error.response.data.message || 'Something went wrong, please try again');
        }
      }
    }
  };

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
    <>
      <Helmet>
        <title> Books </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" sx={{ mb: 5 }}>
            Books
          </Typography>
          {user.isAdmin && (
            <Button
              variant="contained"
              onClick={() => {
                setIsUpdateForm(false);
                handleOpenModal();
              }}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Book
            </Button>
          )}
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
              <Grid key={book._id} item xs={4} sm={6} md={4}>
                <Card>
                  <Box sx={{ pt: '60%', position: 'relative' }}>
                    {user.isAdmin && (
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
                    )}
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
          {page && <Pagination count={totalPages} page={page} color="primary" onChange={handlePageChange} />}
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
          <FiEye style={{ marginRight: 2 }} size={20} />
          Preview
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsUpdateForm(true);
            getSelectedBookDetails();
            handleCloseMenu();
            handleOpenModal();
          }}
        >
          <FiEdit3 style={{ marginRight: 2 }} size={20} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenDialog}>
          <Delete style={{ marginRight: 2 }} size={20} />
          Delete
        </MenuItem>
      </Popover>

      <BookForm
        isUpdateForm={isUpdateForm}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        id={selectedBookId}
        book={book}
        setBook={setBook}
        handleAddBook={addBook}
        handleUpdateBook={updateBook}
        setImage={setImage}
        setPDF={setPDF}
      />

      <BookDialog
        isDialogOpen={isDialogOpen}
        bookId={selectedBookId}
        handleDeleteBook={deleteBook}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default BookPage;
