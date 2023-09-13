import {useState } from "react";

const OrderBy = ({ updateOrderByValue }: { updateOrderByValue: (orderBy: string) => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Pick order");
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const orderOptions = ["Date added", "Game title", "Release date", "Game score"];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    const orderingValue = getOrderingValue(option);
    updateOrderByValue(orderingValue);
  };
  const getOrderingValue = (option: string) => {
    switch (option) {
      case "Date added":
        return "added";
      case "Game title":
        return "name";
      case "Release date":
        return "released";
      case "Game score":
        return "-metacritic";
      default:
        return "-metacritic"; 
    }
  };

  return (
    <div className="home__orderBy">
      <p>Order by:</p>
      <button className="orderBy__orderByButton" onClick={toggleDropdown}>
        {selectedOption}
      </button>
      {isDropdownOpen && (
        <div className="orderDropdown">
          {orderOptions.map((option) => (
            <button key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderBy;
