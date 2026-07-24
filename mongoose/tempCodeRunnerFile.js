const app = require('./src/app')
const condb = require('./src/db/db')
condb()
app.listen(3000,()=>{
    console.log('server is started')
})



