# Installation
Ton run this project, you'll need
* Node (and NPM) :  https://nodejs.org/en/download/
* Meteor : https://www.meteor.com/install
* GIT : https://git-scm.com/downloads
 
First, fetch this project with GIT
```
git clone https://github.com/KyneSilverhide/expense-manager.git
 ```
Open the newly created folder and run
 ```
npm install
 ```
 
Open `settings.json` and change the values, if needed. Then, rename it to `settings-prod.json`
 
Finally, just run meteor with this command (this is an alias to use the `settings-prod.json` file)
```
meteor npm start
```

# TODO
- [x] Add events and create expenses
- [x] Add friends, link friends to application accounts
- [x] Add friends to expenses
- [x] Display how much each one of your friends ow you/you how them
- [x] Display amount details in each event/expenses
- [x] Display events where you participated
- [x] Mark events as completed from the dashboard 
- [x] Send mail to friends in event
- [x] Search friends by name when creating expense
- [ ] Show/Hide completed events in administration
- [ ] I18N + change currency
- [ ] Add some "help" tooltips and texts
- [ ] ? Add "description" field to expense ?
- [ ] ? Be able to upload picture to expense ?
