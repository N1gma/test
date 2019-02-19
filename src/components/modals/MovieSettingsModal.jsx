import React from 'react';
import Modal from '@material-ui/core/Modal';
import compose from 'recompact/compose';
import withProps from 'recompact/withProps';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Button from '@material-ui/core/Button';
import { TextField, Select } from 'redux-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { required, requiredArray } from 'utils/validations';
import { addMovie, editMovie } from 'redux/ducks/movies/actions';
import { getMovies } from 'redux/ducks/movies/selectors';
import { getVisibleModalByName } from 'redux/ducks/ui/modals/selectors';
import { modalHide } from 'redux/ducks/ui/modals/actions';
import styles from './styles';

export const MODAL_NAME = 'MOVIE_SETTINGS_MODAL';

const startYear = 1900;
const endYear = 2019;

const Years = Array.from(new Array(endYear - startYear)).map((item, index) => {
  const value = startYear + index;
  return (
    <MenuItem key={value} value={value.toString()}>
      {value}
    </MenuItem>
  );
});

const Genres = [
  'Absurdist/surreal/whimsical',
  'Action',
  'Adventure',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Historical',
  'Historical fiction',
  'Horror',
  'Magical realism',
  'Mystery',
  'Paranoid Fiction',
  'Philosophical',
  'Political',
  'Romance',
  'Saga',
  'Satire',
  'Science fiction',
  'Social',
  'Speculative',
  'Thriller',
  'Urban',
  'Western',
  'Animation',
].map(value => (
  <MenuItem key={value} value={value}>
    {value}
  </MenuItem>
));

const submit = (
  values,
  dispatch,
  { initialValues, addMovie, editMovie, movies, modalHide },
) => {
  const handler = initialValues.Title ? editMovie : addMovie;
  if (
    movies.some(
      ({ Title, imdbID }) => Title === values.Title && imdbID !== values.imdbID,
    )
  ) {
    throw new SubmissionError({
      Title: 'Title already exist!',
    });
  }
  handler(values);
  modalHide();
};

const FilmSettingsModal = ({
  modalHide,
  classes,
  modalName,
  initialValues,
  handleSubmit,
}) => (
  <Modal open={modalName === MODAL_NAME} onClose={modalHide}>
    <form className={classes.paper} onSubmit={handleSubmit(submit)}>
      <Typography variant="h6">
        {initialValues.Title ? 'Edit Movie' : 'New Movie'}
      </Typography>
      <Field
        label="Title"
        fullWidth
        validate={[required]}
        component={TextField}
        name="Title"
        type="text"
        className={classes.inputField}
        FormHelperTextProps={{
          className: classes.errorLabel,
        }}
      />

      <Field
        fullWidth
        select
        label="Year"
        validate={[required]}
        component={TextField}
        name="Year"
        className={classes.inputField}
        FormHelperTextProps={{
          className: classes.errorLabel,
        }}
        SelectProps={{
          MenuProps: {
            MenuListProps: {
              className: classes.yearSelectList,
            },
          },
        }}
      >
        {Years}
      </Field>
      <Field
        fullWidth
        select
        multiple
        label="Genre"
        className={classes.inputField}
        validate={[requiredArray]}
        component={TextField}
        name="Genre"
        FormHelperTextProps={{
          className: classes.errorLabel,
        }}
        SelectProps={{
          MenuProps: {
            MenuListProps: {
              className: classes.yearSelectList,
            },
          },
        }}
      >
        {Genres}
      </Field>
      <Field
        label="Runtime"
        fullWidth
        className={classes.inputField}
        component={TextField}
        validate={[required]}
        name="Runtime"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">min</InputAdornment>,
        }}
        FormHelperTextProps={{
          className: classes.errorLabel,
        }}
      />
      <Field
        fullWidth
        className={classes.inputField}
        component={TextField}
        validate={[required]}
        name="Director"
        label="Director"
        type="text"
        FormHelperTextProps={{
          className: classes.errorLabel,
        }}
      />
      <DialogActions>
        <Button onClick={modalHide}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </form>
  </Modal>
);

const mapStateToProps = (state, { initialValues }) => {
  const { modalParams, modalName } = getVisibleModalByName(state)(MODAL_NAME);
  return {
    modalName: modalName,
    movies: getMovies(state),
    initialValues: modalParams
      ? {
          ...modalParams,
          Title: modalParams.Title.toLowerCase().replace(/^\w/, match =>
            match.toUpperCase(),
          ),
          Genre: modalParams.Genre.split(', '),
          Runtime: Number.parseFloat(modalParams.Runtime),
        }
      : initialValues,
  };
};

const mapDispatchToProps = dispatch => ({
  modalHide: () => dispatch(modalHide(MODAL_NAME)),
  addMovie: movie => dispatch(addMovie(movie)),
  editMovie: movie => dispatch(editMovie(movie)),
});

const initialValues = {
  Title: '',
  Genre: [],
  Runtime: '',
  Director: '',
  Year: '',
};

export default compose(
  withProps({
    initialValues,
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
  reduxForm({
    form: MODAL_NAME,
    enableReinitialize: true,
  }),
)(FilmSettingsModal);
