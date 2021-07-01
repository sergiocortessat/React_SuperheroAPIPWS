/* eslint-disable max-len */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import {
  Select, MenuItem, TextField, FormControl, InputLabel,
} from '@material-ui/core';
import SuperCard from './Components/SuperCard';
import fetchHeroes from './ApiFetch';
import CircularUnderLoad from './Components/Loading';
import './Components/supercard.css';
import './searchbar.css';

function App() {
  const [data, setData] = useState([]);
  const [gender, setGender] = useState('');
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const fetchingData = async () => {
      setData(await fetchHeroes(filter, gender));
    };

    fetchingData();
  }, [filter, gender]);

  if (data.length === 0 && !filter) {
    return (
      <div>
        <CircularUnderLoad />
      </div>
    );
  }
  return (
    <div className="App">

      <div className="searchContainer">
        <TextField
          className="textField"
          onClick={() => setFilter('')}
          onChange={(event) => setFilter(event.target.value)}
          variant="filled"
          value={filter}
          label="Supehero Name: "
        />
        <div className="selectContainer">
          <FormControl variant="filled" className="select">
            <InputLabel>Gender</InputLabel>
            <Select value={gender} onChange={(event) => setGender(event.target.value)}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="-">Genderless</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="supercard">
        {data && <SuperCard data={data} />}
      </div>
    </div>

  );
}

export default App;
