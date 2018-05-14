import React, { Component } from 'react';
import { render } from 'react-dom';
import BookmarksList from './Components/Bookmarks/BookmarksList';
import ControlPanel from './Components/ControlPanel';
import AddPopup from './Components/AddPopup';
import EditPopup from './Components/EditPopup';
import '../less/style.less';

class App extends Component {
    constructor(props) {
        super(props);
        this.bookmarksApi = props.browser.bookmarks;
        // this.historyApi = props.browser.history;
    }

    state = {
        bookmarks: [],
        bookmarksLoaded: false,
        isAddPopupVisible: false,
        isEditPopupVisible: false,
        values: {},
        editBookmarkId: '',
    };

    getBookmarks = () => {
        let { bookmarksApi } = this;

        this.setState({
            bookmarksLoaded: false,
        });

        bookmarksApi.getChildren("unfiled_____")
            .then(bookmarks => {
                return bookmarks.find(b => b.title === 'Dial' && b.type === 'folder');
            })
            .then(dialFolder => {
                if (!dialFolder) {
                    return bookmarksApi.create({
                        title: 'Dial',
                        parentId: 'unfiled_____'
                    });
                }

                this.folder = dialFolder;

                return bookmarksApi.getChildren(dialFolder.id);
            })
            .then(bookmarks => this.setState({ bookmarks, bookmarksLoaded: true }))
            .catch(this.errorHandler);
    };

    onChange = (name, value) => {
        const values = Object.assign({}, this.state.values, { [name]: value });
        // const { historyApi } = this;

        this.setState({
            values,
        });

        // historyApi.search({
        //     text: value,
        //     maxResults: 10,
        // })
        //     .then((t) => console.log(t))
        //     .catch(this.errorHandler);
    };
    
    onDelete = (id) => {
        let { bookmarksApi } = this;
        bookmarksApi.remove(id)
            .then(this.getBookmarks)
            .catch(this.errorHandler);
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
            .then(bookmark => {
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
        let {
            onChange,
            showAddPopup,
            hideAddPopup,
            onAdd,
            showEditPopup,
            hideEditPopup,
            onEdit,
        } = this;
        let {
            bookmarks,
            values,
            isAddPopupVisible,
            isEditPopupVisible,
        } = this.state;

        return (
            <div>
                <ControlPanel onAdd={showAddPopup} />
                <BookmarksList bookmarks={bookmarks} onDelete={this.onDelete} onEdit={showEditPopup} />
                <AddPopup show={isAddPopupVisible} onClose={hideAddPopup} onChange={onChange} values={values} onAdd={onAdd} />
                <EditPopup show={isEditPopupVisible} onClose={hideEditPopup} onChange={onChange} values={values} onEdit={onEdit} />
            </div>
        );
    }
}

render(<App browser={ browser } />, document.getElementById('root'));