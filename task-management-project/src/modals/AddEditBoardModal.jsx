import React from 'react'
import  {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";



function AddEditBoardModal({setBoardModalOpen, type  }) {

  const [name, setName] = useState('');
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const [newColumns, setNewColumns] = useState(
    [
      
      {name : 'Todo', tasks : [] , id : uuidv4()},
      {name : 'Doing', tasks : [] , id : uuidv4() },
      

    ]
  )

  const [isFirstLoad, setIsFirstLoad] = useState(true)


if (type === 'edit' && isFirstLoad) {
  setNewColumns(
    board.columns.map((col) => {
      return { ...col, id: uuidv4() };
    })
  );

  setName(board.name);
  setIsFirstLoad(false);
}

  const [isValid, setIsValid] = useState(true);
 
  const onChange = (id , newValue ) => {

    setNewColumns((pervState) =>  {
      const newState = [...pervState]
      // le precedent tableau gardera que les lignes avec un id qui differe de l'id selecrtionné et passé a la function 
      const column = newState.find((col) => col.id === id)
      column.name = newValue
      return newState
    })
  }

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0 ; i < newColumns.length ; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };


  const dispatch = useDispatch(); 


  const onSubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };









  return (
    <div
      onClick={
        (e) => {
          if (e.target !== e.currentTarget) {
            return

          }

          setBoardModalOpen(false);

        }

      }
      className="  scrollbar-hide fixed right-0 top-0 px-2 py-4 overflow-scroll   z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      >

      <div
        className=" bg-gray-500  scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
 shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >


         {/* pour reutiliser le composant */}
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>



         {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Board Name 
          </label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" exemple: React learning"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>






          {/* Board Columns */}

          <div className="mt-8 flex flex-col space-y-3">

          <label className=" text-sm dark:text-white text-gray-500">
            Board Columns
          </label>



          {newColumns.map((column, index) => (
            <div key={index} className=" flex items-center w-full ">
              <input
                className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                type="text"
                value={column.name}
              />
              

              
              <img
                src={crossIcon}
                onClick={() => {
                  onDelete(column.id);
                }}
                className=" m-4 cursor-pointer "
              />
            </div>
          ))}
           <div>
            <button
              className=" w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
              }}
            >
              + Add New Column
            </button>
            <button
              onClick={() => {
                const isValid = validate();
                if (isValid === true) onSubmit(type);
              }}
              className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full"
            >
              {type === "add" ? "Create New Board" : "Save Changes"}


            </button>
          </div>
          </div>
      </div>
    </div>
  )
}

export default AddEditBoardModal 
