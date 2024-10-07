import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { Alert } from '@mui/lab';
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

import CategoryListHead from './CategoryListHead';
import CategoryForm from './CategoryForm';
import CategorysDialog from './CategoryDialog';
import { applySortFilter, getComparator } from '../../../utils/tableOperations';
import { apiUrl, routes } from '../../../constants';
import { fetchCategories } from '../../../store/slices/action';

const TABLE_HEAD = [{ id: 'title', label: 'Title', alignRight: true }];

const CategoryPage = () => {
  const { user, tokens } = useAuth();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [category, setCategory] = useState({ title: '' });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);

  const addCategory = () => {
    axios
      .post(
        apiUrl(routes.CATEGORY),
        { title: category.title },
        {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        }
      )
      .then((response) => {
        toast.success('Category added');
        handleCloseModal();
        clearForm();
        dispatch(fetchCategories());
      })
      .catch((error) => {
        toast.error(error.response.data.message ?? 'Something went wrong, please try again');
      });
  };

  const updateCategory = () => {
    axios
      .patch(
        apiUrl(routes.CATEGORY, selectedCategoryId),
        { title: category.title },
        {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        }
      )
      .then((response) => {
        toast.success('Category updated');
        handleCloseModal();
        handleCloseMenu();
        clearForm();
        dispatch(fetchCategories());
      })
      .catch((error) => {
        toast.error(error.response.data.message ?? 'Something went wrong, please try again');
      });
  };

  const deleteCategory = () => {
    axios
      .delete(apiUrl(routes.CATEGORY, selectedCategoryId), {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
      })
      .then((response) => {
        toast.success('Category deleted');
        handleCloseDialog();
        handleCloseMenu();
        dispatch(fetchCategories());
      })
      .catch((error) => {
        toast.error(error.response.data.message ?? 'Something went wrong, please try again');
      });
  };

  const getSelectedCategoryDetails = () => {
    const selectedCategory = categories.find((element) => element.id === selectedCategoryId);
    setCategory(selectedCategory);
  };

  const clearForm = () => {
    setCategory({
      bookId: '',
      memberId: '',
      borrowedDate: '',
      dueDate: '',
      status: '',
    });
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

  // Table functions

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setCategory(applySortFilter(category, getComparator(order, orderBy), filterName));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
            Categories
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setIsUpdateForm(false);
              handleOpenModal();
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Category
          </Button>
        </Stack>
        <Card>
          <Scrollbar>
            {categories.length > 0 ? (
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <CategoryListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={category.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow hover key={category.id} tabIndex={-1}>
                        <TableCell align="center"> {category.title} </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(e) => {
                              setSelectedCategoryId(category.id);
                              handleOpenMenu(e);
                            }}
                          >
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="warning" color="warning">
                No categories found
              </Alert>
            )}
          </Scrollbar>
          {categories.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={categories.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Card>
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
        <MenuItem
          onClick={() => {
            setIsUpdateForm(true);
            getSelectedCategoryDetails();
            handleCloseMenu();
            handleOpenModal();
          }}
        >
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenDialog}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <CategoryForm
        isUpdateForm={isUpdateForm}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        id={selectedCategoryId}
        category={category}
        setCategory={setCategory}
        handleAddCategory={addCategory}
        handleUpdateCategory={updateCategory}
      />

      <CategorysDialog
        isDialogOpen={isDialogOpen}
        borrowalsId={selectedCategoryId}
        handleDeleteCategory={deleteCategory}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default CategoryPage;
