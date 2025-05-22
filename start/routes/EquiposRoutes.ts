import router from "@adonisjs/core/services/router";
import EquiposController from "../../app/controller/Http/EquiposCrontroller.js";

const equipo = new EquiposController();

//rutas para equipos

//listar
router.get(`/listarequipo`, equipo.listarequipo)
//insertar
router.post(`/insertarEquipo`, equipo.insertarEquipo)
//actualizar por id
router.put(`/actualizarEquipoId/:codigo`, equipo.actualizarEquipoId)
//eliminar
router.delete(`/eliminarEquipoId/:codigo`, equipo.eliminarEquipoId)