import style from "./Pickuser.module.css";
import crossIcon from "../assets/cross.png";
import data from "../assets/data.json";
import { useState, useRef } from "react";

const Pickuser = () => {
  const [allPeople, setAllPeople] = useState(data);
  const [selected, setSelected] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const allDetailsPopup = useRef(null);

  const handleSelect = (index) => {
    setSelected([allPeople[index], ...selected]);
    let updatedArray = allPeople.filter(
      (item, indexRemove) => indexRemove !== index
    );
    setAllPeople(updatedArray);
  };

  const handleRemove = (index) => {
    setAllPeople([...allPeople, selected[index]]);
    let updatedArray = selected.filter(
      (item, indexRemove) => indexRemove !== index
    );
    setSelected(updatedArray);
  };

  const handleFilter = (e) => {
    setSearchValue(e.target.value);
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPeople(filteredData);
    allDetailsPopup.current.style.display = "block";
  };

  return (
    <main className={style.container}>
      <h1 className={style.title}>Pick Users</h1>
      <div className={style.cardAndInputContainer}>
        {selected.map((item, index) => {
          return (
            <div className={style.details} key={index}>
              <img src={item.imgLink} alt="people" />
              <span>{item.name}</span>
              <img
                src={crossIcon}
                alt="cross"
                onClick={() => handleRemove(index)}
              />
            </div>
          );
        })}
        <input
          type="text"
          placeholder="Add new user..."
          onChange={handleFilter}
          value={searchValue}
          onClick={() => {
            allDetailsPopup.current.style.display = "block";
          }}
        />
      </div>
      <div className={style.allDetails} ref={allDetailsPopup}>
        {searchValue ? (
          filteredPeople.length !== 0 ? (
            filteredPeople.map((item, index) => {
              return (
                <div key={index} onClick={() => handleSelect(index)}>
                  <img src={item.imgLink} alt="people" />
                  <span>{item.name}</span>
                  <span>{item.email}</span>
                </div>
              );
            })
          ) : (
            <h1 className={style.noResult}>No result Found</h1>
          )
        ) : (
          allPeople.map((item, index) => {
            return (
              <div key={index} onClick={() => handleSelect(index)}>
                <img src={item.imgLink} alt="people" />
                <span>{item.name}</span>
                <span>{item.email}</span>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};

export default Pickuser;
