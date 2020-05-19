# create-cell
A test for creating a JupyterLab extension to add a cell with code from a click in the main menu.

The aim is to create an extension allowing use of JupyLabBook with JupyterLab.

To install the extension:  
jlpm add @lumino/widgets @jupyterlab/coreutils @jupyterlab/mainmenu @jupyterlab/notebook @lumino/commands  
jlpm; jlpm build; jupyter labextension install . 
