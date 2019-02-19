import React from 'react';
import compose from 'recompact/compose';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { getVisibleModalByName } from 'redux/ducks/ui/modals/selectors';
import { modalHide } from 'redux/ducks/ui/modals/actions';
import { deleteMovie } from 'redux/ducks/movies/actions';
import styles from './styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

export const MODAL_NAME = 'MOVIE_DELETE_MODAL';

const FilmDeleteModal = ({
  modalHide,
  classes,
  modalName,
  initialValues,
  movieName,
  deleteMovie,
}) => (
  <Dialog open={modalName === MODAL_NAME} onClose={modalHide}>
    <DialogTitle>Are you sure want to delete this movie?</DialogTitle>
    <DialogActions>
      <Button onClick={modalHide} color="primary">
        No
      </Button>
      <Button
        onClick={() => {
          deleteMovie(movieName);
          modalHide();
        }}
        color="primary"
        autoFocus
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

const mapStateToProps = state => {
  const modal = getVisibleModalByName(state)(MODAL_NAME);
  return {
    modalName: modal.modalName,
    movieName: modal.modalParams,
  };
};

const mapDispatchToProps = dispatch => ({
  modalHide: () => dispatch(modalHide(MODAL_NAME)),
  deleteMovie: movieName => dispatch(deleteMovie(movieName)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(FilmDeleteModal);
