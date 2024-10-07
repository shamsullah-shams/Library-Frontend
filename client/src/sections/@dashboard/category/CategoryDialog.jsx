import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';

const CategoryDialog = ({ isDialogOpen, handleCloseDialog, categoryId, handleDeleteCategory }) => (
  <Dialog
    open={isDialogOpen}
    onClose={handleCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Confirm action</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this category?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog}>No</Button>
      <Button onClick={() => handleDeleteCategory(categoryId)} autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

CategoryDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  categoryId: PropTypes.string,
  handleDeleteCategory: PropTypes.func,
};

export default CategoryDialog;
