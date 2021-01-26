process.env.PORT = process.env.PORT || 3001
process.env.NODE_ENV =  process.env.NODE_ENV || 'dev'

let urlDB;

if( process.env.NODE_ENV === 'dev'){
   urlDB = 'mongodb://localhost:27017/practicauno'
}else{
    urlDB = 'mongodb+srv://david:im58D1LJ46F3redL@cluster0.ngf0f.mongodb.net/practicauno'
}

process.env.MONGODB_URI = urlDB