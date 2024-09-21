import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';

const BackupDialog = ({ isDialogOpen, handleCloseDialog, bookId, handleDeleteBook }) => (
  <Dialog
    open={isDialogOpen}
    onClose={handleCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Confirm action</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">Are you sure you want to apply this backup?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog}>No</Button>
      <Button onClick={() => handleDeleteBook(bookId)} autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

BackupDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  bookId: PropTypes.string,
  handleDeleteBook: PropTypes.func,
};

export default BackupDialog;
