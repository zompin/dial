import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BookmarksList from './Components/Bookmarks/BookmarksList';
import AddPopup from './Components/AddPopup';
import EditPopup from './Components/EditPopup';
import DeletePopup from './Components/DeletePopup';
import Preloader from './Components/Preloader';
import Profiles from './Components/Profiles';
import { getBookmarks } from './Actions/Bookmarks';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks());
  }, []);

  return (
    <div>
      <Preloader />
      <Profiles />
      <BookmarksList />
      <AddPopup />
      <DeletePopup />
      <EditPopup />
    </div>
  );
};

export default App;
