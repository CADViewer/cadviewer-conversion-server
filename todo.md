# TASK

- [x] Config page, for display the current configuration
- [x] Rest api, for test the endpoint
- [x] Add search function in the logs and also button for clean the logs file
- [x] For config page add the edit button for some keys, create the arrays of updatable keys
- [x] Add check for dwgmerge and linklist
- [x] In the Rest api page move the download/display button to top (after clear) and gray out the button if the request is not yet executed
- [x] In the folders menu, add the listing of the files in the folder, with custom actions (rest api actions (5), different kind of conversion, delete, update, upload, ...), add the settings for the folder that can be browsed
- [x] When set autodetect_location to true then fill this 3 params:
      "ServerLocation": "/reactjs/cadviewer-conversion-server-nextgen/",
- [x] Add homepage when open conversion server directly (index with redirect)
- [x] Add storage to the parameters (json file)
- [x] Implement save and execute for the modal when come from the folders page
- [x] Add the 3 links for different kinds of conversion in the rest parameters modal
- [ ] Add statistics on the settings home page
- [ ] On user add and edit add new input for password confirmation
- [x] Add select to the config of executable
- [x] update this 3 config when set autodetect platform to true: `dwgmerge_executable, autoxchange_executable, linklist_executable` and become not editable
- [x] Execute directly should get the store parameters from the settings backend
- [x] Add global variable version and display it on the left bottom of the navigation sidebar
- [x] Change reference of `config.version` to the new global version variable
- [ ] Todo add new config file for file action name, title action and description
- [ ] create config class that will remain update when the config file is updated
- [x] In Cache conversion case open the json and grap the filename of the list and merge with RL/TL Processing
- [x] Undefined -> Display of DWG
- [x] Available Files CSV JSON SVGZ -> RL/TL Processing and get filename from JSON file of Cache conversion
- [x] Update system prompt for the AI to tell him to return only one json object
- [x] Optimize text correction for the AI shop name correction
- [x] Update the AI to handle query if there is part of the query that is understand and the rest tell to user that this part it's not understand _(I need all stores within 100m from Bulgari, between 100 and 300m2, rent below €3000 per year, lease expiration in 2027 and with a contract that stipulates no competitors within 75m)_
