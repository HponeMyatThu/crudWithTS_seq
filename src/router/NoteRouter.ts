import BaseRoutes from "./base/BaseRouter";
import validate from "../helper/validate";
import { createNoteSchema, updateNoteSchema } from "../schema/NoteSchema";
import NoteController from "../controller/NoteController";

class NoteRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("", validate(createNoteSchema), NoteController.create);
    this.router.patch(
      "/:id",
      validate(updateNoteSchema),
      NoteController.update
    );
    this.router.delete("/:id", NoteController.delete);
    this.router.get("", NoteController.findAll);
    this.router.get("/:id", NoteController.findById);
  }
}

export default new NoteRoutes().router;
