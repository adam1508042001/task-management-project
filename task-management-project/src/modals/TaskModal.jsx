import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ElipsisMenu from '../components/ElipsisMenu'
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import Subtask from '../components/Subtask';
import boardsSlice from '../redux/boardsSlice';
import DeleteModal from './DeleteModal';
import AddEditTaskModal from './AddEditTaskModal';

function TaskModal({colIndex , taskIndex, setIsTaskModalOpen, }) {


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


const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)


const setOpenEditModal = () => {
  setIsAddTaskModalOpen(true);
  setIsElipsisMenuOpen(false);
};


const setOpenDeleteModal = () => {
  setIsElipsisMenuOpen(false);
  setIsDeleteModalOpen(true);
};

const onclose = (e) => {
if (e.target !== e.currentTarget) {
  return 
  
}
{dispatch(boardsSlice.actions.setTaskStatus(
  {taskIndex, colIndex, newColIndex, status}
))
setIsTaskModalOpen(false)

}
}




const onChange = (e) => {
  setStatus(e.target.value);
  setNewColIndex(e.target.selectedIndex);
}

const onDeleteBtnClick = () => {
  dispatch(boardsSlice.actions.deleteTask({taskIndex, colIndex}))
setIsTaskModalOpen(false)
setIsDeleteModalOpen(false)
}





return (
    <div
    onClick={onclose}
          className=" fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
    >
      {/* Modal section */}
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

          <div
          className=" mt-3 space-y-2"
          >

{subtasks.map((subtask, index) => {
            return (
              <Subtask
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={index}
              />
            );
          })}

          </div>


          <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          
          
          
          <select
            className=" select-status  px-4 py-3 rounded-md text-sm bg-transparent focus:border-5 border-[4px]  hover:bg-gray-600  border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((column, index) => (

              //on fait appel a la classe dans index.css
              <option className="status-options dark:bg-[#2b2c37]  " key={index}>
                {column.name}
              </option>
            ))}
          </select>
        

        

          </div>

          
      </div>



{
  isDeleteModalOpen &&  (
    <DeleteModal 
    setIsDeleteModalOpen={setIsDeleteModalOpen}
    onDeleteBtnClick={onDeleteBtnClick}
    title={task.title}
    type='task'
    />
  )
}

{
  isAddTaskModalOpen &&  
    <AddEditTaskModal 
    setOpenAddEditTask={setIsAddTaskModalOpen}
    type='edit'
    taskIndex={taskIndex}
    colIndex={colIndex}
    setIsAddTaskModalOpen={setIsTaskModalOpen}
    />
  
}


    </div>
  )
}
export default TaskModal