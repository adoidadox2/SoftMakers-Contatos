import * as shell from "shelljs";
import path from "path";

export default (imageToBeDeleted: string) => {
  shell.rm(
    "-rf",
    path.resolve(__dirname, "..", "..", "uploads", imageToBeDeleted)
  );
};
