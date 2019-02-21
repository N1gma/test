import React from 'react';
import compose from 'recompact/compose';
import lifecycle from 'recompact/lifecycle';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { getMovies } from 'redux/ducks/movies/selectors';
import { fetchMovies } from 'redux/ducks/movies/actions';
import preloader from 'HOCs/preloader';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIco from '@material-ui/icons/Edit';
import DeleteIco from '@material-ui/icons/Delete';
import AddIco from '@material-ui/icons/Add';
import classnames from 'classnames';
import { modalShow } from 'redux/ducks/ui/modals/actions';
import { MODAL_NAME as MOVIE_SETTINGS_MODAL_NAME } from 'components/modals/MovieSettingsModal';
import { MODAL_NAME as MOVIE_DELETE_MODAL_NAME } from 'components/modals/MovieDeleteModal';

const Films = ({ movies, classes, modalShow }) => (
  <div className={classnames(classes.root, 'container-fluid')}>
    <div className="row flex-wrap justify-content-center">
      <div className="col-xs-12 col-sm-8">
        <div className="row flex-column">
          <List className={classnames(classes.list, 'col-12')}>
            {movies.map(
              ({ Poster, Title, Year, Runtime, Genre, Director, imdbID }, index) => {
                return (
                  <ListItem key={index} className={classes.listItem}>
                    <ListItemAvatar>
                      <Avatar alt="ava" src={Poster} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography variant="h6" color="textPrimary">
                            {Title}
                          </Typography>
                          {Genre}
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" color="textPrimary">
                            {`${Year}, ${Runtime}`}
                          </Typography>
                          {Director}
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => modalShow(MOVIE_DELETE_MODAL_NAME, imdbID)}
                      >
                        <DeleteIco />
                      </IconButton>
                      <IconButton
                        onClick={() => modalShow(MOVIE_SETTINGS_MODAL_NAME, { Poster, Title, Year, Runtime, Genre, Director, imdbID })}
                      >
                        <EditIco />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              },
            )}
          </List>
          <IconButton
            aria-label="Delete"
            className={classnames(classes.addBtn, 'ml-auto')}
            onClick={() => modalShow(MOVIE_SETTINGS_MODAL_NAME)}
          >
            <AddIco />
          </IconButton>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  movies: getMovies(state),
});

const mapDispatchToProps = {
  fetchMovies,
  modalShow,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchMovies();
    },
  }),
  preloader(props => ({
    loading: !props.movies,
  })),
  withStyles(styles),
)(Films);
