import express from "express";
import path from "path";
import fs from "fs";

const routes = express.Router();
const __dirname = import.meta.dirname;

routes.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
    //res.send("TEST");
  });

   routes.get("/deportes", (req, res) => {
    res.sendFile(path.join(__dirname, "../data.json"));
  });

  routes.get("/agregar", (req, res) => {
    const { nombre, precio } = req.query;
    const deporte = { nombre, precio };
    const postData = (deporte) => {
      let deportes = []; 
  
      try {
        const data = fs.readFileSync("data.json", "utf8");
        const deporteData = JSON.parse(data);
        if (deporteData.deportes) {
          deportes = deporteData.deportes;
        }
        deportes.push(deporte);
        fs.writeFileSync("data.json", JSON.stringify({ deportes }));
      } catch (error) {
        console.log("No se pudo agregar a data.json: " + error.message);
      }
      return postData;
    };
    res.send(` agregado a la lista`);
    postData(deporte);
  });

  routes.get("/editar", (req, res) => {
    const { nombre,precio } = req.query;
  
    const putData = (nombre, nuevoPrecio) => {
      try {
        let deportes = [];
        const data = fs.readFileSync("data.json", "utf8");
        const deporteData = JSON.parse(data);
        if (deporteData.deportes) {
          deportes = deporteData.deportes;
        }
        const editarDeporte= deportes.find(deporte => deporte.nombre === nombre);
        if (editarDeporte){
          editarDeporte.precio=nuevoPrecio;
          fs.writeFileSync("data.json", JSON.stringify({ deportes }));
        }
        res.send(`El precio ha sido cambiado con éxito`);
      } catch (error) {
        console.log("No logramos realizar cambios en su solicitud: " + error.message);
      }
      return putData;
    };
  
    putData(nombre, precio);
  });
  
  routes.get("/eliminar", (req,res)=>{
    const { nombre} = req.query;
  
    const deleteData = (nombre) => {
      try {
        let deportes = [];
        const data = fs.readFileSync("data.json", "utf8");
        const deporteData = JSON.parse(data);
        if (deporteData.deportes) {
          deportes = deporteData.deportes;
        };
       deportes= deportes.filter(deporte=> deporte.nombre !==nombre);
        fs.writeFileSync("data.json", JSON.stringify({ deportes }));
        res.send(` Ha sido eliminado de la lista`);
      } catch (error) {
        console.log("No se pudo eliminar: " + error.message);
      }
      return deleteData;
    };
    deleteData(nombre);
  
  
  })

export default routes;