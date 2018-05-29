import React, { Component } from 'react';
import { render } from 'react-dom';
import BookmarksList from './Components/Bookmarks/BookmarksList';
import AddPopup from './Components/AddPopup';
import EditPopup from './Components/EditPopup';
import Dialog from './Components/Dialog';
import Preloader from './Components/Preloader';
import SlideCheckbox from './Components/SlideCheckbox';
import '../less/style.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.bookmarksApi = props.browser.bookmarks;
    this.historyApi = props.browser.history;
  }

  state = {
    bookmarks: [],
    bookmarksLoaded: false,
    isAddPopupVisible: false,
    isEditPopupVisible: false,
    isDialogVisible: false,
    values: {},
    editBookmarkId: '',
    historyItems: [],
    dialogMessage: '',
    dialogAcceptCallback: () => {},
  };

  getBookmarks = () => {
    let { bookmarksApi } = this;

    this.setState({
      bookmarksLoaded: false,
    });

    bookmarksApi.getChildren('unfiled_____')
      .then(bookmarks => bookmarks.find(b => b.title === 'Dial' && b.type === 'folder'))
      .then((dialFolder) => {
        if (!dialFolder) {
          return bookmarksApi.create({
            title: 'Dial',
            parentId: 'unfiled_____',
          });
        }

        this.folder = dialFolder;

        return bookmarksApi.getChildren(dialFolder.id);
      })
      .then(bookmarks => this.setState({ bookmarks, bookmarksLoaded: true }))
      .catch(this.errorHandler);
  };

  getHistoryItems = (value) => {
    const { historyApi } = this;

    if (value) {
      historyApi.search({
        text: value,
        maxResults: 10,
      })
        .then(items => this.setState({ historyItems: items }))
        .catch(this.errorHandler);
    } else {
      this.setState({ historyItems: [] });
    }
  };

  onChange = (name, value, noSearch) => {
    const values = Object.assign({}, this.state.values, { [name]: value });

    if (name === 'url_add' && !noSearch) {
      this.getHistoryItems(value);
    } else {
      this.setState({
        historyItems: [],
      });
    }

    this.setState({
      values,
    });
  };

  onDelete = (id) => {
    const { bookmarksApi } = this;
    const message = 'Вы действительно хотите удалить закладку?';
    const callback = () => {
      bookmarksApi.remove(id)
        .then(this.getBookmarks)
        .catch(this.errorHandler);
    };

    this.showDialog(message, callback);
  };

  onComboItemSelect = (id) => {
    const { historyItems, values } = this.state;
    const item = historyItems.find(i => i.id === id);
    const newValues = {};

    if (item) {
      newValues.url_add = item.url;
      newValues.title_add = item.title;

      this.setState({
        values: Object.assign({}, values, newValues),
        historyItems: [],
      });
    }
  };

  showAddPopup = () => {
    this.setState({
      isAddPopupVisible: true,
    });
  };

  hideAddPopup = () => {
    this.setState({
      isAddPopupVisible: false,
    });
  };

  onAdd = () => {
    const { bookmarksApi, folder } = this;
    const { url_add, title_add } = this.state.values;

    bookmarksApi.create({
      parentId: folder.id,
      type: 'bookmark',
      title: title_add,
      url: url_add,
    })
      .then(() => {
        this.getBookmarks();
        this.hideAddPopup();
        this.onChange('title_add', '');
        this.onChange('url_add', '');
      })
      .catch(this.errorHandler);
  };

  showEditPopup = (editBookmarkId) => {
    const { bookmarksApi } = this;

    this.setState({
      isEditPopupVisible: true,
      editBookmarkId,
    });

    bookmarksApi.get(editBookmarkId)
      .then((bookmark) => {
        const { title, url } = bookmark[0];
        this.onChange('title_edit', title);
        this.onChange('url_edit', url);
      })
      .catch(this.errorHandler);
  };

  hideEditPopup = () => {
    this.setState({
      isEditPopupVisible: false,
    });
  };

  showDialog = (message, callback) => {
    this.setState({
      isDialogVisible: true,
      dialogMessage: message,
      dialogAcceptCallback: callback,
    });
  };

  hideDialog = () => {
    this.setState({
      isDialogVisible: false,
      dialogMessage: '',
      dialogAcceptCallback: () => {},
    });
  };

  onEdit = () => {
    const { editBookmarkId, values: { title_edit, url_edit } } = this.state;
    const { bookmarksApi } = this;

    bookmarksApi.update(editBookmarkId, {
      title: title_edit,
      url: url_edit,
    })
      .then(() => {
        this.getBookmarks();
        this.hideEditPopup();
      })
      .catch(this.errorHandler);
  };

  componentDidMount() {
    this.getBookmarks();
  }

  errorHandler = (err) => {
    console.log(err);
  };

  render() {
    const {
      onChange,
      showAddPopup,
      hideAddPopup,
      onAdd,
      showEditPopup,
      hideEditPopup,
      onEdit,
      onDelete,
      hideDialog,
    } = this;
    const {
      bookmarks,
      values,
      isAddPopupVisible,
      isEditPopupVisible,
      isDialogVisible,
      historyItems,
      dialogMessage,
      dialogAcceptCallback,
      bookmarksLoaded,
    } = this.state;

    return (
      <div>
        <SlideCheckbox name="isFrozen" checked={values.isFrozen} onChange={onChange} />
        <Preloader show={!bookmarksLoaded} />
        <BookmarksList
          bookmarks={bookmarks}
          onDelete={onDelete}
          onEdit={showEditPopup}
          onAdd={showAddPopup}
        />
        <AddPopup
          show={isAddPopupVisible}
          onClose={hideAddPopup}
          onChange={onChange}
          values={values}
          onAdd={onAdd}
          historyItems={historyItems}
          onComboItemSelect={this.onComboItemSelect}
        />
        <EditPopup
          show={isEditPopupVisible}
          onClose={hideEditPopup}
          onChange={onChange}
          values={values}
          onEdit={onEdit}
        />
        <Dialog
          show={isDialogVisible}
          onClose={hideDialog}
          onAccept={dialogAcceptCallback}
          message={dialogMessage}
        />
      </div>
    );
  }
}

render(<App browser={browser} />, document.getElementById('root'));
