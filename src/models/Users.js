const fs = require('fs');
const path = require('path');


const User = {
    
    fileName: path.join(__dirname, '../data/users.json'),

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function () {
        const allUsers = this.findAll();
        return allUsers.length + 1
    },

    findAll: function () {
        return this.getData();
    },

    findById: function (id){

        const allUsers = this.findAll();
        const userFound = allUsers.find(user => user.id == id);
        return userFound;

    },

    findByField: function (field, value){

        const allUsers = this.findAll();
        const userFound = allUsers.find(user => user[field] == value);
        return userFound;

    },


    create: function (userData) { 

        const allUsers = this.findAll();
        const newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, 2) )

    },

    destroyAvatar: function (id) {

        const user = this.findById(id);
        
       if(!user.avatar){
            return false
        }
        fs.rmSync(path.join(__dirname,'../public/img/users',user.avatar));
        return true;
    },

    delete: function (id) {

        const allUsers = this.findAll();

        this.destroyAvatar(id);

        const index = allUsers.findIndex(user => user.id == id)

        allUsers.splice(index, 1);

        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, 2) )

        return true;
        
    },

    update: function (userToUpdate) { 

        const allUsers = this.findAll();
        const index = allUsers.findIndex(user => user.id == userToUpdate.id)

        if(userToUpdate.avatar){
            this.destroyAvatar(userToUpdate.id);
        }

        allUsers[index] = {...allUsers[index], ...userToUpdate}

        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, 2) )
        return true;

    }

}

module.exports = User;

User.update(
{
    id: 31,
    firstName: "Matias",
    lastName: "Arias",
    birthDate: "1996-03-14",
    email: "matiasarias59@gmail.com",
    password: "$2a$10$PCtCrsFp7Se/0ZjwXQzQ6OC5xM3qJ29bUvUXjk9WK48CNEy/PbAgu",
    avatar: "mati.jpg"
  }
)