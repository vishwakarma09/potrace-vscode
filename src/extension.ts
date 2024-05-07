// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import Potrace from "./Potrace.class";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "potrace-vscode" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let helloWorld = vscode.commands.registerCommand(
    "potrace-vscode.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello VSCODE");
    }
  );
  context.subscriptions.push(helloWorld);

  let reInstall = vscode.commands.registerCommand(
    "potrace-vscode.re-install",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("re-install");
      console.log("re-install");
    }
  );
  context.subscriptions.push(reInstall);

  let getRandomImage = vscode.commands.registerCommand(
    "potrace-vscode.get-random-image",
    async () => {
      const potrace = new Potrace();
      await potrace.getRandomImage();
    }
  );
  context.subscriptions.push(getRandomImage);

  let convertToSvg = vscode.commands.registerCommand(
    "potrace-vscode.convert-to-svg",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("convert-to-svg");
    }
  );

  context.subscriptions.push(convertToSvg);
}

// This method is called when your extension is deactivated
export function deactivate() {}
