import {  createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";


const boardsSlice = createSlice({
    name : 'boards',
    initialState : data.boards,
    reducers : {
        //si on veut modifier l'etat de slice en repondant a une action 
        }
})







export default boardsSlice;