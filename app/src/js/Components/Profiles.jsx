import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import { setProfileAction, addProfileAction } from '../Actions/Profiles';

class Profiles extends Component {
  state = {
    value: '',
    showInput: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.hideInput);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.hideInput);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { addProfile } = this.props;
    const { value } = this.state;

    if (!value) {
      return;
    }

    addProfile(value);
  };

  toggleInput = () => {
    const { showInput } = this.state;

    this.setState({
      showInput: !showInput,
    });
  };

  hideInput = ({ key }) => {
    const { showInput } = this.state;

    if (!showInput || key !== 'Escape') {
      return;
    }

    this.setState({
      showInput: false,
    });
  };

  onChange = ({ target }) => {
    const { value } = target;

    this.setState({
      value,
    });
  };

  render() {
    const { data, current, setProfile } = this.props;
    const { value, showInput } = this.state;
    const { onSubmit, onChange, toggleInput } = this;

    if (!data.length) {
      return null;
    }

    const currentId = current ? current.id : data[0].id;

    return (
      <div className="profiles">
        <div className="profiles__inner">
          {
            data.map(p => (
              <button
                onClick={() => setProfile(p)}
                key={p.id}
                type="button"
                className={cs('profiles__item', {
                  profiles__item_active: currentId === p.id,
                })}
              >
                {p.title}
              </button>
            ))
          }
          <form className="profiles__form" onSubmit={onSubmit}>
            <input
              type="text"
              value={value}
              onChange={onChange}
              className={cs('profiles__input', {
                profiles__input_show: showInput,
              })}
            />
            <button
              onClick={toggleInput}
              className="profiles__add"
              type="button"
            >
              <span
                className={cs('profiles__add-line profiles__add-line_1', {
                  'profiles__add-line_1-close': showInput,
                })}
              />
              <span
                className={cs('profiles__add-line profiles__add-line_2', {
                  'profiles__add-line_2-close': showInput,
                })}
              />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  addProfile: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  current: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  current: state.Profiles.current,
  data: state.Profiles.data,
});

export default connect(mapStateToProps, {
  setProfile: setProfileAction,
  addProfile: addProfileAction,
})(Profiles);
