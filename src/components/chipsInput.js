import { useState, useEffect } from "react";

const ChipsInput = () => {
  const [suggestionChips, setSuggestionChips] = useState([]);
  const [chips, setChips] = useState([]);
  const [searchedSuggestions, setSearchedSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const [readyToRemove, setReadyToRemove] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) =>
        res.json().then((data) => {
          const options = data.users
            .map((user) => ({
              id: user.id,
              name: user.firstName + " " + user.lastName,
              email: user.email,
              image: user.image,
            }))
            .splice(0, 15);
          setSuggestionChips(options);
          //console.log(options);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  const addChip = (chip, index) => {
    setChips([...chips, chip]);
    const newSuggestionChips = [...suggestionChips];
    newSuggestionChips.splice(index, 1);
    setSuggestionChips(newSuggestionChips);
    setReadyToRemove(false);
    setInput("");
  };

  const handleInputChange = (e) => {
    //console.log(e.target.value);
    setInput(e.target.value);
    const newSearchSuggestions = suggestionChips.filter((chip) =>
      chip.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedSuggestions(newSearchSuggestions);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !input && !readyToRemove) {
      setReadyToRemove(true);
    } else if (e.key === "Backspace" && !input && readyToRemove) {
      setReadyToRemove(false);
      removeChip(chips.length - 1);
    }
  };

  const removeChip = (index) => {
    const newChips = [...chips];
    newChips.splice(index, 1);
    setSuggestionChips((prev) => [...prev, chips[index]]);
    setChips(newChips);
    setReadyToRemove(false);
  };

  return (
    <div>
      <div>
        <p className="header">
          Pick Users
          {console.log(chips)}
        </p>
      </div>

      <div className="chips-input-container">
        {chips.map((chip, index) => (
          <div
            key={index}
            className={`chip ${
              index === chips.length - 1 && readyToRemove ? "highlight" : ""
            }`}
          >
            <img className="chip-image" src={chip.image} alt="img" />
            <span className="chip-name">{chip.name}</span>
            <span className="chip-close" onClick={() => removeChip(index)}>
              x
            </span>
          </div>
        ))}

        <div style={{ position: "relative" }}>
          <input
            type="text"
            id="customSearchDropdown"
            className="input-container"
            placeholder="Add new users..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          <div className="suggest-chips-container" id="customScrollableDiv">
            {input === "" &&
              suggestionChips.map((chip, index) => {
                //console.log(chip);
                return (
                  <div
                    key={index}
                    className="suggest-chip"
                    onClick={() => addChip(chip, index)}
                  >
                    <div className="name-and-image">
                      <img className="chip-image" src={chip.image} alt="img" />
                      <p className="suggest-name">{chip.name}</p>
                    </div>
                    <span className="chip-email">{chip.email}</span>
                  </div>
                );
              })}

            {input !== "" &&
              searchedSuggestions.map((chip, index) => {
                //console.log(chip);
                return (
                  <div
                    key={index}
                    className="suggest-chip"
                    onClick={() => addChip(chip, index)}
                  >
                    <div className="name-and-image">
                      <img className="chip-image" src={chip.image} alt="img" />
                      <p className="suggest-name">{chip.name}</p>
                    </div>
                    <span className="chip-email">{chip.email}</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="input-bar"></div>
      </div>
    </div>
  );
};

export default ChipsInput;
