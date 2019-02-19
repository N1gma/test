import React from 'react';
import Loader from 'containers/common/Loader';

const preloader = config => Component => props => {
  const { loading } = config(props);
  return (
    <Loader loading={loading}>
      <Component {...props} />
    </Loader>
  )
};

export default preloader;
