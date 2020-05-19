import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IMainMenu } from '@jupyterlab/mainmenu';

import { Menu } from '@lumino/widgets';

import { ICommandPalette } from '@jupyterlab/apputils';

import { INotebookTracker, NotebookActions  } from "@jupyterlab/notebook";

/**
 * Initialization data for the main menu example.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'test-button',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu, INotebookTracker],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu,
    nbTracker: INotebookTracker
  ) => {
    const { commands } = app;
    
    // Add a command
    const command = 'jlab-examples:main-menu';
    commands.addCommand(command, {
      label: 'Execute test',
      caption: 'Execute test',
      execute: (args: any) => {
        const current = nbTracker.currentWidget;
        const notebook = current.content;
        NotebookActions.insertBelow(notebook);
        const activeCell = notebook.activeCell;
        activeCell.model.value.text = '%load \'addcell.ts\'';
        //running the cells does not work
        //.then( () => {NotebookActions.runAll(notebook);})
          
      }
    
    });
      
    // Add the command to the command palette
    const category = 'Extension Examples';
    palette.addItem({
      command,
      category,
      args: { origin: 'from the palette' }
    });

    // Create a menu
    const tutorialMenu: Menu = new Menu({ commands });
    tutorialMenu.title.label = 'Test Example';
    mainMenu.addMenu(tutorialMenu, { rank: 80 });

    // Add the command to the menu
    tutorialMenu.addItem({ command, args: { origin: 'from the menu' , label: 'tutorial'} });
  }
};


export default extension;
