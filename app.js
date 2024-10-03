const express=require('express')
const app=express()
const path=require('path')
const methodOverride=require('method-override')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
  const upload = multer({ storage })

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


const routerProducto=require('./router/productoRouter');
app.use("/",routerProducto);


app.use(express.static('view'));

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'view')));

//app.use(express.static(path.join(__dirname,'public')))
app.use(express.static('public'));

app.listen(3000,()=>{
    console.log("esta corriendo el puerto 3000")
})