import router from "@adonisjs/core/services/router";
import PresidentesController from "../../app/controller/Http/PresidentesCrontroller.js"; 


const Presidente = new PresidentesController();

//rutas para presidente

//listar
router.get(`/listarPresidentes`, Presidente.listarPresidentes)
//insertar
router.post(`/insertarPresidente`, Presidente.insertarPresidente)
//actualizar por id
router.put(`/actualizarPresidenteId/:id`, Presidente.actualizarPresidenteId)
//eliminar
router.delete(`/eliminarPresidenteId/:id`, Presidente.eliminarPresidenteId)