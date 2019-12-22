import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cs from 'classnames';
import EditButton from './EditButton';
import ProfilesPopup from './ProfilesPopup';
import { setProfile } from '../Actions/Profiles';

const Profiles = () => {
  const [isPopup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Profiles.data);
  const isLoaded = useSelector((state) => state.Profiles.isLoaded);
  const currentProfile = useSelector((state) => state.Profiles.current);

  const onSelect = (id) => {
    dispatch(setProfile(id));
  };

  return (
    <div className="profiles">
      <div className="profiles__inner">
        <div className="profiles__items">
          {
            data.map((p) => (
              <button
                onClick={() => onSelect(p.id)}
                key={p.id}
                type="button"
                className={cs('profiles__item', {
                  profiles__item_active: currentProfile === p.id,
                })}
              >
                {p.title}
              </button>
            ))
          }
        </div>
        {
          isLoaded && (
            <EditButton className="profiles" onClick={() => setPopup(true)} />
          )
        }
      </div>
      <ProfilesPopup onClose={() => setPopup(false)} isOpen={isPopup} />
    </div>
  );
};

// class Tmp extends Component {
//   state = {
//     value: '',
//     showInput: false,
//   };
//
//   componentDidMount() {
//     document.addEventListener('keydown', this.hideInput);
//   }
//
//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.hideInput);
//   }
//
//   onSubmit = (e) => {
//     e.preventDefault();
//     const { addProfile } = this.props;
//     const { value } = this.state;
//
//     if (!value) {
//       return;
//     }
//
//     addProfile(value);
//   };
//
//   toggleInput = () => {
//     const { showInput } = this.state;
//
//     this.setState({
//       showInput: !showInput,
//     });
//   };
//
//   hideInput = ({ key }) => {
//     const { showInput } = this.state;
//
//     if (!showInput || key !== 'Escape') {
//       return;
//     }
//
//     this.setState({
//       showInput: false,
//     });
//   };
//
//   onChange = ({ target }) => {
//     const { value } = target;
//
//     this.setState({
//       value,
//     });
//   };
//
//   render() {
//     const { data, current, setProfile } = this.props;
//     const { value, showInput } = this.state;
//     const { onSubmit, onChange, toggleInput } = this;
//
//     if (!data.length) {
//       return null;
//     }
//
//     const currentId = current ? current.id : data[0].id;
//
//     return (
//       <div className="profiles">
//         <div className="profiles__inner">
//           {
//             data.map(p => (
//               <button
//                 onClick={() => setProfile(p)}
//                 key={p.id}
//                 type="button"
//                 className={cs('profiles__item', {
//                   profiles__item_active: currentId === p.id,
//                 })}
//               >
//                 {p.title}
//               </button>
//             ))
//           }
//           <form className="profiles__form" onSubmit={onSubmit}>
//             <input
//               type="text"
//               value={value}
//               onChange={onChange}
//               className={cs('profiles__input', {
//                 profiles__input_show: showInput,
//               })}
//             />
//             <button
//               onClick={toggleInput}
//               className="profiles__add"
//               type="button"
//             >
//               <span
//                 className={cs('profiles__add-line profiles__add-line_1', {
//                   'profiles__add-line_1-close': showInput,
//                 })}
//               />
//               <span
//                 className={cs('profiles__add-line profiles__add-line_2', {
//                   'profiles__add-line_2-close': showInput,
//                 })}
//               />
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

export default Profiles;
