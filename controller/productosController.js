const fs =require('fs')
const path=require('path')


const productosFilePath=path.join(__dirname,'../data/productos.json')
const productos=JSON.parse(fs.readFileSync(productosFilePath,'utf-8'))

const productosController={

    list:(req,res)=>{
    res.render('home',{productos} )
    },
    create:(req,res)=>{ res.render('productos/creacionProd' ) },
    create:(req,res)=>{
        res.render('/' )
        },
        stock:(req,res)=>{
            const marca=req.body.marca;
            const modelo=req.body.modelo;
            const precio=req.body.precio;
            const imagen=req.file ? req.file.filename:null

            const nuevoProducto={
                id:productos.length+1,marca,modelo,precio,imagen};

            try {
            productos.push(nuevoProducto)
            fs.writeFileSync(productosFilePath,JSON.stringify(productos,null," "))
            res.redirect('/')

        }catch (error) {
        console.log(error)
            res.send('Hubo un error al crear el producto')
            console.error
            res.status(500).send('Hubo un error al crear el producto en el servidor')
        }
    },
    edit:(req,res)=>{
        const id=Number(req.params.id);
        const producto=productos.find(producto=>producto.id==id);
        res.render('productos/editarProd', { producto });
        
    },
    update:(req,res)=>{
        const id=req.params.id;
        const marca=req.body.marca;
        const modelo=req.body.modelo;
        const precio=req.body.precio;
       const imagen=req.file ? req.file.filename:null

        const productoUpdate=productos.findIndex(producto=>producto.id==id)
        if(productoUpdate !== -1){
            productos[ productoUpdate]={id:Number(id),marca,modelo,precio,imagen}

            try {
                fs.writeFileSync(productosFilePath,JSON.stringify(productos,null," "))
                res.redirect('/')
    
            }catch (error) {
        console.log(error)
            res.status(500).send('Hubo un error al crear el producto en el servidor')
            console.log("Error al guardar el producto");        }
        }else{
            
            return res.status(404).send('Producto no encontrado')
    
        }
    }, delete:(req,res)=>{ 
        const id=Number(req.params.id); const producto=productos.find(producto=>producto.id==id) 
       // res.render('productos/eliminarProd',{producto}) 
        if (producto) {
            res.render('productos/eliminarProd', { producto });
        } else {
            res.status(404).send("Producto no encontrado");
        }
    },
    destroy:(req,res)=>{ const id=Number(req.params.id); const productoDelete=productos.findIndex(producto=>producto.id==id) 
        if(productoDelete!== -1){
            productos.splice(productoDelete,1)
            try {
                fs.writeFileSync(productosFilePath,JSON.stringify(productos,null," "))
                res.redirect('/')
            }
            catch (error) {    
                console.log(error)
                res.status(500).send('Hubo un error al eliminar el producto en el servidor')
                console.log("Error al eliminar el producto");
            } }else{
                res.status(404).send("Producto no encontrado");
            }
            },
            
}

module.exports=productosController;