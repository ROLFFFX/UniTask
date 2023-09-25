import React from "react";

function MainSideBar() {
  return (
    <div className="sidebar">
      <button
        className="sidebar-button"
        onClick={() => {
          alert("u clicked button 1!");
        }}
      >
        Button 1
      </button>
      <button className="sidebar-button">Button 2</button>
      <button className="sidebar-button">Button 3</button>
      <button className="sidebar-button">Button 4</button>
      <button className="sidebar-button">Button 5</button>
      <button className="sidebar-button">Button 6</button>
      <button className="sidebar-button">Button 7</button>
      <button className="sidebar-button">Button 8</button>
    </div>
  );
}

export default MainSideBar;
