import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({ loading, children }) =>
  loading ? <CircularProgress/> : children;

export default Loader;