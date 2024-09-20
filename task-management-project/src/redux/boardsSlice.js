import {  createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";


const boardsSlice = createSlice({
    name : 'boards',
    initialState : data.boards,
    reducers : {

        addBoard: (state, action) => {
            const isActive = state.length > 0 ? false : true;
            const payload = action.payload;
            const board = {
              name: payload.name,
              isActive,
              columns: [],
            };
            board.columns = payload.newColumns;
            state.push(board);
          },
        


        


          // Action pour activer un board
    setBoardActive: (state, action) => {
      const index = action.payload.index;
      // On parcourt tous les boards et on met isActive à true seulement pour le board sélectionné
      state.forEach((board, i) => {
        board.isActive = i === index;  // Activer uniquement le board cliqué
      });
    },

    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, subtasks, status };
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === newColIndex);
      column.tasks.push(task);
    },

    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },






      }

})



export default boardsSlice;