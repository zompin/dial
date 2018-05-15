import React, {Component} from 'react';
import XButton from './XButton';

class Popup extends Component {
  close = (e) => {
    if (e.target.dataset.action === 'close') {
      this.props.onClose();
    }
  };

  onEsc = (e) => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  componentWillMount() {
    document.addEventListener('keydown', this.onEsc, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
  }

  render() {
    const {children, show} = this.props;
    const classList = ['popup'];

    if (!show) {
      classList.push('popup_hidden');
    }

    return (
      <div className={classList.join(' ')} onClick={this.close} data-action="close">
        <div className="popup__inner">
          <XButton onClick={this.close} action="close" className="popup"/>
          {children}
        </div>
      </div>
    );
  }
}

export default Popup;
