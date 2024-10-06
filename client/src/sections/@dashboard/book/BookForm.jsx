import {
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Grid,
  TextField,
  Typography,
  FormControl,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Iconify from '../../../components/iconify';

// static design
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'white',
  borderRadius: '20px',
  boxShadow: 16,
  p: 2,
};

const BookForm = ({
  isUpdateForm,
  isModalOpen,
  handleCloseModal,
  book,
  setBook,
  handleAddBook,
  handleUpdateBook,
  setImage,
  setPDF,
}) => {
  const categories = useSelector((state) => state.categories.categories);
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container>
          <Typography variant="h4" textAlign="center" paddingBottom={2} paddingTop={1}>
            {isUpdateForm ? <span>Update</span> : <span>Add</span>} book
          </Typography>

          <Stack spacing={3} paddingY={2} paddingX={3} height="600px" overflow="scroll">
            <TextField
              name="name"
              label="Book name"
              value={book.name}
              autoFocus
              required
              onChange={(e) => setBook({ ...book, name: e.target.value })}
            />
            <TextField
              name="isbn"
              label="ISBN"
              value={book.isbn}
              required
              onChange={(e) => setBook({ ...book, isbn: e.target.value })}
            />

            <FormControl sx={{ m: 1 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                label="Category"
                value={book.categoryId || ''}
                onChange={(e) => {
                  const selectedCategory = categories.find((category) => category.id === e.target.value);
                  setBook({
                    ...book,
                    categoryId: selectedCategory.id,
                    categoryName: selectedCategory.title,
                  });
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="summary"
              label="Summary"
              value={book.summary}
              multiline
              rows={2}
              maxRows={4}
              onChange={(e) => setBook({ ...book, summary: e.target.value })}
            />

            <Button size="large" variant="outlined" component="label" color="info">
              Upload photo
              <input
                type="file"
                accept="image/jpeg, image/png"
                hidden
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
              />
            </Button>

            <Button size="large" variant="outlined" component="label" color="info">
              Upload Book
              <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={(event) => {
                  setPDF(event.target.files[0]);
                }}
              />
            </Button>

            <br />
            <Box textAlign="center" paddingBottom={2}>
              <Button
                size="large"
                variant="contained"
                onClick={isUpdateForm ? handleUpdateBook : handleAddBook}
                startIcon={<Iconify icon="bi:check-lg" />}
                style={{ marginRight: '12px' }}
              >
                Submit
              </Button>

              <Button
                size="large"
                color="inherit"
                variant="contained"
                onClick={handleCloseModal}
                startIcon={<Iconify icon="charm:cross" />}
                style={{ marginLeft: '12px' }}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Modal>
  );
};

BookForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  book: PropTypes.object,
  setBook: PropTypes.func,
  handleAddBook: PropTypes.func,
  handleUpdateBook: PropTypes.func,
  setImage: PropTypes.func,
  setPDF: PropTypes.func,
};

export default BookForm;
