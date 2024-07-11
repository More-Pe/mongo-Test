import { Types } from "mongoose";
import Game from "./game.model.js";
export const createGame = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    const newGame = await Game.create({
      title: title,
      description: description,
    });

    res.status(201).json({
        success: true,
        message: "Game created succesfully",
        data: newGame
    })
  } catch (error) {
    if (error.message == "Title and description are required") {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: "Error creating game!",
      error: error.message
    });
  }
};

export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find()

    res.status(200).json(
      {
        success: true,
        message: "Games retrieved successfully",
        data:games
      }
    )
    
  } catch (error) {
    res.status(500).json(
      {
        succes: false,
        message: "Error retrieving games",
        error: error.message
      }
    )
    
  }
}

export const deleteGameById = async (req, res) => {
  try {
    const gameId = req.params.id
    const gameToDeleteValid = Types.ObjectId.isValid(gameId)
    
    const deletedGame =await Game.findByIdAndDelete(gameId)
    if(!deletedGame){
        return res.status(404).json({
            succes:false,
            message:"Not Game found"
        })
    }


    if(!gameToDeleteValid) {
      res.status(400).json(
        {
          succes: false,
          message: "Id not valid"
        }
      )
    }
    

    res.status(200).json(
      {
        success: true,
        message: "Game deleted successfully",

      }
    )
    
  } catch (error) {
    res.status(500).json(
      {
        succes: false,
        message: "Error deleting game",
        error: error.message
      }
    )
    
  }
}

