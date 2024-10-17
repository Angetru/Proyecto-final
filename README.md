![Banner](./images/Banner_ppal.png)
# Módulo 7 - Proyecto 7
## ¡Bienvenidos al proyecto "Aplicación Web E-Commerce MedAlert"!

## Tabla de Contenidos
* [1. Desafío](#1-Desafío)
* [2. Desarrollo de proyecto](#2-Desarrollo-de-proyecto)
* [3. Conclusiones](#3-Conclusiones)

****
## Desarrollo

### 1. Desafio
 Para este último proyecto se solicita crear una aplicación web E-Commerce que permita lo siguiente:
 -Un catálogo de productos/servicios que permita a los usuarios explorar los artículo/servicios disponibles.
- Un carrito de compras para que los usuarios puedan seleccionar y gestionar sus compras.
- Una pasarela de pago segura (específicamente Stripe, PayPal o MercadoPago, en versión de pruebas) que facilite las transacciones en línea.
- Autenticación de usuarios, incluido el registro de cuentas y el inicio de sesión, mediante JSON Web Tokens (JWT).
- Autorización, mediante la creación de áreas privadas en las que los usuarios puedan acceder y gestionar su perfil e información personal.

  ****

### 2. Desarrollo de proyecto
 La idea principal del proyecto es sobre una aplicación web que permita gestionar fármacos, listas de tratamientos y generar alertas como recordatorios para dar seguimientos a los tratamientos. Esto nace de la problemática que a veces pasan las personas o familias en general en donde uno o varios integrantes pueden estar con diferentes tratamientos famacológicos a la vez, con el fin de evitar enredos o confusiones de horarios, o largo de tratamiento, asi como dosis entre otras variables se dió con esta aplicación que permitirá a los usuarios que puedan registrar farmacos, y crear listas para asociar con farmacos (uno o más en un array) y categorizarlos por tratamientos, y crear alertas de recordatorios via mail, de esta forma podrán acceder a la información que necesiten, asi como establecer duración de los tratamientos o el objetivo de un fármaco entre otros. Adicionalmente se construye la generación de Token por medio de "SignIn" con el fin de poder autenticarse para acceder a la información de usuarios en específico.
 Para el análisis del proyecto, se parte desde la estructura base que define los controladores, modelos y rutas. En donde:
  - Modelos está compuesto por estructuras de usuarios, farmacos y listas.
  - Controladores, contiene autenticación, farmaco, listas y usuarios.
  - Rutas, desde index para gestionar las rutas de usuario, lista, farmaco y autenticación
  - Se selecciona como pasarela de pago Paypal para este proyecto.


  ### 3. Conclusiones
 Para la preparación del proyecto de "MedAlert", se analizaron diferentes variables con el fin de hacer un proyecto interesante a nivel comercial y a su vez que su objetivo ayude a la población debido a potenciales errores en los manejor farmacológicos que se presenta en la actualidad. Luego de varias revisiones y diferentes ideas con ejecuciones de pruebas, se llegó a la idea de crear esta forma de alertas de gestión de fármacos y dar la opción de agrupar por listas, de esta forma si en una persona y/o familia están bajo diferentes tratamientos médicos, se pueda llevar un registro ordenado de los fármacos, y generar alertas por tratamientos.
 Se presentaron varios desafíos durante la creación del código, además de comunicar tanto backend como frontend y pero gracias a reiteradas pruebas, se logró dar con las funcionalidades precisas para que se pudiese ejecutar el código.
 
  ****
*¡Gracias!*
