import React from 'react';
import MovieSettingsModal from 'components/modals/MovieSettingsModal'
import MovieDeleteModal from 'components/modals/MovieDeleteModal'

const ModalsWindow = () => (
  <React.Fragment>
    <MovieSettingsModal/>
    <MovieDeleteModal/>
  </React.Fragment>
);

export default ModalsWindow