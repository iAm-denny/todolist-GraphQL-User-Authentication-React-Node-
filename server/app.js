const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./Schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require("cookie-parser");

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

// connect to db
mongoose.connect('Your MongoDB 😊 ',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,
})
.then( () => app.listen(5000) )
.catch( err => console.log(err) )


app.use('/graphql', (req,res) => {
     graphqlHTTP({
        schema,
        graphiql: true,
        context: {req,res}
    })(req,res)
})
