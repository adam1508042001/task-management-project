import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg"; 
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode";


function HeaderDropdown({ setOpenDropdown, setBoardModalOpen }) {

  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );


  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards)



  return (

    <div className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown ">

      {/* Drop down module  */}
      <div
        className=" bg-gray-400 dark:bg-[#474b72] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl"
        onClick={(e) => {
          if (e.target !== e.currentTarget) {
            return

          }
          setOpenDropdown(false)
        }}
      >
        <h3
          className=" dark:text-gray-300 text-gray-600 font-bold mx-9 mb-8  "
        >
          All boards ({boards?.length})
        </h3>



        <div className="  dropdown-board  ">
          {boards.map((board, index) => (
            <div
              className={` cursor-pointer flex items-baseline dark:text-white space-x-2 px-5 py-4  ${board.isActive &&
                " bg-[#635fc7] rounded-r-full text-white mr-8 "
                } `}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <img src={boardIcon} alt="icon" className="  filter-white  h-4 " />{" "}
              <p className="  text-lg font-bold  ">{board.name}</p>
            </div>
          ))}

          <div
          className=' cursor-pointer flex items-baseline space-x-2 text-[#635fc7] px-5 py-4'
          onClick={()=> {
            setBoardModalOpen(true);
            setOpenDropdown(false);
          }}
          >
            <img src={boardIcon} alt="icon" />
            <p
            className=" text-lg font-bold  "
            >
              Create new board
            </p>

          </div>



          <div className=" mx-3  p-4  space-x-2 bg-gray-200 mt-6 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
            <img src={lightIcon} alt="sun indicating light mode" />

            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${darkSide ? "bg-[#635fc7]" : "bg-[#635fc7]"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              
              <span
                className={`${darkSide ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-gray-600 transition`}
              />
            </Switch>

            <img src={darkIcon} alt="moon indicating dark mode" />


          </div>

        </div>

      </div>
    </div>


  )



}

export default HeaderDropdown
