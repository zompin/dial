import * as React from 'react';
import { useDispatch } from 'react-redux';
import BookmarksList from './Components/Bookmarks/BookmarksList';
import AddPopup from './Components/AddPopup';
import EditPopup from './Components/EditPopup';
import DeletePopup from './Components/DeletePopup';
import Preloader from './Components/Preloader';
import Profiles from './Components/Profiles';
import getAppData from './Actions/app';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAppData());
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
