import { Notice, Plugin, TFile, TFolder } from "obsidian";

export default class MyPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "open-in-cursor",
			name: "Open in Cursor",
			callback: () => this.openInCursor(),
		});
	}

	onunload() {}

	async openInCursor(file: TFile | TFolder | null = null) {
		let activeFile: TFile | TFolder | null;
		if (!file) {
			activeFile = this.app.workspace.getActiveFile();
		} else {
			activeFile = file;
		}

		if (activeFile) {
			// Get the base path of the vault
			const basePath = (this.app.vault.adapter as any).getBasePath();

			// Combine the base path with the file path
			const fullPath = `${basePath}/${activeFile.path}`;

			const cursorUrl = `cursor://file/${encodeURIComponent(
				fullPath
			)}?windowId=_blank`;
			window.open(cursorUrl, "_blank");
		} else {
			new Notice("No active file to open");
		}
	}
}
