import React, { useEffect, useState } from "react";
import Select from "react-select";

const CustomOption = ({ innerProps, name, data }) => (
  <div {...innerProps}>
    <img
      src={data.image}
      alt={name}
      style={{ marginRight: "8px", width: "24px", height: "24px" }}
    />
    {name}
  </div>
);

const SearchableDropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [chips, setChips] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((user) => ({
          id: user.id,
          name: user.name,
          image: user.image,
        }));
        setChips(options);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={chips}
      isSearchable
      components={{ Option: CustomOption }}
      placeholder="Select an option"
    />
  );
};

export default SearchableDropdown;
