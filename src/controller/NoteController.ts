import { Request, Response } from "express";
import { Note } from "../model/Note";
import { NoteRepo } from "../repository/NoteRepo";

class NoteController {
  async create(req: Request, res: Response) {
    try {
      const new_note = new Note();
      console.log(req.body);
      
      new_note.name = req.body.name;
      new_note.description = req.body.description;

      await new NoteRepo().save(new_note);

      res.status(201).json({
        status: "Created",
        message: "successfully created note",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "internal error", message: "internal error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);

      await new NoteRepo().delete(id);

      res.status(200).json({
        status: "ok!",
        message: "successfully deleted note",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "internal error", message: "internal error" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const note = await new NoteRepo().retrieveAll();

      res.status(200).json({
        status: "ok!",
        message: "successfully fetched all notes",
        result: note,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "internal error", message: "internal error" });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const note = await new NoteRepo().retrieveById(id);

      res.status(200).json({
        status: "ok!",
        message: "successfully fetched note",
        result: note,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "internal error", message: "internal error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const update_note = new Note();

      update_note.id = id;
      update_note.name = req.body.name;
      update_note.description = req.body.description;

      await new NoteRepo().update(update_note);

      res.status(200).json({
        status: "ok!",
        message: "successfully updated note",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "internal error", message: "internal error" });
    }
  }
}

export default new NoteController();
