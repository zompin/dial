import * as React from 'react';
import { useDispatch } from 'react-redux';
import BookmarksList from '../Components/Bookmarks/BookmarksList';
import AddPopup from '../Components/AddPopup/AddPopup';
import EditPopup from '../Components/EditPopup/EditPopup';
import DeletePopup from '../Components/DeletePopup/DeletePopup';
import Preloader from '../Components/Preloader/Preloader';
import Profiles from '../Components/Profiles/Profiles';
import getAppData from '../Actions/app';
import './App.module.scss'

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAppData());
  }, []);

  return (
    <>
      <Preloader />
      <Profiles />
      <BookmarksList />
      <AddPopup />
      <DeletePopup />
      <EditPopup />
    </>
  );
};

export default App;
