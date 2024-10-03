const router=require("express").Router()
const productoController =require("../controller/productosController")
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage })

router.get("/",productoController.list)

router.get("/create",productoController.create)

router.post("/create", upload.single('imagen'), productoController.stock)

router.get("/:id/edit",productoController.edit)

router.put("/:id",upload.single('imagen'), productoController.update)

router.get("/:id/delete", productoController.delete)

router.delete("/:id", productoController.destroy)


module.exports=router;