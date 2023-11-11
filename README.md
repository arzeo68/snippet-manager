<p align="center">
	<img src="documentation_asset/logo.png" alt="Logo" height=170>
</p>

# Snipper - VS Code Extension

This is a vscode extension that allows you to access your snippets from the command palette.

## Usage

### `vscode` command

- Snipper: Open your snippet list in the command palette (based on the programming language of the current file)
- Snipper Update: Reload your snippet list from the url in the configuration

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
	"language": "programming language",
	"body": [
		"snippet body"
	],
}
```
### Language
The language field determines the programming language of the snippet. It is used to filter the snippet list in the command palette.

- If you want your snippet to be available in multiple languages, you can separate them with a comma.

### Variables
In the snippet body, you can use the following variables:
- `$1`, `$2`, ...: tab stops
- `$0`: final cursor position
- `$CURRENT_YEAR`, `$CURRENT_YEAR_SHORT`, `$CURRENT_MONTH`, `$CURRENT_DATE`, `$CURRENT_HOUR`, `$CURRENT_MINUTE`, `$CURRENT_SECOND`: date variables
- `$TM_FILENAME`, `$TM_FILENAME_BASE`, `$TM_DIRECTORY`, `$TM_FILEPATH`: file variables
- `$CLIPBOARD`: clipboard content
- `$WORKSPACE_NAME`: workspace name
- `$WORKSPACE_FOLDER`: workspace folder
- ... and all the others default vscode variables

## Future features

- [ ] Add a way to add snippets from the extension
- [ ] Add a way to edit snippets from the extension
- [ ] Add a way to delete snippets from the extension
- [ ] Add a way to add snippets to all languages

## Known issues

- If you are using Github to host your json file, It may take up to 5 minutes to update the snippet list after you pushed your changes because GitHub serves "raw" pages with `Cache-Control: max-age=300`.