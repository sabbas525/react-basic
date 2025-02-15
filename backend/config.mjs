export const getConfig = (exercise = null) => {
  // enableAuthentication:   toggles Basic Auth for all routes but POST /api/users
  //                         POST /api/users can be used to register new users
  // allPlayersHideIsActive: should "isActive" field be included in the results of GET /api/players
  //                         if hidden, a call to GET /api/players/{id} is needed to get "isActive"

  switch (exercise) {
    case 'react-crud2':
      // crud2: (React, and Redux) require authentication and hide "isActive"
      return {
        allPlayersHideIsActive: true,
        enableAuthentication: true
      };
    case 'react-fetch':
    case 'react-crud':
    case 'redux-thunk':
      // crud & fetch: (React, and Redux) no authentication and hide "isActive"
      return {
        allPlayersHideIsActive: true,
        enableAuthentication: false
      };
    default:
      // Elm: no authentication and include "isActive"
      return {
        allPlayersHideIsActive: false,
        enableAuthentication: false
      };
  }
};
