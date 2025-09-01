
const { DataTypes } = require('sequelize')
const sequelize= require('../Conexion/database')

const Alumno= sequelize.define('Alumno',{
    
    idAlumno:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombreAlumno:{
        type:DataTypes.STRING
    },
    emailAlumno:{
        type: DataTypes.STRING
    },
    cantidadClases:{
        type:DataTypes.INTEGER
    }
},{
    tableName:'Alumno',
    timestamps:false
});

module.exports=Alumno;