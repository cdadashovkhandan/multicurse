import * as vscode from 'vscode';

/// Append an input string and number to every single selection in a multi-line selection.
function numberText(textPromptInput: string, editor: vscode.TextEditor) {
	editor.edit(editBuilder => {
		for (const [index, sel] of editor.selections.entries()) {
			editBuilder.replace(sel, textPromptInput + String(index));
		}
	});
}

/// Main extension activation
export function activate(context: vscode.ExtensionContext) {

	console.log('Extension Active');

	// Command: Complete Selection
	const disposable = vscode.commands.registerCommand('multicurse.completeSelected', () => {

		const editor = vscode.window.activeTextEditor;

		if (editor) {
			var input = vscode.window.showInputBox();
			
			input.then(text => {
				numberText(text || "", editor)
			});
		}
	});

	context.subscriptions.push(disposable);
}

/// Deactivation
export function deactivate() {}