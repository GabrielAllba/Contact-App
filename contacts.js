
const fs = require('fs')
// const readline = require('readline')
const chalk = require('chalk')
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
const validator = require('validator')

const dirPath = './data'

if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

const jsonPath = './data/contacts.json'
if(!fs.existsSync(jsonPath)){
    fs.writeFileSync(jsonPath, '[]', 'utf-8')
}

// const pertanyaan = (questionAsk) => {
//     return new Promise((resolve, reject) => {
//         rl.question(questionAsk, (answer) => {
//             resolve(answer)
//         })
//     })
// }
const loadContact = () => {
    const filereader = fs.readFileSync('./data/contacts.json', 'utf-8')
    const contacts = JSON.parse(filereader)
    return contacts
}
const saveContact = (nama, email, nomerHp) => {
    const contact = {
        nama: nama,
        email: email,
        nomerHp: nomerHp
    }

    // const filereader = fs.readFileSync('./data/contacts.json', 'utf-8')
    // const contacts = JSON.parse(filereader)
    //check duplicate
    const contacts = loadContact()
    const duplikat = contacts.find((contact) => contact.nama === nama)
    if(duplikat){
        console.log(
            chalk.red('gunakan nama lain'))
            return false;
        }
        if(email){
            if(!validator.isEmail(email)){
                console.log(
                chalk.red('email tidak valid'))
                return false;
        }
    }
    if(!validator.isMobilePhone(nomerHp, 'id-ID')){
        console.log(
            chalk.red('nomer HP tidak valid'))
            return false;
        }
    contacts.push(contact)
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts, null, 2))
    console.log('terimakasih sudah memasukkan data')

}


const listContact = () => {
    const contacts = loadContact()
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.nomerHp}`)
    });
}



const detailContact = (nama) => {
    const contacts = loadContact()

    const contact = contacts.find((contact) => {
       return contact.nama.toLowerCase() === nama.toLowerCase()
    })
    if(!contact){
        console.log('nama tidak ditemukan')
        return false
    }
    console.log(contact.nomerHp)
}

const deleteContact = (nama) => {
    const contacts = loadContact()

    const newContacts = contacts.filter((contact) => {
        return contact.nama.toLowerCase() != nama.toLowerCase()
    })
    if(contacts.length == newContacts.length){
        console.log('nama tidak ditemukan')
        return false
    }

    fs.writeFileSync('./data/contacts.json', JSON.stringify(newContacts, null, 2))
    console.log(`terimakasih sudah menghapus data ${nama}`)
}
//default exports
//module.exports = saveContact
//named exports
module.exports = {
    saveContact, listContact, detailContact,
deleteContact}