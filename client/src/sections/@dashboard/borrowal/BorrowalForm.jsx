import { Box, Button, Container, Grid, Modal, Stack, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from '../../../components/iconify';
import { useAuth } from '../../../hooks/useAuth';

const BorrowalForm = ({
  handleAddBorrowal,
  handleUpdateBorrowal,
  isUpdateForm,
  isModalOpen,
  handleCloseModal,
  setBorrowal,
  borrowal,
}) => {
  const { user, tokens } = useAuth();

  console.log({ 'borrowal from model': borrowal });

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
            {isUpdateForm ? <span>Update</span> : <span>Add</span>} borrowal
          </Typography>
          <Stack spacing={3} paddingY={2}>
            <Grid container spacing={0} sx={{ paddingBottom: '4px' }}>
              <Grid item xs={12} md={6} paddingRight={1}>
                <TextField
                  fullWidth
                  name="bookName"
                  label="Book Name"
                  type="text"
                  required
                  value={borrowal.bookName}
                  onChange={(event) => setBorrowal({ ...borrowal, bookName: event.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6} paddingLeft={1}>
                <TextField
                  fullWidth
                  name="studentName"
                  label="Student Name"
                  type="text"
                  required
                  value={borrowal.studentName}
                  onChange={(event) => setBorrowal({ ...borrowal, studentName: event.target.value })}
                />
              </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ paddingBottom: '4px' }}>
              <Grid item xs={12} md={6} paddingRight={1}>
                <TextField
                  fullWidth
                  name="faculty"
                  label="faculty"
                  type="text"
                  required
                  value={borrowal.faculty}
                  onChange={(event) => setBorrowal({ ...borrowal, faculty: event.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6} paddingLeft={1}>
                <TextField
                  fullWidth
                  name="semester"
                  label="Semester"
                  type="text"
                  required
                  value={borrowal.semester}
                  onChange={(event) => setBorrowal({ ...borrowal, semester: event.target.value })}
                />
              </Grid>
            </Grid>

            <br />
            <Box textAlign="center">
              <Box textAlign="center" paddingBottom={2}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={isUpdateForm ? handleUpdateBorrowal : handleAddBorrowal}
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

BorrowalForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  handleAddBorrowal: PropTypes.func,
  handleUpdateBorrowal: PropTypes.func,
};

export default BorrowalForm;
