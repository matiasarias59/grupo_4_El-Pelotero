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

    delete: function (id) {

        const allUsers = this.findAll();
        const index = allUsers.findIndex(user => user.id == id)
        allUsers.splice(index, 1);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, 2) )
        return true;
        
    }


}

module.exports = User;


