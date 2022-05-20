const http = require('http')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const {ceos} = require('./data')
const data = require('./data')


const hostname = 'localhost'
const port = 3000

const app = express()
const server = http.createServer(app)


app.engine('html', es6Renderer) //register es6Renderer as the html engine
app.set('views','templates') // set 'views' setting to look in 'templates' folder
app.set('view engine','html') // set default 'view engine' t the one registered for html

const partials = { //create partials for use later in render methods
  head: 'partials/head',
  foot: 'partials/foot'
}


//Routes
app.get('/',(req,res)=>{
  res.render('home',{
    partials,
    locals:{
      title: 'Home'
    }
  })
})

app.get('/ceos',(req,res)=>{
  res.render('ceo-list',{
    partials,
    locals:{
      ceos,
      title:'Ceos'
    }
  })
})

app.get('/ceos/:ceo',(req,res)=>{
  const ceo= data.ceos.find(c=> c.slug===req.params.slug)
  
  if(!ceo){
    res.status(404).send(`Could not find ceo: ${req.params.slug}`)
    return
  }
  res.render('ceo-details',{
    partials,
    locals:{
      ceo,
      title:`${ceo.slug} the billionaire`
    }
  })
})




//Server listen
server.listen(port,hostname,() =>{
  console.log(`Server running at http://${hostname}:${port}/`)
})