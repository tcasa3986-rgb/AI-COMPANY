'use strict';
const {btn,section,faq}=require('./components');
const {homeTop}=require('./home-top');
const {corporateHome}=require('./home-corporate');
const questions=[
 ['¿Cuándo conviene desarrollar software a medida?','Cuando las herramientas actuales no acompañan tus procesos, repites registros o necesitas conectar información de distintas áreas. Revisamos la operación antes de definir una solución.'],
 ['¿Podemos conservar nuestros sistemas actuales?','Evaluamos qué herramientas conviene mantener y si permiten integraciones. La viabilidad, los permisos y los costos de terceros se revisan antes de acordar el alcance.'],
 ['¿Cómo se define el costo del proyecto?','La implementación se cotiza según los módulos, integraciones, migración y trabajo necesarios. La operación, el soporte y los consumos externos se especifican por separado.'],
 ['¿Cómo participa nuestro equipo?','Definimos el proceso con las personas que lo utilizan, revisamos entregas por fases y acordamos las pruebas, capacitación y puesta en marcha.'],
 ['¿Trabajan con empresas en Colombia?','Sí. AI Company tiene su base en Soacha, Cundinamarca. La coordinación remota y las visitas se acuerdan según el proyecto.'],
 ['¿Cómo solicitamos un diagnóstico?','Cuéntanos qué proceso quieres mejorar y qué herramientas utilizas hoy. Coordinamos el siguiente paso y definimos el alcance de la conversación contigo.']
];
const title='Software a medida para empresas en Colombia | AI Company';
const description='Desarrollamos software a medida para empresas en Colombia. Conecta inventarios, producción, pedidos e información empresarial con sistemas adaptados a tus procesos.';
function home({articles}){
 return `<div class="home-v3">${homeTop()}${corporateHome({articles,questions})}</div>`.replace(/AI Company CO/g,'AI Company');
}
module.exports={home,title,description};
