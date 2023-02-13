import s from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { filterContacts } from 'redux/filter/filterSlice';

export default function Filter() {
  const dispatch = useDispatch();

  const changeInput = e => {
    dispatch(filterContacts(e.target.value));
  };

  return (
    <label className={s.filterLabel}>
      <input
        className={s.filter}
        type="text"
        name="filter"
        onChange={changeInput}
        placeholder="Find contacts by name"
      />
    </label>
  );
}
