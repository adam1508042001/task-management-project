import React, { useState } from 'react'
import Logo from '../assets/logo-mobile.svg'
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from '../components/HeaderDropdown';
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from '../modals/AddEditTaskModal';
import ElipsisMenu from './ElipsisMenu';
import DeleteModal from '../modals/DeleteModal';
import boardsSlice from '../redux/boardsSlice';


function Header({ setBoardModalOpen, boardModalOpen }) {


    const [openDropdown, setOpenDropdown] = useState(false)

    const [boardtype, setBoardtype] = useState('add')

    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive);





    const [openAddEditTask, setOpenAddEditTask] = useState(false);

    const [isElipsisOpen, setIsElipsisOpen] = useState(false)


    const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);



    const setOpenEditModal = () => {
        setBoardModalOpen(true);
        setIsElipsisOpen(false);


    };

    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
        setIsElipsisOpen(false);
    };


    const onDeleteBtnClick = () => {
        dispatch(boardsSlice.actions.deleteBoard())
        dispatch(boardsSlice.actions.setBoardActive({index : 0 }))
        setIsDeleteModalOpen(false)
    }


    const openDropdownClick= () => {
        setOpenDropdown( state => !state)
        setIsElipsisOpen(false)
        setBoardtype('add')
    }



    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                {
                    setOpenAddEditTask(false)
                    setOpenDropdown(false)
                    setOpenDropdown(false)



                }

            }}
            className=" p-4 fixed left-0 bg-gray-400 dark:bg-[#2b2c37] z-50 right-0 ">

            <header className=" flex justify-between dark:text-white items-center " >

                {/* left side */}
                <div className="  flex items-center space-x-2  md:space-x-4">
                    <img src={Logo} alt=" Logo " className=" h-6 w-6" />
                    <h3 className=" md:text-4xl   md:inline-block font-bold  font-sans">
                        TaskIt
                    </h3>
                    <div className=" cursor-pointer flex items-center ">
                        <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">


                            {board.name}


                        </h3>

                        <img src={openDropdown ? iconUp : iconDown}
                            alt="dropDown icon "
                            className=" w-3 ml-2 md:hidden"
                            onClick={() => {
                                openDropdownClick()
                            }
                            }

                        />




                    </div>
                </div>


                {/* ###################################################### */}

                {/* right side */}

                <div
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsElipsisOpen(state => !state);

                        }
                    }}

                    className=" flex space-x-4 items-center md:space-x-6 ">
                    <button className=" button hidden md:block " >
                        + Add new task
                    </button>

                    <button
                        onClick={
                            () => {
                                setOpenAddEditTask(state => !state)

                            }
                        }
                        className=" button py-1 px-3 md:hidden ">
                        +
                    </button>

                    <img

                        src={elipsis}
                        alt="elipsis"
                        className=" cursor-pointer h-6"
                        onClick={() => {

                            setBoardtype('edit');
                            setIsElipsisOpen(state => !state)
                            setOpenAddEditTask(false)
                            setOpenDropdown(false)
                            setBoardModalOpen(false);


                        }}


                    />

                    {
                        isElipsisOpen &&
                        <ElipsisMenu
                        setOpenDeleteModal={setOpenDeleteModal}
                            setOpenEditModal={setOpenEditModal}
                            type="Boards"
                        />
                    }



                </div>


            </header >


            {openDropdown && <HeaderDropdown setBoardModalOpen={setBoardModalOpen} setOpenDropdown={setOpenDropdown} />}

            {
                // type add pour afficher la version add de modal
                boardModalOpen && <AddEditBoardModal type={boardtype} boardModalOpen={boardModalOpen}
                setBoardModalOpen={setBoardModalOpen}  />
            }

            {

                openAddEditTask && <AddEditTaskModal setOpenAddEditTask={setOpenAddEditTask} setIsAddTaskModalOpen={setIsAddTaskModalOpen} device='mobile' type='add'
                />

            }

            {
                isDeleteModalOpen && <DeleteModal type='board' onDeleteBtnClick={onDeleteBtnClick}  title={board.name} setIsDeleteModalOpen={setIsDeleteModalOpen} />
            }


        </div >
    )
}

export default Header
