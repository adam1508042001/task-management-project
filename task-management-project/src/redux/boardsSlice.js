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








      }

})



export default boardsSlice;