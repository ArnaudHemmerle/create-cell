import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";

import { IMainMenu } from "@jupyterlab/mainmenu";

import { INotebookTracker, NotebookActions  } from "@jupyterlab/notebook";

/**
 * The command IDs used by the snippets plugin.
 */
namespace CommandIDs {
  export const open = "snippets:open";
}


/**
 * Initialization data for the jupyterlab-snippets extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: "jupyterlab-snippets",
  autoStart: true,
  optional: [IMainMenu, INotebookTracker],
  activate: async (
    app: JupyterFrontEnd,
    menu: IMainMenu | null,
    notebookTracker: INotebookTracker | null
  ) => {
    const { commands } = app;

    const isEnabled = () => {
      return (
        notebookTracker?.currentWidget !== null &&
        notebookTracker?.currentWidget === app.shell.currentWidget
      );
    }

    commands.addCommand(CommandIDs.open, {
      label: 'test',
      
      execute: async args => {
       
        if (!isEnabled()) {
          return;
        }

        const current = notebookTracker.currentWidget;
        const notebook = current.content;
        NotebookActions.insertBelow(notebook);
        const activeCell = notebook.activeCell;
        activeCell.model.value.text = 't';

      },
      isEnabled
    });

  }
};

export default extension;