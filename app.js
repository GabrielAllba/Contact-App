// const fs = require('fs')
// const readline = require('readline')


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })


// const dirPath = './data'
// if(!fs.existsSync(dirPath)){
//     fs.mkdirSync(dirPath)
// }

// //make file contacts.json if not there 

// const dataPath = './data/contacts.json'
// if(!fs.existsSync(dataPath)){
//     fs.writeFileSync(dataPath, '[]', 'utf-8')
// }

// const pertanyaan1 = () => {
//     return new Promise((resolve, reject) => {
//         rl.question('Masukkan nama anda : ', (nama) => {
//             resolve(nama)
//         })
//     })
// }


// const pertanyaan2 = () => {
//     return new Promise((resolve, reject) => {
//         rl.question('Masukkan email anda : ', (email) => {
//             resolve(email);
//         })
//     })
// }

// const mainFunction = async () => {
//     const nama = await pertanyaan1()
//     const email = await pertanyaan2()

//     const contact = {
//         nama: nama,
//         email: email,
//     }
//     const fileBuffer = fs.readFileSync('./data/contacts.json', 'utf-8')
//     const contacts = JSON.parse(fileBuffer)

//     contacts.push(contact)

//     fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts, null, 2))
//     rl.close()
// }
// mainFunction()

const yargs = require('yargs')
// take argument from command line
const contacts = require('./contacts')

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption : true,
            type: 'string'
        },
        noHP: {
            describe: 'Nomer handphone',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        contacts.saveContact(argv.nama, argv.email, argv.noHP)
    }
}).demandCommand()


yargs.command({
    command: 'list',
    describe: 'menampilkan semua nama dan nomor HP',
    handler(){
        contacts.listContact()
    }
})

yargs.command({
    command: 'detail',
    describe: 'memperlihatkan email seseorang',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contacts.detailContact(argv.nama)
    }
})

yargs.command({
    command: 'delete',
    describe: 'menghapus kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contacts.deleteContact(argv.nama)
    }
})
yargs.parse()












// const contacts = require('./contacts.js')

// const mainFunction = async() => {
//     const nama = await contacts.pertanyaan('masukkan nama anda : ')
//     const email = await contacts.pertanyaan('masukkan email anda : ')
//     const nomerHp = await contacts.pertanyaan('masukkan nomer HP anda : ')

//     contacts.saveContact(nama, email, nomerHp)
// }

// mainFunction()
