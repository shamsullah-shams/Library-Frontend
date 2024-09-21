import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
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
import { useAuth } from '../../../hooks/useAuth';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

import BorrowalListHead from './BorrowalListHead';
import BorrowalForm from './BorrowalForm';
import BorrowalsDialog from './BorrowalDialog';
import { applySortFilter, getComparator } from '../../../utils/tableOperations';
import { apiUrl, methods, routes } from '../../../constants';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'bookName', label: 'Book Name', alignRight: false },
  { id: 'studentName', label: 'Student Name', alignRight: false },
  { id: 'faculty', label: 'faculty', alignRight: false },
  { id: 'semester', label: 'semester', alignRight: false },
  { id: '', label: '', alignRight: true },
  { id: '', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

const BorrowalPage = () => {
  const { user, tokens } = useAuth();
  // State variables
  // Table
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Data
  const [borrowal, setBorrowal] = useState({
    bookName: '',
    studentName: '',
    faculty: '',
    semester: '',
  });
  const [borrowals, setBorrowals] = useState([]);
  const [selectedBorrowalId, setSelectedBorrowalId] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);

  // Load data on initial page load
  useEffect(() => {
    getAllBorrowals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // API operations

  const getAllBorrowals = () => {
    axios
      .get(apiUrl(routes.BORROWAL), {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
      })
      .then((response) => {
        setBorrowals(response.data.results);

        setIsTableLoading(false);
      })
      .catch((error) => {
        // handle error
        toast.error(error.response.data.message ?? 'Something went wrong');
      });
  };

  const addBorrowal = () => {
    axios
      .post(apiUrl(routes.BORROWAL), borrowal, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
      })
      .then((response) => {
        toast.success('Borrowal added');
        console.log(response.data);
        handleCloseModal();
        getAllBorrowals();
        clearForm();
      })
      .catch((error) => {
        toast.error(error.response.data.message ?? 'Something went wrong, please try again');
      });
  };

  const updateBorrowal = () => {
    const data = {
      studentName: borrowal.studentName,
      bookName: borrowal.bookName,
      faculty: borrowal.faculty,
      semester: borrowal.semester,
    };
    axios
      .patch(apiUrl(routes.BORROWAL, selectedBorrowalId), data, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
      })
      .then((response) => {
        toast.success('Borrowal updated');
        handleCloseModal();
        handleCloseMenu();
        getAllBorrowals();
        clearForm();
      })
      .catch((error) => {
        toast.error(error.response.data.message ?? 'Something went wrong, please try again');
      });
  };

  const deleteBorrowal = () => {
    axios
      .delete(apiUrl(routes.BORROWAL, selectedBorrowalId), {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
      })
      .then((response) => {
        toast.success('Borrowal deleted');
        handleCloseDialog();
        handleCloseMenu();
        getAllBorrowals();
      })
      .catch((error) => {
        toast.error(error.response.data.message ?? 'Something went wrong, please try again');
      });
  };

  const getSelectedBorrowalDetails = () => {
    const selectedBorrowals = borrowals.find((element) => element.id === selectedBorrowalId);
    setBorrowal(selectedBorrowals);
  };

  const clearForm = () => {
    setBorrowal({
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
    setBorrowal(applySortFilter(borrowal, getComparator(order, orderBy), filterName));
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
        <title>Borrowals</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
            Borrowals
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setIsUpdateForm(false);
              handleOpenModal();
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Borrowal
          </Button>
        </Stack>
        {isTableLoading ? (
          <Grid style={{ textAlign: 'center' }}>
            <CircularProgress size="lg" />
          </Grid>
        ) : (
          <Card>
            <Scrollbar>
              {borrowals.length > 0 ? (
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <BorrowalListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={borrowal.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {borrowals.map((borrowal) => (
                        <TableRow hover key={borrowal.id} tabIndex={-1}>
                          <TableCell align="left"> {borrowal.bookName} </TableCell>
                          <TableCell align="left">{borrowal.studentName}</TableCell>
                          <TableCell align="left">{borrowal.faculty}</TableCell>
                          <TableCell align="left">{borrowal.semester}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(e) => {
                                setSelectedBorrowalId(borrowal.id);
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
                  No borrowals found
                </Alert>
              )}
            </Scrollbar>
            {borrowals.length > 0 && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={borrowals.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Card>
        )}
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
            getSelectedBorrowalDetails();
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

      <BorrowalForm
        isUpdateForm={isUpdateForm}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        id={selectedBorrowalId}
        borrowal={borrowal}
        setBorrowal={setBorrowal}
        handleAddBorrowal={addBorrowal}
        handleUpdateBorrowal={updateBorrowal}
      />

      <BorrowalsDialog
        isDialogOpen={isDialogOpen}
        borrowalsId={selectedBorrowalId}
        handleDeleteBorrowal={deleteBorrowal}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default BorrowalPage;
