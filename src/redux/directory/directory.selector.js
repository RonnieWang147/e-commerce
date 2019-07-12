import { createSelector } from 'reselect';

const selectDirector = state => state.directory;

export const selectSections = createSelector(
  [selectDirector],
  directory => directory.sections
);
