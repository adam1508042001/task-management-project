import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ElipsisMenu from '../components/ElipsisMenu'
import elipsis from "../assets/icon-vertical-ellipsis.svg";

function TaskModal({colIndex , taskIndex, setIsTaskModalOpen}) {
  

  const dispatch = useDispatch()
  const boards = useSelector(state => state.boards)
  const board = boards.find(board => board.isActive)
  const columns = board.columns
  const col = columns.find((column , i) => colIndex === i)
  const task = col.tasks.find((col, i) => taskIndex === i)
  const subtasks = task.subtasks

  let completed  = 0 
  subtasks.forEach((subtasks) => {
      if(subtasks.isCompleted){
          completed++
      }   
  });


const [status, setStatus] = useState(task.status)

const [newColIndex, setNewColIndex] = useState(columns.indexOf(col))

const [isElipsisMenuOpen , setIsElipsisMenuOpen] = useState(false)


return (
    <div
          className=" fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
    >
      {/* Modalsection */}
      <div 
      className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <div className=" relative flex   justify-between w-full items-center">
        <h1 className=" text-lg">{task.title}</h1>
       
       
       
        <img
            onClick={() => {
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer h-6"
          />




          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>




        <p className=" text-gray-500 font-[600] tracking-wide text-xs pt-6">
          {task.description}
        </p>



        <p className=" pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>


        {/* subtask section */}

          <div>
            
          </div>


      </div>

    </div>
  )
}

export default TaskModal
