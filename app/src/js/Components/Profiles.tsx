import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cs from 'classnames';
import { browser } from 'webextension-polyfill-ts';
import EditButton from './EditButton';
import ProfilesPopup from './ProfilesPopup';
import { setProfile } from '../Actions/profiles';
import { IStore } from '../Reducers';

const Profiles = () => {
  const [isPopup, setPopup] = React.useState(false);
  const dataRef = React.useRef([]);
  const currentRef = React.useRef('');
  const dispatch = useDispatch();
  const data = useSelector((state: IStore) => state.profiles.data);
  const isLoaded = useSelector((state: IStore) => state.profiles.isLoaded);
  const currentProfile = useSelector((state: IStore) => state.profiles.current);
  dataRef.current = data;
  currentRef.current = currentProfile;

  const onSelect = (id: string) => {
    dispatch(setProfile(id));
  };

  const onCommand = (command: string) => {
    const index = dataRef.current.findIndex((p) => p.id === currentRef.current);

    if (index === -1) {
      return;
    }

    if (command === 'profile-next' && index < dataRef.current.length - 1) {
      onSelect(dataRef.current[index + 1].id);
    }

    if (command === 'profile-prev' && index > 0) {
      onSelect(dataRef.current[index - 1].id);
    }
  };

  React.useEffect(() => {
    browser.commands.onCommand.addListener(onCommand);

    return () => {
      browser.commands.onCommand.removeListener(onCommand);
    };
  }, []);

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

export default Profiles;
