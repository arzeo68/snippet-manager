<p align="center">
  <a href="https://bun.sh"><img src="documentation_asset/logo.png" alt="Logo" height=170></a>
</p>

# Snipper - VS Code Extension

This is a vscode extension that allows you to access your snippets from the command palette.

## Usage

### `vscode` command

- Snipper: Open your snippet list in the command palette

## Configuration
You can replace the file containing the default snippet list with your own.
Your file must be a json file containing an array of snippet objects and It should follow the snippet format guideline describe in the **Snippet format** section. If you want a example, you can check the default [`snippets`](https://raw.githubusercontent.com/arzeo68/snippet/master/snippet.json) file.

To do this, in vscode press Ctrl + Shift + P,
Then search for "Open User Settings (JSON)".  
This command will open your vscode configuration file, and you'll need to add to it:

```json
    "snipper": {
        "url": "https://raw.githubusercontent.com/arzeo68/snippet/master/snippet.json"
    }
```

## Contribution

#### Features
You can contribute to this extension by adding new features or fixing bugs. To do so, you can fork this repository and create a pull request.

#### Snippets

You can also contribute by adding new snippets to the [`snippets`](https://github.com/arzeo68/snippet) repository. To do so, you can create a pull request on it. Please follow the snippet format.

## Snippet format

```json
{
	"label": "Snippet name",
	"description": "Snippet description",
	"body": [
		"snippet body"
	],
}
```
In the snippet body, you can use the following variables:
- `$1`, `$2`, ...: tab stops
- `$0`: final cursor position
- `$CURRENT_YEAR`, `$CURRENT_YEAR_SHORT`, `$CURRENT_MONTH`, `$CURRENT_DATE`, `$CURRENT_HOUR`, `$CURRENT_MINUTE`, `$CURRENT_SECOND`: date variables
- `$TM_FILENAME`, `$TM_FILENAME_BASE`, `$TM_DIRECTORY`, `$TM_FILEPATH`: file variables
- `$CLIPBOARD`: clipboard content
- `$WORKSPACE_NAME`: workspace name
- `$WORKSPACE_FOLDER`: workspace folder
- ... and all the others default vscode variables
