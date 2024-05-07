import * as fs from "fs";
import * as https from "https";
import path from "path";
import os from "os";

import * as vscode from "vscode";
import { File } from "buffer";

/**
 * Potrace class
 * #methods
 * - getRandomImage
 * - convertToSvg
 */
interface PotraceBase {
  getRandomImage(): void;
}

class Potrace implements PotraceBase {
  getRandomImage = async () => {
    const tempFolder = os.tmpdir();
    const currentFolder = vscode.workspace.rootPath;
    const imagePath = path.join(tempFolder, "random-image.jpg");
    const imageUrl = "https://picsum.photos/200/300";

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    // convert blob to buffer
    const buffer = await blob.arrayBuffer();
    const view = new Uint8Array(buffer);

    const file = fs.createWriteStream(imagePath);
    file.write(view);
    file.close();

    file.on("finish", async function () {
      console.log("inside finish");
      file.close(); // close() is async, call openImage() in its callback.

      // Open the image in VS Code
      const imageUri = vscode.Uri.parse(imagePath);
      vscode.commands.executeCommand("vscode.open", imageUri);
    });

    /*
    // Download the image
    const file = fs.createWriteStream(imagePath);
    https
      .get(imageUrl, function (response) {
        response.pipe(file);
        file
          .on("finish", async function () {
            console.log("inside finish");
            file.close(); // close() is async, call openImage() in its callback.

            // Open the file in the current workspace folder
            const fileUri = vscode.Uri.file(imagePath);
            const document = await vscode.workspace.openTextDocument(fileUri);
            vscode.window.showTextDocument(document);
          })
          .on("error", function (err) {
            console.log("inside error", err.message);
            // Handle errors
            fs.unlink(imagePath, () => console.log("done")); // Delete the file async. (But we don't check the result)
            vscode.window.showErrorMessage(
              "Failed to download image: " + err.message
            );
          })
          .on("close", async function () {
            console.log("inside close");
            // Open the image in VS Code
            // const imageUri = vscode.Uri.parse(imagePath);
            // vscode.commands.executeCommand("vscode.open", imagePath);

            // Open the file in the current workspace folder
            const fileUri = vscode.Uri.file(imagePath);
            const document = await vscode.workspace.openTextDocument(fileUri);
            vscode.window.showTextDocument(document);
          });
      })
      .on("error", function (err) {
        // Handle errors
        fs.unlink(imagePath, () => console.log("done")); // Delete the file async. (But we don't check the result)
        vscode.window.showErrorMessage(
          "Failed to download image: " + err.message
        );
      });

      */
  };

  convertToSvg(): void {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("convert-to-svg");
  }
}

export default Potrace;
