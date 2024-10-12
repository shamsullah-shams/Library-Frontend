import { Box, Button, Container, Grid, Modal, Stack, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from '../../../components/iconify';
import { useAuth } from '../../../hooks/useAuth';

const CategoryForm = ({
  handleAddCategory,
  handleUpdateCategory,
  isUpdateForm,
  isModalOpen,
  handleCloseModal,
  setCategory,
  category,
}) => {
  const { user, tokens } = useAuth();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'white',
    borderRadius: '20px',
    boxShadow: 16,
    p: 4,
  };

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
            {isUpdateForm ? <span>Update</span> : <span>Add</span>} category
          </Typography>
          <Stack spacing={3} paddingY={2}>
            <Grid container spacing={0} sx={{ paddingBottom: '4px' }}>
              <Grid item xs={12} md={12} paddingRight={1}>
                <TextField
                  fullWidth
                  name="title"
                  label="Title"
                  type="text"
                  required
                  value={category.title}
                  onChange={(event) => setCategory({ ...category, title: event.target.value })}
                />
              </Grid>
            </Grid>

            <br />
            <Box textAlign="center">
              <Box textAlign="center" paddingBottom={2}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={isUpdateForm ? handleUpdateCategory : handleAddCategory}
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
            </Box>
          </Stack>
        </Container>
      </Box>
    </Modal>
  );
};

CategoryForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  handleAddCategory: PropTypes.func,
  handleUpdateCategory: PropTypes.func,
};

export default CategoryForm;
