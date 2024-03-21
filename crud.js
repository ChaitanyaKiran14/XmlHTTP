var peopleData = [];
var teamsData = [];

function generateIdentifier(len) {
  var randomChars = "AdsdlasdjoifnvdfSFJDNFD@#*!#$FHSABLfldfhHFI";
  var id = "";
  for (var i = 0; i <= len; i++) {
    var index = Math.random() * randomChars.length;
    index = Math.floor(index);
    id += randomChars[index];
  }
  return id;
}

function checkIfPersonExists(personId){
    var info={exists:false,index:0}
    for(var i=0;i<peopleData.length;i++){
        if (peopleData[i].personId === personId){
            info.exists = true;
            info.index = i;
            break;
        }
    }
    return info;
}

function createPerson(name, personId, email, isActive){
    var availability = checkIfPersonExists(email); 
    if(availability.exists){
        console.log("Person already exists.");
    }else{
        peopleData.push({
            personName: name,
            personId: personId,
            personEmail: email,
            personIsActive: isActive
        });
    }
}

function updatePersonInfo(id, userInfo) {
    var availability = checkIfPersonExists(id);
    if (availability.exists) {
        for (var key in userInfo) {
            if (userInfo.hasOwnProperty(key)) {
                peopleData[availability.index][key] = userInfo[key];
            }
        }
    } else {
        console.log("Person does not exist.");
    }
} // not correc

function deactivatePerson(id){
     var availability = checkIfPersonExists(id);
     if(availability.exists){
        peopleData[availability.index]["personIsActive"] = false;
     }else{
         console.log("Person does not exist.");
     }
}

function deletePerson(id){
    var availability = checkIfPersonExists(id);
     if(availability.exists){
        peopleData.splice(availability.index, 1);
     }else{
         console.log("Person does not exist.");
     }
}

function sortPeople(sortBy, sortOrder){
    if(sortOrder === undefined){
        peopleData.sort((a, b) => {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        });
    }else{
         peopleData.sort((a, b) => {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        });
    }
}

function getUsersByIds(userIds){
    var usersList = [];
    for (var each of peopleData){
        if (userIds.includes(each.personId)){
            usersList.push(each);
        }
    }
    return usersList;
}

function checkIfTeamExists(teamId){
    var info = {exists: false, index: 0};
    for(var i = 0; i < teamsData.length; i++){
        if(teamsData[i].teamId === teamId){
            info.exists = true;
            info.index = i;
            break;
        }
    }
    return info;
}

function addTeam(teamName, teamId, managerEmail, managerName, userIds){
    var teamAvailability = checkIfTeamExists(teamId);
    var usersInTeam = getUsersByIds(userIds);
    if(teamAvailability.exists){
        console.log("Team already exists.");
    }else{
        teamsData.push({
            teamName: teamName,
            teamId: teamId,
            managerEmail: managerEmail,
            managerName: managerName,
            usersList: usersInTeam
        });
    }
}

function checkIfUserAlreadyInTeam(personId, teamId){
    var team = teamsData.find((each) => each.teamId === teamId);
    var {usersList} = team;
    var isPresent = false;
    for(var i = 0; i < usersList.length; i++){
        if(usersList[i].personId === personId){
            isPresent = true;
            break;
        }
    }
    return isPresent;
}

function getIndexOfTeam(teamId){
    var index = null;
    for(var i = 0; i < teamsData.length; i++){
        if(teamId === teamsData[i].teamId){
            index = i;
            break;
        }
    }
    return index;
}

function getUserById(personId){
    var user = peopleData.find((each) => each.personId === personId);
    return user;
}

function addUserToTeam(personId, teamId){
   var teamIndex = getIndexOfTeam(teamId);
   if(teamIndex !== null){
       var user = getUserById(personId);
       if(user === undefined){
           console.log("User does not exist in the provided user list.");
       }else{
         var isUserPresent = checkIfUserAlreadyInTeam(personId, teamId);
         if(isUserPresent){
             console.log("User already exists in this team.");
         }else{
             teamsData[teamIndex].usersList.push(user);
         }
       }
   }else{
       console.log("Team does not exist in the provided team list.");
   }
}

function removeUserfromTeam(personId, teamId) {
    var teamIndex = getIndexOfTeam(teamId);
    if (teamIndex !== null) {
        var userIndex = teamsData[teamIndex].usersList.findIndex(user => user.personId === personId);
        if (userIndex !== -1) {
            teamsData[teamIndex].usersList.splice(userIndex, 1);
            console.log("User removed from team successfully.");
        } else {
            console.log("User is not in this team.");
        }
    } else {
        console.log("Team does not exist.");
    }
}

function updateTeam(teamId, teamInfo) {
    var teamIndex = getIndexOfTeam(teamId);
    if (teamIndex !== null) {
        for (var key in teamInfo) {
            if (teamInfo.hasOwnProperty(key)) {
                teamsData[teamIndex][key] = teamInfo[key];
            }
        }
        console.log("Team information updated successfully.");
    } else {
        console.log("Team does not exist.");
    }
}

function findUserbyId(personId) {
    var user = peopleData.find(each => each.personId === personId);
    if (user) {
        console.log("User found:", user);
    } else {
        console.log("User not found.");
    }
}

function findTeambyId(teamId) {
    var team = teamsData.find(each => each.teamId === teamId);
    if (team) {
        console.log("Team found:", team);
    } else {
        console.log("Team not found.");
    }
}

createPerson("Kevin", 3, "kevin@gmail.com", true);
createPerson("Random", 2, "random@example.com", true);
createPerson("RandomCHaitu", 4, "random@example.com", true);
addTeam("Stark", 1, "stark@egmail.com", "John Cena", [3]);
addUserToTeam(2, 1);
removeUserfromTeam(2, 1);
updateTeam(1, { teamName: "Updated Team Name" });
findUserbyId(3);
findTeambyId(1);
console.log(peopleData);
console.log(teamsData);