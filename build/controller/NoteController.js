"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = require("../model/Note");
const NoteRepo_1 = require("../repository/NoteRepo");
class NoteController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_note = new Note_1.Note();
                console.log(req.body);
                new_note.name = req.body.name;
                new_note.description = req.body.description;
                yield new NoteRepo_1.NoteRepo().save(new_note);
                res.status(201).json({
                    status: "Created",
                    message: "successfully created note",
                });
            }
            catch (err) {
                return res
                    .status(500)
                    .json({ status: "internal error", message: "internal error" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                yield new NoteRepo_1.NoteRepo().delete(id);
                res.status(200).json({
                    status: "ok!",
                    message: "successfully deleted note",
                });
            }
            catch (err) {
                return res
                    .status(500)
                    .json({ status: "internal error", message: "internal error" });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield new NoteRepo_1.NoteRepo().retrieveAll();
                res.status(200).json({
                    status: "ok!",
                    message: "successfully fetched all notes",
                    result: note,
                });
            }
            catch (err) {
                return res
                    .status(500)
                    .json({ status: "internal error", message: "internal error" });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                const note = yield new NoteRepo_1.NoteRepo().retrieveById(id);
                res.status(200).json({
                    status: "ok!",
                    message: "successfully fetched note",
                    result: note,
                });
            }
            catch (err) {
                return res
                    .status(500)
                    .json({ status: "internal error", message: "internal error" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                const update_note = new Note_1.Note();
                update_note.id = id;
                update_note.name = req.body.name;
                update_note.description = req.body.description;
                yield new NoteRepo_1.NoteRepo().update(update_note);
                res.status(200).json({
                    status: "ok!",
                    message: "successfully updated note",
                });
            }
            catch (err) {
                return res
                    .status(500)
                    .json({ status: "internal error", message: "internal error" });
            }
        });
    }
}
exports.default = new NoteController();
