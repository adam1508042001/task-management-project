
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";



function HeaderDropdown({setOpenDropdown}) {

const boards = useSelector((state) => state.boards)
console.log('boards = ' , boards);



  return (

    <div   className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown ">
        
        {/* Drop down module  */}
        <div
        className=" bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl"
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
                all boards ({boards?.length})
            </h3> 
            


            <div className=" dropdown-board  ">
            {boards.map((board, index) => (
            <div
              className={` flex items-baseline space-x-2 px-5 py-4  ${
                board.isActive &&
                " bg-[#635fc7] rounded-r-full text-white mr-8 "
              } `}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <img src={boardIcon} className="  filter-white  h-4 " />{" "}
              <p className=" text-lg font-bold  ">{board.name}</p>
            </div>
          ))}

           
  

            </div>

        </div>
    </div>


  )



}

export default HeaderDropdown
