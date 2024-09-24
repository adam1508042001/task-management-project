import  {useState } from 'react'
import Header from './components/Header';
import Center from "./components/Center";
import EmptyBoard from './components/EmptyBoard';
import boardsSlice  from '../src/redux/boardsSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const dispatch = useDispatch() 
  const boards = useSelector((state) => state.boards)
  const activeBoard = boards.find(board => board.isActive)

  if (!activeBoard && boards.length > 0) {  
    dispatch(boardsSlice.actions.setBoardActive({index : 0}))
    
  }


const [boardModalOpen, setBoardModalOpen] = useState(false)


  return (

  


<div
className='overflow-hidden overflow-x-scroll'
>

      <>
        {boards.length > 0 ?

          <>
            {/* header section */}
            <Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />


            {/* center section */}
            <Center />
          </>
          :
          <>
            <EmptyBoard setBoardModalOpen={setBoardModalOpen } type='add' />
          </>

        }

      </>

</div>
  )
}

export default App
