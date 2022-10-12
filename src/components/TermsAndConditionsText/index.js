import React from "react";
import PropTypes from "prop-types";
import "./scss/component-sm.scss";
import "./scss/component-md.scss";
import "./scss/component-lg.scss";
import { Row, Col } from "antd";

class TermsAndConditionsText extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };
  static defaultProps = {
    className: "faqs",
  };

  render() {
    return (
      <div className="fondo-faqs">
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="faqsContainer"
        >
          <Col lg={18} md={16} className="containerFaqs">
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              className="secondary-row"
            >
              {/* <h2>Politica de Privacidad</h2> */}
              <Col xs={20} sm={20} md={22} lg={16} className="inicio-rapido">
                <p>
                  <strong>
                    TÉRMINOS Y CONDICIONES DE USO DE LA PLATAFORMA
                    WWW.GROVITY.CO
                  </strong>
                </p>
                <p>
                  Esta página establece los ‘Términos y Condiciones’ bajo los
                  cuales el usuario utiliza la página web www.grovity.co (en
                  adelante, “el sitio web” “la página web” o “la página”) de
                  propiedad de GROVITY, INC. / GROVITY S.A.S. persona jurídica,
                  cuyo domicilio principal se encuentra en la Cra 6 # 80A - 11
                  Int. 701, en la ciudad de Bogotá, Cundinamarca, con teléfonos
                  de contacto (+57) 310 453 1639, y correo electrónico
                  claudia@grovity.co (en adelante GROVITY).
                </p>
                <p>
                  El acceso, uso y/o comprar alguno de los servicios ofrecidos
                  en el sitio web, atribuye a quien accede la condición de
                  usuario, aceptando, desde ese mismo momento, plenamente y sin
                  reserva alguna, los presentes términos y condiciones así como
                  las condiciones particulares que complementen, modifiquen o
                  sustituyan las condiciones generales y las políticas a las que
                  se hace referencia en el presente documento y/o disponible a
                  través de hipervínculos cuando así suceda, en relación con
                  todos los servicios y contenidos del sitio web por lo que se
                  entenderá esto como una conducta inequívoca de la aceptación
                  de los siguientes términos y condiciones. Estas Condiciones de
                  Servicio se aplican a todos los usuarios del sitio, incluyendo
                  sin limitación a usuarios que sean navegadores, proveedores,
                  clientes, comerciantes, y/o colaboradores de contenido.
                </p>
                <p>
                  Por lo anterior GROVITY solicita al usuario de este sitio, que
                  lea detallada y cuidadosamente los presentes términos y
                  condiciones, así como la política de privacidad, antes de
                  iniciar su registro, exploración o utilización. Si el usuario
                  no está de acuerdo con todos los términos y condiciones de
                  este acuerdo, su contenido, las condiciones de uso del sitio
                  web o las notificaciones legales entonces debe abstenerse de
                  acceder a la página web o usar cualquiera de los servicios
                  alojados en la misma ya que usted acepta que la única solución
                  disponible es dejar de utilizar el sitio web de GROVITY.
                </p>

                <p>
                  El usuario admite haber leído y entendido estos términos de
                  uso y está de acuerdo con acogerse a los mismos y cumplir con
                  todas las leyes y los reglamentos aplicables que hagan parte
                  de la legislación colombiana. Además, cuando el usuario
                  utilice cualquier servicio suministrado en este sitio, por
                  ejemplo "chat", buzones de sugerencias, botón de compras,
                  carrito de compras, concursos, estará sujeto a las reglas,
                  guías, políticas, términos y condiciones aplicables a dicho
                  servicio.
                </p>

                <p>
                  Cualquier función o herramienta nueva que se añada a la página
                  web, también estará sujeta a los términos y condiciones. Puede
                  revisar la versión actualizada de los términos y condiciones,
                  en cualquier momento en esta página. Nos reservamos el derecho
                  de actualizar, cambiar o reemplazar cualquier parte de los
                  términos y condiciones sin previo aviso y en cualquier
                  momento, bajo la sola voluntad de GROVITY mediante la
                  publicación de actualizaciones y/o cambios en nuestro sitio
                  web. Es responsabilidad del usuario chequear esta página
                  periódicamente para verificar cambios. El uso continuo de la
                  página o el acceso al sitio web después de la publicación de
                  cualquier cambio constituye la aceptación de dichos cambios ya
                  que a partir de la fecha de modificación de estos términos y
                  condiciones, todas las operaciones que se celebren entre
                  GROVITY y el usuario se regirán por el documento modificado.
                  Así mismo, podrán ser modificado de la misma manera el diseño,
                  la presentación o configuración, los requisitos de registro o
                  utilización del sitio web, sin que ello genere derecho a
                  reclamo o indemnización alguna a favor del usuario o
                  visitante.
                </p>

                <p>
                  Este sitio es controlado y operado por GROVITY desde sus
                  oficinas ubicadas en Colombia. GROVITY no se responsabiliza de
                  que el material en este sitio sea apropiado o esté disponible
                  para su uso en Colombia y otros países, estando prohibido su
                  acceso desde territorios donde su contenido sea ilegal.
                  Aquellos que decidan ingresar a este sitio desde otros países
                  lo harán bajo su propia iniciativa y es su responsabilidad el
                  sujetarse a las leyes locales que sean aplicables. Cualquier
                  reclamo en relación con el uso de este sitio y el material en
                  él contenido está regulado por las leyes de Colombia
                </p>

                <p>
                  Se prohíbe usar el sitio indebidamente, falsear la identidad
                  de un usuario, utilizar agentes de compra y llevar a cabo
                  actividades fraudulentas en el sitio www.grovity.co.
                  plataforma web dedicada a la prestación del servicio de
                  software de para la aceleración , incubación y acompañamiento
                  a empresas; la adquisición de servicios de mentoría con
                  expertos; y seguimiento al desempeño de usuarios.
                </p>

                <p>
                  Los títulos utilizados en este acuerdo se incluyen solo por
                  conveniencia y no limita o afecta a estos Términos.
                </p>

                <p>
                  <strong>1. Definiciones </strong>
                </p>

                <p>
                  Para facilitar la comprensión de estos términos y condiciones
                  de uso de la página web de GROVITY, se hace necesario aclarar
                  el significado de las siguientes palabras:
                </p>

                <p>
                  <strong> a) Contenidos.</strong> Implican todas las formas de
                  información o datos que se divulgan en la página web, entre
                  los que se encuentran: textos, imágenes, fotos, logos,
                  diseños, animaciones
                </p>

                <p>
                  <strong>b) Derechos de Propiedad Intelectual.</strong> Hacen
                  referencia a todos los derechos de propiedad de la información
                  de GROVITY o de cualquier persona que sea titular legítima,
                  como: signos distintivos, marcas, lemas, enseñas, logos,
                  nombres de dominio, derechos de autor, bases de datos,
                  diseños, contenidos o cualquier otra obra o creación
                  intelectual vinculada con el objeto, operación o desempeño del
                  sitio web del GROVITY.
                </p>

                <p>
                  <strong>c) Internet.</strong> Herramienta de comunicación con
                  decenas de miles de redes de computadoras unidas por el
                  protocolo TCP/IP. Sobre esta red se pueden utilizar múltiples
                  servicios como por ejemplo correos electrónicos, www, etc.
                </p>

                <p>
                  <strong>d) Página web.</strong> Resultado en hipertexto o
                  hipermedia que proporciona un navegador del www después de
                  obtener la información solicitada. Su contenido puede ir desde
                  un texto corto a un voluminoso conjunto de textos, gráficos
                  estáticos o en movimiento, sonido, etc.
                </p>

                <p>
                  <strong>e) Publicar.</strong> Hacer que un documento sea
                  visible desde el sitio web.
                </p>

                <p>
                  <strong>f) Servicios.</strong> Son las ayudas en línea que
                  GROVITY provee actualmente o que piensa proveer en el futuro a
                  los usuarios, por medio de esta página web, como Publicación
                  de noticias o actividades propias de la gestión comercial;
                  trámites en línea; consultas; foros y buzón de quejas y
                  reclamos, registro de clientes o comercializadores, mapas de
                  ubicación, solicitud de pedidos, catálogo de colecciones,
                  adquisición de mercancía, entre otros.
                </p>

                <p>
                  <strong>g) Usuario o Cliente.</strong> Es la persona natural o
                  jurídica o entidad de cualquier naturaleza que ingresa a la
                  página web de GROVITY para acceder, inscribirse o registrarse
                  para recibir un servicio de GROVITY por cualquier razón,
                  buscar o consultar información de su interés. Para efectos de
                  los servicios prestados por GROVITY, los usuarios o clientes
                  se dividen 3 perfiles diferentes ya sea mentor, emprendedor o
                  administrador.
                </p>

                <p>
                  <strong>h) Vínculo. Link en inglés.</strong> Apuntadores
                  hipertexto que sirven para saltar de una información a otra, o
                  de un servidor web a otro, cuando se navega por Internet.{" "}
                </p>

                <p>
                  <strong>2. Propiedad Industrial y Derechos de Autor </strong>
                </p>

                <p>
                  Todas las marcas, enseñas, logos, nombres y cualesquiera otros
                  signos distintivos, así como los modelos de utilidad y/o
                  diseños industriales y demás elementos de propiedad
                  intelectual insertados, así como también, todo el material
                  informático, gráfico, publicitario, fotográfico, de
                  multimedia, audiovisual y/o de diseño, así como todos los
                  contenidos, textos y bases de datos puestos a su disposición,
                  usados y/o desplegados en este sitio son propiedad exclusiva
                  de la GROVITY y en algunos casos son de propiedad de terceros
                  que han autorizado expresamente a la página Web www.grovity.co
                  para su uso y/o explotación.{" "}
                </p>

                <p>
                  Igualmente, el uso en www.grovity.co de algunos contenidos de
                  propiedad de terceros se encuentra expresamente autorizado por
                  la ley. Todos los contenidos en www.grovity.co están
                  protegidos por las normas sobre derechos de autor y propiedad
                  industrial, nacionales e internacionales vigentes sobre la
                  materia que le sean aplicables.{" "}
                </p>

                <p>
                  Nada en www.grovity.co podrá ser interpretado como concesión u
                  otorgamiento a cualquier título de autorizaciones, licencias o
                  cualquier otro derecho para usar o disponer de cualquier forma
                  de la propiedad industrial, sin el permiso por escrito de
                  GROVITY o del titular de los derechos de la misma.{" "}
                </p>

                <p>
                  Exceptuando lo expresamente estipulado en estos términos y
                  condiciones, queda prohibido todo acto de copia, reproducción,
                  modificación, enajenación, exhibición, creación de trabajos
                  derivados, venta o distribución, exhibición de los contenidos,
                  de ninguna manera o por ningún medio, incluyendo, mas no
                  limitado a, medios electrónicos, mecánicos, de fotocopiado, de
                  grabación o de cualquier otra índole, sin el permiso previo
                  por escrito de GROVITY o del titular de los derechos de autor.{" "}
                </p>

                <p>
                  En ningún caso estos términos y condiciones confieren
                  derechos, licencias y/o autorizaciones para realizar los actos
                  anteriormente descritos. Cualquier uso no autorizado de los
                  contenidos constituirá una violación a los presentes términos
                  y condiciones y a las normas vigentes sobre marcas, derechos
                  de autor y/u otras normas de propiedad intelectual tanto
                  nacionales e internacionales aplicables.{" "}
                </p>

                <p>
                  GROVITY otorga al usuario una licencia y derecho personal,
                  intransferible y no exclusivo para desplegar www.grovity.co en
                  la pantalla de un computador ordenador o dispositivo PDA bajo
                  su control.{" "}
                </p>
                <p>
                  Cualquier uso no autorizado constituirá una violación a los
                  presentes términos y condiciones y a las normas vigentes
                  nacionales e internacionales sobre Propiedad Industrial y dará
                  lugar a las acciones civiles y penales correspondientes{" "}
                </p>

                <p>
                  <strong>
                    3. Limitación de la responsabilidad de GROVITY{" "}
                  </strong>
                </p>
                <p>
                  GROVITY no asume responsabilidad alguna por cualquier daño o
                  perjuicio, incluyendo más no limitado a daños o perjuicios
                  causados por cualquier uso de (o incapacidad para usar) los
                  portales, uso de (o incapacidad para usar) cualquier portal al
                  que el Usuario haga ‘hiperconexión’ (hyperlink) a partir de
                  nuestros portales, falla de rendimiento en ejecución, error,
                  omisión, interrupción, defecto, demora en la operación o la
                  transmisión, virus de computadora o falla en la línea. Bajo
                  los términos aquí señalados, el uso del sitio web se realizará
                  bajo la única y exclusiva responsabilidad del usuario, salvo
                  las responsabilidades establecidas en las normas de orden
                  público colombianas.
                </p>
                <p>
                  Dicha responsabilidad se extenderá al uso, por parte del
                  usuario o de cualquier tercero, de cualquier contraseña o
                  similares asignadas para el acceso al sitio web o a
                  cualesquiera de sus servicios. Sin perjuicio de lo anterior,
                  GROVITY se reserva el derecho a denegar en cualquier momento y
                  sin necesidad de aviso previo, el acceso al sitio web, a
                  aquellos usuarios que incumplan los Términos y Condiciones
                  aquí establecidos.{" "}
                </p>

                <p>
                  GROVITY no asume ninguna responsabilidad por la información
                  que se suministra en el sitio web, incluyendo pero no
                  limitando, la referente a notas de interés, opiniones,
                  conceptos, eventos, normatividad, etc. Este sitio Web se le
                  brinda sobre la base de ‘tal como es’ y ‘tal como está
                  disponible’ y en consecuencia, GROVITY no otorga garantías de
                  ninguna clase, ni expresa ni tácitamente o de otro tipo. Por
                  lo tanto, GROVITY no se hace responsable de cualquier
                  interrupción en el servicio de esta página Web, inexactitud,
                  error, imprecisión que se llegare a presentar en el contenido
                  de la misma. El servidor podrá ser desconectado sin previo
                  aviso, GROVITY hará todo lo necesario para que el impacto por
                  tareas de mantenimiento sea el menor posible.
                </p>

                <p>
                  Ni GROVITY ni cualquier otra parte que participe en la
                  creación, producción o entrega de este sitio Web será
                  responsable de mantener el material y los servicios puestos a
                  su disposición en este sitio Web o de suministrar
                  correcciones, actualizaciones o versiones relacionadas con la
                  misma. GROVITY podrá modificar unilateralmente y sin previo
                  aviso el contenido siempre que lo considere oportuno, la
                  estructura y diseño, así como modificar o eliminar los
                  servicios, los contenidos y las condiciones de acceso y/o uso
                  del sitio Web. GROVITY no controla ni garantiza la ausencia de
                  virus ni de otros elementos en los contenidos que puedan
                  producir alteraciones en su sistema informático (software y
                  hardware) o en los documentos electrónicos y ficheros
                  almacenados en su sistema informático.
                </p>

                <p>
                  En consecuencia con lo anterior, GROVITY no se hará
                  responsable de ningún daño ocasionado en virtud de cualquier
                  alteración que se haya efectuado a los materiales o archivos
                  de descarga suministrados directamente por la entidad.
                </p>

                <p>
                  La legitimidad de los derechos de propiedad intelectual o
                  industrial correspondientes a los contenidos aportados por
                  terceros es de la exclusiva responsabilidad de los terceros
                  que aportaron el documento, y por tanto GROVITY no responde de
                  manera alguna por su contenido o cualquier violación que se
                  pudiera derivar de la publicación de dicho contenido.{" "}
                </p>

                <p>
                  Así mismo el usuario al aceptar los presentes términos y
                  condiciones declara que el hecho de beneficiarse, utilizar los
                  servicios de la página web o aparecer registrado o denominado
                  como distribuidor o comercializador de GROVITY no configura
                  una relación con GROVITY de tipo laboral o de Agencia
                  Mercantil, salvo contrato expreso para tal efecto, renunciando
                  Usuario a efectuar reclamación judicial o extrajudicial en tal
                  sentido.{" "}
                </p>

                <p>
                  <strong>
                    4. Exactitud, exhaustividad y actualidad de la información
                  </strong>
                </p>

                <p>
                  Este sitio puede contener cierta información histórica. La
                  información histórica, no es necesariamente actual y es
                  provista únicamente para tu referencia. Nos reservamos el
                  derecho de modificar los contenidos de este sitio en cualquier
                  momento, pero no tenemos obligación de actualizar cualquier
                  información en el sitio web. El usuario acepta que es su
                  responsabilidad monitorear los cambios en el sitio web.
                </p>

                <p>
                  La correcta visualización está sujeta a la resolución de la
                  pantalla del computador o dispositivo móvil que utilice el
                  cliente para ingresar al sitio web (computador, tablet,
                  smartphone, o cualquier otro).{" "}
                </p>

                <p>
                  <strong>5. Utilización y acceso al portal</strong>
                </p>

                <p>
                  Cualquier persona con acceso a internet y a través del uso de
                  un explorador, ya sea por medio de un dispositivo móvil o un
                  computador, podrá acceder a la información contenida dentro de
                  la página web. A pesar de lo anterior, la página web podrá
                  tener funciones, secciones o zonas exclusivas cuyo acceso será
                  habilitado únicamente para sus usuarios registrados o para
                  aquellos que cumplan con las condiciones establecidas en el
                  portal u cualquier otro parámetro considerado por GROVITY.
                </p>

                <p>
                  La utilización y el registro como usuario de la página web se
                  encuentra disponible únicamente para aquellas personas que ya
                  hayan alcanzado la mayoría de edad de acuerdo con las Leyes de
                  la República de Colombia o para personas jurídicas debidamente
                  representadas y cuyo registro podrá estar sujeto a
                  verificación. Es indispensable para registrarse como usuario
                  de la página web la aceptación plena y sin reservas por parte
                  del usuario tanto del tratamiento correspondiente a sus datos
                  personales conforme la política de tratamiento de datos de
                  datos personales, como de todos y cada uno de los términos y
                  condiciones de uso establecidos por GROVITY al diligenciar el
                  formulario de registro o al realizar cualquier tipo de compra
                  a través de nuestro portal. Cualquier violación a los términos
                  y condiciones aquí mencionados facultará a la GROVITY para
                  terminar, suspender o impedir el acceso del usuario al portal
                  y/o a los demás servicios relacionados u ofrecidos por
                  GROVITY.
                </p>

                <p>
                  <strong>6. Capacidad legal para contratar</strong>
                </p>

                <p>
                  Los servicios ofrecidos por GROVITY se encuentran únicamente
                  disponibles para personas mayores de edad que se encuentren en
                  plena capacidad para contratar. Teniendo en cuenta lo
                  anterior, las personas menores de edad deberán abstenerse no
                  solo de utilizar el portal, sino también de suministrar sus
                  datos personales a las bases de datos o espacios ofrecidos por
                  nuestro sitio. En caso de que el acudiente o representante de
                  un menor de edad descubra que la página web está siendo
                  utilizada por un usuario sin la capacidad para contratar,
                  podrá ponerse en contacto a través de la información
                  suministrada en este documento con el fin de remover los datos
                  personales del menor de nuestras bases de datos.
                </p>

                <p>
                  No puedes usar nuestros servicios o nuestro sitio web con
                  ningún propósito ilegal o no autorizado por parte de GROVITY.
                  Tampoco puedes, en el uso del servicio, violar cualquier ley
                  en la jurisdicción del usuario (incluyendo, pero no limitado a
                  las leyes de derecho de autor o propiedad intelectual).{" "}
                </p>

                <p>
                  El usuario no debe transmitir virus o cualquier código de
                  naturaleza destructiva o maliciosa. Se prohíbe usar el sitio
                  indebidamente, falsear la identidad de un usuario, utilizar
                  agentes de compra y llevar a cabo actividades fraudulentas en
                  el sitio web. El incumplimiento o violación de cualquiera de
                  estos Términos darán lugar al cese inmediato de los servicios
                  y posibles acciones legales.{" "}
                </p>

                <p>
                  <strong>
                    7. Condiciones generales del servicio de GROVITY
                  </strong>
                </p>

                <p>
                  A través de la aceptación de los presentes términos y
                  condiciones el usuario entiende que el tipo de contrato a
                  celebrar entre las partes es un contrato de prestación de
                  servicios consensual, bilateral, oneroso y típico mediante el
                  cual GROVITY se obliga a prestar un servicio a tu favor (el/la
                  comprador(a)) a cambio de que este último pague un precio en
                  dinero.
                </p>

                <p>
                  GROVITY se reserva el derecho de rechazar la prestación de
                  servicio a cualquier persona, por cualquier motivo y en
                  cualquier momento.
                </p>

                <p>
                  El Usuario entiende que tus datos personales (sin incluir la
                  información de su tarjeta de crédito u otra forma de pago),
                  puede ser transferida sin encriptar e involucrar (a)
                  transmisiones a través de varias redes; y (b) cambios para
                  ajustarse o adaptarse a los requisitos técnicos de conexión de
                  redes o dispositivos. La información de tarjetas de crédito
                  está siempre encriptada durante la transferencia a través de
                  las redes.
                </p>

                <p>
                  El usuario está de acuerdo con no reproducir, duplicar,
                  copiar, vender, revender o explotar cualquier parte del
                  servicio, uso del servicio, o acceso al Servicio o cualquier
                  contacto en el sitio web a través del cual se presta el
                  servicio, sin el expreso permiso por escrito de nuestra parte.
                </p>

                <p>
                  <strong>8. Procedimiento del servicio de grovity</strong>
                </p>

                <p>
                  Para realizar uso de los servicios de GROVITY por primera vez,
                  el usuario debe seguir los siguientes pasos:
                </p>

                <p>
                  1. El usuario antes de usar los servicios de la página Web
                  puede contactar a GROVITY a través de sus canales de
                  comunicación para obtener el acompañamiento de uno de sus
                  funcionarios en un diagnóstico previo. Dicho diagnóstico tiene
                  la finalidad de determinar los requerimientos de servicio que
                  el usuario requiere de cara a su compañía, así como la forma
                  en que se prestará el mismo y la tasación de los honorarios
                  correspondientes al servicio a prestar por GROVITY. Las
                  tarifas se encuentran publicadas en la página web por cuanto
                  el usuario acepta dichas condiciones al momento de contratar
                  por su cuenta.
                </p>

                <p>
                  2. Los usuarios crean una cuenta de usuario y contraseña en la
                  página web, ya sea como personas o en representación de una
                  entidad u organización ecosistema. La creación de esta cuenta
                  puede hacerse de manera asistida, consultando los
                  video-tutoriales disponibles en la página web o solicitando
                  soporte de la compañía. La creación de un usuario no tiene
                  tarifa alguna, sin embargo los usuarios no podrán utilizar los
                  servicios de la plataforma hasta tanto no realicen el pago de
                  un plan o acuerden un contrato de uso.{" "}
                </p>

                <p>
                  3.Para la creación de la cuenta, el usuario deberá diligenciar
                  formulario en el cual se solicitará obligatoriamente nombre,
                  apellido, email y la creación de una contraseña. La plataforma
                  contiene un formulario adicional que solicita algunos datos
                  opcionales como descripción de su perfil, logo o foto,
                  habilidades o necesidades, entre otros, información que no es
                  de carácter obligatorio y que el usuario agrega
                  voluntariamente con el fin de mejorar su experiencia y obtener
                  mejores recomendaciones.
                </p>

                <p>
                  4.Según el perfil que posea el usuario (mentor, emprendedor,
                  administrador de ecosistema) podrá acceder a cada una de las
                  opciones y herramientas que contempla cada ambiente de trabajo
                  diseñado para el perfil correspondiente, pudiendo tener
                  elementos similares, diferentes o adicionales en relación con
                  otros perfiles de usuario.
                </p>

                <p>
                  El contrato de prestación de servicios de GROVITY se
                  perfecciona solamente cuando el GROVITY presenta una oferta de
                  servicios con sus respectivos honorarios, oferta que puede
                  estar publicada en la web o ser enviada de manera directa por
                  correo electrónico a su destinatario. El usuario la acepta
                  mediante firma de contrato acordado entre las partes,
                  aceptación de la oferta por correo electrónico o pago directo
                  del servicio en la página web.
                </p>

                <p>
                  <strong>9. Precios</strong>
                </p>
                <p>
                  Los precios de nuestros servicios están sujetos a cambio sin
                  previo aviso. El valor total del servicio estará compuesto de
                  los siguientes rubros a cargo del usuario: valor del servicio
                  e impuestos que puedan haber a lugar.
                </p>

                <p>
                  Dada la naturaleza de actualización en línea del sitio web, el
                  precio o la disponibilidad de un servicio puede cambiar en
                  cualquier momento y sin previo aviso. El precio será aquel
                  vigente en el instante de aceptar la propuesta de servicio y
                  de honorarios
                </p>

                <p>
                  <strong>10. Condiciones de Pago</strong>
                </p>

                <p>
                  En la propuesta de servicios y honorarios se establecerá el
                  valor y forma de pago del servicio ofrecido por GROVITY. Todos
                  los precios de servicios al interior del territorio colombiano
                  serán exhibidos y procesados en pesos colombianos (COP).
                </p>

                <p>
                  <strong>11. Medios de pago</strong>
                </p>

                <p>
                  Los pagos realizados de conformidad con los presentes términos
                  y condiciones, serán realizados a través de pago por
                  consignación en la cuenta bancaria de GROVITY por lo que
                  deberá efectuar transferencia electrónica a la misma del valor
                  correspondiente a los honorarios pactados.
                </p>

                <p>
                  El usuario reconoce y acepta que la página web no controla de
                  ninguna forma las páginas en las que se realizan las
                  transacciones a través de tarjetas de crédito o transferencia
                  bancaria en línea. En consecuencia, en ningún caso GROVITY
                  será responsable por el manejo de la información que el
                  usuario deba suministrar a las entidades bancarias con ocasión
                  de la realización de dichas transacciones. Lo anterior, habida
                  cuenta que el manejo de la transmisión y archivo de la
                  información mencionada es responsabilidad exclusiva de las
                  entidades bancarias y financieras a las que se encuentra
                  afiliado el titular o usuario de la tarjeta.
                </p>

                <p>
                  Así mismo resulta importante resaltar que GROVITY no será
                  responsable por el funcionamiento eficiente y seguro de los
                  portales o plataformas de pago utilizadas para llevar a cabo
                  las transacciones de pago de los servicios ofrecidos por la
                  página web. El usuario mantendrá indemne a GROVITY con
                  respecto de cualquier acción, reclamo o controversia que pueda
                  surgir entre El usuario y los portales de pago en línea o
                  similares.
                </p>

                <p>
                  GROVITY controla todos los pedidos realizados con el objetivo
                  de evitar prácticas abusivas y compras fraudulentas. Nos
                  reservamos el derecho a no efectuar una entrega o de procesar
                  el pedido de un cliente que no hubiera abonado total o
                  parcialmente un pedido anterior o en el que exista algún
                  litigio con el titular de la tarjeta de crédito o tarjeta
                  débito.
                </p>

                <p>
                  <strong>12. Derecho de Retracto</strong>
                </p>

                <p>
                  Según lo estipulado en el artículo 47 de la Ley Colombiana
                  1480 de 2011, las condiciones para ejercer el derecho de
                  retracto serán las descritas a continuación:
                </p>

                <p>
                  “En todos los contratos para la venta de bienes y prestación
                  de servicios mediante sistemas de financiación otorgada por el
                  productor o proveedor, venta de tiempos compartidos o ventas
                  que utilizan métodos no tradicionales o a distancia, que por
                  su naturaleza no deban consumirse o no hayan comenzado a
                  ejecutarse antes de cinco (5) días, se entenderá pactado el
                  derecho de retracto por parte del consumidor. En el evento en
                  que se haga uso de la facultad de retracto, se resolverá el
                  contrato y se deberá reintegrar el dinero que el consumidor
                  hubiese pagado.
                </p>

                <p>
                  El consumidor deberá devolver el producto al productor o
                  proveedor por los mismos medios y en las mismas condiciones en
                  que lo recibió. Los costos de transporte y los demás que
                  conlleve la devolución del bien serán cubiertos por el
                  consumidor.
                </p>

                <p>
                  El término máximo para ejercer el derecho de retracto será de
                  cinco (5) días hábiles contados a partir de la entrega del
                  bien o de la celebración del contrato en caso de la prestación
                  de servicios.
                </p>

                <p>
                  Se exceptúan del derecho de retracto, los siguientes casos:
                </p>

                <p>
                  1. En los contratos de prestación de servicios cuya prestación
                  haya comenzado con el acuerdo del consumidor;
                </p>

                <p>
                  2. En los contratos de suministro de bienes o servicios cuyo
                  precio esté sujeto a fluctuaciones de coeficientes del mercado
                  financiero que el productor no pueda controlar;
                </p>

                <p>
                  3. En los contratos de suministro de bienes confeccionados
                  conforme a las especificaciones del consumidor o claramente
                  personalizados;
                </p>

                <p>
                  4. En los contratos de suministro de bienes que, por su
                  naturaleza, no puedan ser devueltos o puedan deteriorarse o
                  caducar con rapidez;
                </p>

                <p>5. En los contratos de servicios de apuestas y loterías;</p>

                <p>6. En los contratos de adquisición de bienes perecederos;</p>

                <p>
                  7. En los contratos de adquisición de bienes de uso personal.
                </p>

                <p>
                  El proveedor deberá devolverle en dinero al consumidor todas
                  las sumas pagadas sin que proceda a hacer descuentos o
                  retenciones por concepto alguno. En todo caso la devolución
                  del dinero al consumidor no podrá exceder de treinta (30) días
                  calendario desde el momento en que ejerció el derecho.”
                </p>

                <p>
                  No obstante lo antes indicado, se aclara que el servicio de
                  GROVITY se enmarca en la excepción contemplada en el numeral 1
                  antes relacionado, es decir, que corresponde a contratos de
                  prestación de servicios cuya prestación haya comenzado con el
                  acuerdo del consumidor por lo que no habrá lugar al derecho de
                  retracto.
                </p>

                <p>
                  <strong>13. Reversión del pago </strong>
                </p>

                <p>
                  La ley colombiana dispone que en las ventas efectuadas
                  mediante mecanismos de comercio electrónico, tales como
                  Internet, y se haya utilizado para realizar el pago una
                  tarjeta de crédito, débito o cualquier otro instrumento de
                  pago electrónico, los participantes del proceso de pago
                  deberán reversar los pagos que solicite el consumidor cuando
                  sea objeto de fraude, o corresponda a una operación no
                  solicitada. El banco es el responsable de cumplir con los
                  tiempos para hacer la reversión del pago.
                </p>

                <p>
                  Según lo estipulado en el artículo 51 de la Ley Colombiana
                  1480 de 2011 las condiciones para la reversión del pago serán
                  las descritas a continuación:
                </p>

                <p>
                  otro mecanismo de televenta o tienda virtual, y se haya
                  utilizado para realizar el pago una tarjeta de crédito, débito
                  o cualquier otro instrumento de pago electrónico, los
                  participantes del proceso de pago deberán reversar los pagos
                  que solicite el consumidor cuando sea objeto de fraude, o
                  corresponda a una operación no solicitada, o el producto
                  adquirido no sea recibido, o el producto entregado no
                  corresponda a lo solicitado o sea defectuoso.
                </p>

                <p>
                  Para que proceda la reversión del pago, dentro los cinco (5)
                  días hábiles siguientes a la fecha en que el consumidor tuvo
                  noticia de la operación fraudulenta o no solicitada o que
                  debió haber recibido el producto o lo recibió defectuoso o sin
                  que correspondiera a lo solicitado, el consumidor deberá
                  presentar queja ante el proveedor y devolver el producto,
                  cuando sea procedente, y notificar de la reclamación al emisor
                  del instrumento de pago electrónico utilizado para realizar la
                  compra, el cual, en conjunto con los demás participantes del
                  proceso de pago, procederán a reversar la transacción al
                  comprador.
                </p>

                <p>
                  En el evento que existiere controversia entre proveedor y
                  consumidor derivada de una queja y esta fuere resuelta por
                  autoridad judicial o administrativa a favor del proveedor, el
                  emisor del instrumento de pago, en conjunto con los demás
                  participantes del proceso de pago, una vez haya sido
                  notificado de la decisión, y siempre que ello fuere posible,
                  cargará definitivamente la transacción reclamada al depósito
                  bancario o instrumento de pago correspondiente o la debitará
                  de la cuenta corriente o de ahorros del consumidor, y el
                  dinero será puesto a disposición del proveedor. De no existir
                  fondos suficientes o no resultar posible realizar lo anterior
                  por cualquier otro motivo, los participantes del proceso de
                  pago informarán de ello al proveedor, para que este inicie las
                  acciones que considere pertinentes contra el consumidor. Si la
                  controversia se resuelve a favor del consumidor, la reversión
                  se entenderá como definitiva.
                </p>

                <p>
                  Lo anterior, sin perjuicio del deber del proveedor de cumplir
                  con sus obligaciones legales y contractuales frente al
                  consumidor y de las sanciones administrativas a que haya
                  lugar. En caso de que la autoridad judicial o administrativa
                  determine que hubo mala fe por parte del consumidor, la
                  Superintendencia podrá imponerle sanciones de hasta cincuenta
                  (50) salarios mínimos legales mensuales vigentes. El Gobierno
                  Nacional reglamentará el presente artículo.
                </p>
                <p>
                  PARÁGRAFO 1o. Para los efectos del presente artículo, se
                  entienden por participantes en el proceso de pago, los
                  emisores de los instrumentos de pago, las entidades
                  administradoras de los Sistemas de Pago de Bajo Valor, los
                  bancos que manejan las cuentas y/o depósitos bancarios del
                  consumidor y/o del proveedor, entre otros.
                </p>

                <p>
                  PARÁGRAFO 2o. El consumidor tendrá derecho a reversar los
                  pagos correspondientes a cualquier servicio u obligación de
                  cumplimiento periódico, por cualquier motivo y aún sin que
                  medie justificación alguna, siempre que el pago se haya
                  realizado a través de una operación de débito automático
                  autorizada previamente por dicho consumidor, en los términos
                  que señale el gobierno Nacional para el efecto.”
                </p>

                <p>
                  <strong>14. Facturación </strong>
                </p>

                <p>
                  La facturación se realizará de manera electrónica, conforme
                  las leyes vigentes en la República de Colombia; por medio de
                  un mensaje de datos al correo electrónico previamente
                  registrado por el contratante en GROVITY.
                </p>

                <p>
                  Nos reservamos el derecho de rechazar cualquier solicitud de
                  servicio realice con nosotros. En el caso de que hagamos un
                  cambio o cancelemos un servicio, lo notificaremos poniéndonos
                  en contacto vía correo electrónico y/o dirección de
                  facturación o número de teléfono proporcionado en el momento
                  que se hizo la solicitud de servicio. Nos reservamos el
                  derecho de limitar o prohibir las órdenes que, a nuestro
                  juicio, parecen ser colocado por los concesionarios,
                  revendedores, agentes de compras o distribuidores.
                </p>

                <p>
                  Como usuario, usted se compromete a proporcionar información
                  actual, completa y precisa para efectos de la debida
                  facturación del servicio. Te comprometes igualmente a
                  actualizar rápidamente tu cuenta y otra información,
                  incluyendo tu dirección de correo electrónico, para que
                  podamos completar tus transacciones y contactarte cuando sea
                  necesario.
                </p>

                <p>
                  <strong>15. Garantía del servicio</strong>
                </p>

                <p>
                  La garantía legal es la obligación que tiene GROVITY para con
                  los contratantes de responder por la calidad, idoneidad,
                  seguridad y el buen estado y funcionamiento de los servicios.
                  En el presente caso por tratarse de prestación de servicios en
                  elque el GROVITY tiene una obligación de medio, la garantía
                  está dada, no por el resultado, sino por las condiciones de
                  calidad en la prestación del servicio, según las condiciones
                  establecidas en normas de carácter obligatorio, en las
                  ofrecidas o en las ordinarias y habituales del mercado.
                </p>

                <p>
                  La garantía legal ofrecida por parte de GROVITY se someterá
                  conforme a lo consagrado en la Ley 1480 de 2011 y
                  especialmente en el artículo 16 del Decreto 735 de 2013:1
                </p>

                <p>
                  <strong>
                    “Artículo 16. Garantía legal en los casos de prestación de
                    servicios.
                  </strong>
                  En los casos de prestación de servicios, el proveedor del
                  servicio deberá dejar constancia escrita de la elección del
                  consumidor sobre la forma de hacer efectiva la garantía legal,
                  la cual puede ser la repetición del servicio o la devolución
                  del dinero. La Superintendencia de Industria y Comercio
                  establecerá los requisitos de la constancia escrita prevista
                  en este artículo.{" "}
                </p>

                <p>
                  Cuando se opte por la repetición del servicio, el proveedor
                  asumirá el costo de todos los materiales o insumos que le
                  hubieren sido suministrados inicialmente por el consumidor y
                  no podrá cobrar suma alguna por ellos ni por los demás
                  materiales o insumos que sin haber sido suministrados por el
                  consumidor se hubieren requerido para la prestación del
                  servicio.
                </p>

                <p>
                  Cuando se opte por la devolución del dinero, esta incluirá el
                  monto de todos los materiales o insumos que hubieran sido
                  suministrados por el consumidor para la prestación del
                  servicio.”
                </p>

                <p>
                  Así mismo, la garantía legal ofrecida por GROVITY, se somete
                  en particular a los siguientes criterios que se exponen a
                  continuación:
                </p>

                <p>
                  <strong>15. 1. Término de la garantía legal</strong>
                </p>
                <p>
                  GROVITY ofrecerá una garantía por el término de la prestación
                  del servicio y por un (1) día calendario, posterior a la
                  finalización del servicio. En caso de existir un contrato
                  entre las partes que determine otro acuerdo, prevalecerá el
                  contrato.
                </p>

                <p>
                  <strong>15.2. Exoneración de la Garantía</strong>
                </p>

                <p>
                  La garantía no aplicará en caso de las causales de exoneración
                  determinadas en el artículo 16 de la ley 1480 de 2011.
                </p>

                <p>
                  <strong>
                    15.3. Requisitos y condiciones que se deben cumplir para
                    entrar dentro de los términos de la garantía.
                  </strong>
                </p>

                <p>
                  El usuario deberá manifestar su deseo de hacer valer su
                  garantía legal mediante notificación enviada al correo
                  electrónico claudia@grovity.co.{" "}
                </p>

                <p>
                  <strong>
                    16. Servicios exhibidos en el sitio web, servicios
                    exclusivos, limitación de cantidades de compra
                  </strong>
                </p>

                <p>
                  Ciertos servicios pueden estar disponibles exclusivamente en
                  línea a través del sitio web. Estos servicios pueden tener
                  cantidades limitadas.
                </p>

                <p>
                  Nos reservamos el derecho, pero no estamos obligados, para
                  limitar las ventas de nuestros servicios a cualquier persona,
                  región geográfica o jurisdicción. Podemos ejercer este derecho
                  basados en cada caso. Nos reservamos el derecho de limitar los
                  servicios que ofrecemos. Todas las descripciones de servicios
                  o precios de los servicios están sujetos a cambios en
                  cualquier momento sin previo aviso, a nuestra sola discreción
                  siempre y cuando no se hayan publicado por parte de GROVITY.
                  Nos reservamos el derecho de descontinuar cualquier servicio
                  en cualquier momento. Cualquier oferta de servicio hecho en
                  este sitio es nulo donde esté prohibido.
                </p>

                <p>
                  <strong>17. Promociones, noticias y actualizaciones</strong>
                </p>

                <p>
                  Para estar informado de ofertas especiales, el usuario debe
                  suscribirse al newsletter para mantenerse enterado de los
                  eventos de GROVITY, promociones y novedades. También puede
                  encontrar toda la información en nuestra página web y en las
                  redes sociales: Facebook y/o Instagram, en los respectivos
                  perfiles oficiales de GROVITY.
                </p>

                <p>
                  Todas las ofertas especiales de GROVITY serán realizadas a
                  través de los canales oficiales antes indicados, por lo cual
                  no se reconocerán ofertas especiales que sean realizadas a
                  través de perfiles no oficinales de la compañía.
                </p>

                <p>
                  <strong>18. Información y sitios web de terceros </strong>
                </p>

                <p>
                  La página web puede ofrecer hipervínculos o acceso a páginas
                  web y contenidos de otras personas o entidades. GROVITY no
                  controla, refrenda ni garantiza el contenido incluido en
                  dichos sitios. El usuario acepta que GROVITY no es responsable
                  de ningún contenido, enlace asociado, recurso o servicio
                  relacionado con el sitio de un tercero. Así mismo, el usuario
                  acepta que GROVITY no será responsable de ninguna pérdida o
                  daño de cualquier tipo que se derive del uso que se realice de
                  los contenidos de un tercero. Los enlaces y el acceso a estos
                  sitios se proporcionan exclusivamente para comodidad del
                  usuario.{" "}
                </p>

                <p>
                  El usuario reconoce y acepta que proporcionamos acceso a este
                  tipo de herramientas "tal cual" y "según disponibilidad" sin
                  garantías, representaciones o condiciones de ningún tipo y sin
                  ningún respaldo. No tendremos responsabilidad alguna derivada
                  o relacionada con tu uso de herramientas o enlaces
                  proporcionados por terceras partes.
                </p>

                <p>
                  Cualquier uso que el usuario haga de las herramientas
                  opcionales o enlaces de terceros que se ofrecen a través del
                  sitio, serán bajo el propio riesgo y discreción del usuario
                  por lo que debe asegurarse de estar familiarizado y aprobar
                  los términos bajo los cuales estas herramientas son
                  proporcionadas por el o los proveedores de terceros.
                </p>

                <p>
                  También es posible que, en el futuro, se ofrezcan por GROVITY
                  nuevos servicios y/o características a través del sitio web
                  (incluyendo el lanzamiento de nuevas herramientas y recursos).
                  Estas nuevas características y/o servicios también estarán
                  sujetos a estos términos y condiciones.
                </p>

                <p>
                  Los enlaces de terceras partes en este sitio pueden
                  direccionarte a sitios web de terceras partes que no están
                  afiliadas con nosotros. No nos responsabilizamos de examinar o
                  evaluar el contenido o exactitud y no garantizamos ni
                  tendremos ninguna obligación o responsabilidad por cualquier
                  material de terceros o sitios web, o de cualquier material,
                  servicios o servicios de terceros.
                </p>

                <p>
                  No nos hacemos responsables de cualquier daño o daños
                  relacionados con la adquisición o utilización de bienes,
                  servicios, recursos, contenidos, o cualquier otra transacción
                  realizadas en conexión con sitios web de terceros. Por favor
                  revise cuidadosamente las políticas y prácticas de terceros y
                  asegúrate de entenderlas antes de participar en cualquier
                  transacción. Quejas, reclamos, inquietudes o preguntas con
                  respecto a servicios de terceros deben ser dirigidas a la
                  tercera parte.
                </p>
                <p>
                  Por lo anterior, el usuario acepta que GROVITY no es
                  responsable de ningún contenido, enlace asociado, recurso o
                  servicio relacionado con el sitio de un tercero. Así mismo, el
                  Usuario acepta que GROVITY no será responsable de ninguna
                  pérdida o daño de cualquier tipo que se derive del uso que se
                  realice de los contenidos de un tercero. Los enlaces y el
                  acceso a estos sitios se proporcionan exclusivamente para
                  comodidad del Usuario.
                </p>

                <p>
                  El establecimiento de un vínculo (link) con el sitio web de
                  otra empresa, entidad o programa no implica necesariamente la
                  existencia de relaciones entre GROVITY y el propietario del
                  sitio o página web vinculada, ni la aceptación o aprobación de
                  sus contenidos o servicios. Quienes se propongan establecer un
                  vínculo (link) se asegurarán de que éste únicamente permita el
                  acceso a la página de inicio web. Así mismo, deberán
                  abstenerse de realizar manifestaciones o indicaciones falsas,
                  inexactas o incorrectas sobre GROVITY o incluir contenidos
                  ilícitos, o contrarios a las buenas costumbres y al orden
                  público.{" "}
                </p>

                <p>
                  Así mismo, GROVITY no se hace responsable respecto de la
                  información que se halle fuera de su sitio web y no sea
                  gestionada directamente por el administrador de la página Web
                  www.grovity.co. Los vínculos (links) que aparecen en la página
                  web tienen como propósito informar al usuario sobre la
                  existencia de otras fuentes susceptibles de ampliar los
                  contenidos que ésta ofrece, o que guardan relación con
                  aquéllos. GROVITY no garantiza ni se responsabiliza del
                  funcionamiento o accesibilidad de las páginas web vinculadas;
                  ni sugiere, invita o recomienda la visita a las mismas, por lo
                  que tampoco será responsable del resultado obtenido.{" "}
                </p>

                <p>
                  GROVITY no responde en ningún caso y bajo ninguna
                  circunstancia, por los ataques o incidentes contra la
                  seguridad de su página web o contra sus sistemas de
                  información o por cualquier exposición o acceso no autorizado,
                  fraudulento o ilícito a su página web y que puedan afectar la
                  confidencialidad, integridad o autenticidad de la información
                  publicada o asociada con los contenidos y servicios que se
                  ofrecen en ella.{" "}
                </p>

                <p>
                  Así mismo, deberán abstenerse de realizar manifestaciones o
                  indicaciones falsas, inexactas o incorrectas sobre GROVITY o
                  incluir contenidos ilícitos, o contrarios a las buenas
                  costumbres y al orden público.
                </p>

                <p>
                  <strong>
                    19. Comentarios de usuario, retroalimentación y otros envíos
                  </strong>
                </p>

                <p>
                  Si, a pedido nuestro, el usuario envía ciertas presentaciones
                  específicas (por ejemplo comentarios sobre el servicio
                  recibido) o sin un pedido de nuestra parte envía ideas
                  creativas, sugerencias, proposiciones, planes, u otros
                  materiales, ya sea en línea, por email, por correo postal, o
                  de otra manera (colectivamente, 'comentarios'), aceptas que
                  podamos, en cualquier momento, sin restricción, editar,
                  copiar, publicar, distribuir, traducir o utilizar por
                  cualquier medio comentarios que haya enviado. No tenemos ni
                  tendremos ninguna obligación (1) de mantener ningún comentario
                  confidencialmente; (2) de pagar compensación por comentarios;
                  o (3) de responder a comentarios.
                </p>

                <p>
                  Nosotros podemos, pero no tenemos obligación de, monitorear,
                  editar o remover contenido que consideremos sea ilegítimo,
                  ofensivo, amenazante, calumnioso, difamatorio, pornográfico,
                  obsceno u objetable o viole la propiedad intelectual de
                  cualquiera de las partes o los términos y condiciones.
                </p>

                <p>
                  El usuario acepta que sus comentarios no violarán los derechos
                  de terceras partes, incluyendo derechos de autor, marca,
                  privacidad, personalidad u otro derechos personal o de
                  propiedad. Asimismo, acepta que tus comentarios no contienen
                  material difamatorio o ilegal, abusivo u obsceno, o contienen
                  virus informáticos u otro malware que pudiera, de alguna
                  manera, afectar el funcionamiento del servicio o de cualquier
                  sitio web relacionado. El usuario no puede utilizar una
                  dirección de correo electrónico falsa, usar otra identidad que
                  no sea legítima, o engañar a terceras partes o a nosotros en
                  cuanto al origen de tus comentarios. El Usuario es el único
                  responsable por los comentarios que haces y su precisión. No
                  nos hacemos responsables y no asumimos ninguna obligación con
                  respecto a los comentarios publicados por ti o cualquier
                  tercer parte.
                </p>

                <p>
                  <strong>20. Disponibilidad de la Información </strong>
                </p>

                <p>
                  GROVITY no garantiza el funcionamiento de la red de
                  comunicaciones y por lo tanto no asume responsabilidad alguna
                  sobre la disponibilidad de este sitio web. El servidor podrá
                  ser desconectado sin previo aviso, GROVITY hará todo lo
                  necesario para que el impacto por tareas de mantenimiento sea
                  el menor posible.{" "}
                </p>

                <p>
                  <strong>
                    21. Responsabilidad de la Información contenida
                  </strong>
                </p>
                <p>
                  GROVITY no controla ni garantiza la ausencia de virus ni de
                  otros elementos en los contenidos que puedan producir
                  alteraciones en su sistema informático (software y hardware) o
                  en los documentos electrónicos y ficheros almacenados en su
                  sistema informático.{" "}
                </p>

                <p>
                  En consecuencia con lo anterior, GROVITY no se hará
                  responsable de ningún daño ocasionado en virtud de cualquier
                  alteración que se haya efectuado a los materiales o archivos
                  de descarga suministrados directamente por la entidad.
                </p>

                <p>
                  <strong>22 Errores, inexactitudes y omisiones</strong>
                </p>
                <p>
                  De vez en cuando puede haber información en nuestro sitio o en
                  el servicio que contiene errores tipográficos, inexactitudes u
                  omisiones que puedan estar relacionadas con las descripciones
                  de servicios, precios, promociones, ofertas y la
                  disponibilidad. Ninguna especificación actualizada o fecha de
                  actualización aplicada en el servicio o en cualquier sitio web
                  relacionado, debe ser tomada para indicar que toda la
                  información en el servicio o en cualquier sitio web
                  relacionado ha sido modificado o actualizado.
                </p>

                <p>
                  <strong>23. Usos prohibidos</strong>
                </p>

                <p>
                  En adición a otras prohibiciones como se establece en los
                  términos y condiciones, se prohíbe el uso del sitio o su
                  contenido: (a) para ningún propósito ilegal; (b) para pedirle
                  a otros que realicen o participen en actos ilícitos; (c) para
                  violar cualquier regulación, reglas, leyes internacionales,
                  federales, provinciales o estatales, u ordenanzas locales; (d)
                  para infringir o violar el derecho de propiedad intelectual
                  nuestro o de terceras partes; (e) para acosar, abusar,
                  insultar, dañar, difamar, calumniar, desprestigiar, intimidar
                  o discriminar por razones de género, orientación sexual,
                  religión, etnia, raza, edad, nacionalidad o discapacidad; (f)
                  para presentar información falsa o engañosa; (g) para cargar o
                  transmitir virus o cualquier otro tipo de código malicioso que
                  sea o pueda ser utilizado en cualquier forma que pueda
                  comprometer la funcionalidad o el funcionamiento del Servicio
                  o de cualquier sitio web relacionado; (h) para recopilar o
                  rastrear información personal de otros; (i) para generar spam,
                  phish, pharm, pretext, spider, crawl, o scrape; (j) para
                  cualquier propósito obsceno o inmoral; (k) para interferir con
                  o burlar los elementos de seguridad del servicio o cualquier
                  sitio web relacionado, otros sitios web o el Internet. Nos
                  reservamos el derecho de suspender el uso del servicio o de
                  cualquier sitio web relacionado por violar cualquiera de los
                  ítems de los usos prohibidos.
                </p>

                <p>
                  <strong>24. Indemnidad e indemnización de perjuicios</strong>
                </p>

                <p>
                  El usuario acepta indemnizar, defender y mantener indemne a
                  GROVITY y nuestras matrices, subsidiarias, afiliados, socios,
                  funcionarios, directores, agentes, contratistas,
                  concesionarios, proveedores de servicios, sub contratistas,
                  proveedores, internos y empleados, de cualquier reclamo o
                  demanda, incluyendo honorarios razonables de abogados, hechos
                  por cualquier tercero a causa o como resultado de su
                  incumplimiento de los términos y condiciones o de los
                  documentos que incorporan como referencia, o la violación de
                  cualquier ley o de los derechos de terceros.
                </p>

                <p>
                  <strong>25. Divisibilidad</strong>
                </p>

                <p>
                  En el caso de que se determine que cualquier disposición de
                  estas condiciones de servicio sea ilegal, nula o inejecutable,
                  dicha disposición será, no obstante, efectiva a obtener la
                  máxima medida permitida por la ley aplicable, y la parte no
                  exigible se considerará separada de estos términos de
                  servicio, dicha determinación no afectará la validez de
                  aplicabilidad de las demás disposiciones restantes.
                </p>

                <p>
                  <strong>
                    26. Efectos a la terminación de los presentes términos y
                    condiciones
                  </strong>
                </p>

                <p>
                  Las obligaciones y responsabilidades de las partes que hayan
                  incurrido con anterioridad a la fecha de terminación de los
                  presentes términos y condiciones, sobrevivirán a la
                  terminación de este acuerdo a todos los efectos.
                </p>

                <p>
                  Estas condiciones de servicio son efectivas a menos que y
                  hasta que sea terminado por usted o nosotros el presente
                  acuerdo. El usuario puede terminar estos términos de servicio
                  en cualquier momento notificando que ya no desea utilizar
                  nuestros servicios, o cuando deje de usar nuestro sitio.
                </p>

                <p>
                  Si a nuestro juicio, se determina o se sospecha que usted ha
                  fallado, en el cumplimiento de cualquier término o disposición
                  de estos términos y condiciones, también podemos terminar
                  unilateralmente este acuerdo en cualquier momento sin previo
                  aviso, y seguirá siendo responsable de todos los montos
                  adeudados hasta la fecha de terminación; y/o en consecuencia
                  podemos negar el acceso a nuestros servicios (o cualquier
                  parte del mismo).
                </p>

                <p>
                  <strong>
                    27. Política de Protección y Tratamiento de Datos Personales{" "}
                  </strong>
                </p>

                <p>
                  La seguridad de los datos personales es una prioridad para
                  GROVITY, en consecuencia informamos que hemos implementado y
                  cumplido con los niveles de seguridad exigidos por la
                  normatividad vigente en lo relacionado con la recolección,
                  manejo y protección de datos.{" "}
                </p>

                <p>
                  Este sitio en Internet se esfuerza por ofrecer el más alto
                  nivel de seguridad para lo cual se utiliza tecnología de
                  avanzada. No obstante, considerando el estado de la tecnología
                  de transmisión de datos por Internet, ningún sistema resulta
                  actualmente 100% seguro o libre de ataques. Considere los
                  métodos de protección que utiliza GROVITY para proteger sus
                  datos y su privacidad, y por favor infórmenos cualquier
                  inquietud, duda o comentario al correo claudia@grovity.co o a
                  la línea telefónica (+57) 310 453 1639.
                </p>

                <p>
                  GROVITY respeta su privacidad. Toda la información que usted
                  nos proporcione se tratará con sumo cuidado y con la mayor
                  seguridad posible, y sólo se utilizará de acuerdo con los
                  límites establecidos en este documento y para actividades
                  relacionadas de acuerdo a los parámetros aprobados previamente
                  por usted. No obstante lo anterior, en cualquier momento usted
                  podrá solicitar actualización de la información, y/o el retiro
                  de nuestra base de datos, para lo cual podrá comunicarse con
                  nuestras líneas de atención (+57) 310 453 1639, o al correo
                  electrónico claudia@grovity.co
                </p>

                <p>
                  GROVITY solamente reúne sus datos personales cuando usted los
                  proporciona en forma directa, así como también cuando usted
                  diligencia nuestros formularios de contacto, planilla de
                  información, y/o en los eventos de mercadeo, ferias entre
                  otros.{" "}
                </p>

                <p>
                  La información por usted proporcionada a GROVITY tiene como
                  finalidad el desarrollo del objeto social de la compañía, su
                  matriz, filiales, subsidiarias, controladas y similares, lo
                  cual incluye pero no se limita a: fines estadísticos,
                  comerciales, informativos, de seguimiento al servicio, de
                  mercadeo, de notificación y contacto al cliente para las
                  campañas de seguridad y/o de satisfacción, mercadeo relacional
                  y/o similares, verificación en centrales de riesgo, aspectos
                  contables y de nómina, y demás aplicables a cada uno de los
                  titulares.{" "}
                </p>

                <p>
                  GROVITY siempre está comprometido a presentar nuevas
                  soluciones que mejoren el valor de sus servicios para
                  ofrecerle a usted oportunidades especiales de
                  comercialización, tales como incentivos y promociones. Para
                  alcanzar esa meta, su información podrá ser compartida
                  internamente y con algunos de nuestros socios comerciales.
                  GROVITY; toma todas las medidas posibles para que se haga uso
                  de la información suministrada respetando la misma política de
                  privacidad que tiene GROVITY{" "}
                </p>

                <p>
                  La información no identificable y estadística también podrá
                  ser compartida con socios comerciales. A excepción de los
                  casos anteriores, GROVITY no compartirá información que podría
                  identificar personalmente a sus clientes.
                </p>

                <p>
                  Al proporcionar sus datos personales, usted está autorizando
                  automática y expresamente a GROVITY a utilizarlos de acuerdo
                  con esta Política de Seguridad y Privacidad. Cuando solicita
                  información, GROVITY indaga a usted sobre cómo desea que se
                  utilice su información para la comunicación futura con GROVITY
                  y con sus socios comerciales. En ese momento, si no está de
                  acuerdo con la propuesta de uso que sugiere GROVITY, usted
                  podrá desactivar las opciones no deseadas con un clic en el
                  icono correspondiente. Si elige mantener activadas las
                  opciones, automáticamente usted estará autorizando a GROVITY a
                  utilizar sus datos personales para recibir correspondencia
                  futura de las empresas de GROVITY o sus socios comerciales. En
                  cualquier momento usted podrá comunicarse con nuestras líneas
                  de atención telefónica, o al correo institucional
                  claudia@grovity.co, con el objeto de poner en conocimiento su
                  solicitud, y deberá acompañarla de unos datos mínimos de
                  identificación como son cédula de ciudadanía o identificación
                  nacional, teléfono, entre otros, para que un colaborador de
                  nuestra compañía se ponga en contacto con usted, y logre
                  atender su requerimiento, actualización de la información, o
                  retiro de nuestra base de datos.
                </p>

                <p>
                  Usted también tiene un importante papel que desempeñar en la
                  protección de su privacidad. Recomendamos que se desconecte
                  del sitio de GROVITY y que cierre la ventana de su navegador
                  al finalizar su visita para que terceros no tengan acceso a
                  sus datos personales, especialmente cuando utiliza equipos
                  públicos o compartidos. GROVITY no será responsable en caso de
                  que usted no tome en cuenta estas recomendaciones, ni por los
                  daños causados por dicho descuido.{" "}
                </p>

                <p>
                  Si usted es menor de edad, no puede registrarse en nuestra
                  página web, por lo cual no se le solicitaran datos personales.
                  En caso de querer acceder pida acompañamiento de sus padres o
                  su tutor legal.{" "}
                </p>

                <p>
                  Las presentes políticas se encuentran dirigidas a todos
                  nuestros Clientes Finales, Empleados, Ex empleados,
                  Proveedores, Contratistas, Accionistas, y demás titulares y
                  legitimados de los datos personales registrados en cada una de
                  nuestras bases de datos.
                </p>

                <p>
                  GROVITY S.A.S., identificada con el Nit No. 901.396.111 - 7,
                  con domicilio en la ciudad de Bogotá, Cundinamarca, en la CR 6
                  80 A 11 INT 701, como responsable del tratamiento de los datos
                  personales que actualmente reposan en las bases de datos de la
                  compañía, informa por este medio las Políticas de Tratamiento
                  de Datos Personales, los cuales podrán ser objeto de
                  almacenamiento tanto nacional como internacional, uso,
                  circulación, supresión, recepción, recolección, actualización,
                  transferencia, y transmisión tanto nacional como
                  internacional.{" "}
                </p>

                <p>
                  El tratamiento de estos datos personales tiene como finalidad
                  el desarrollo del objeto social de la compañía, su matriz,
                  filiales, subsidiarias, controladas y similares, lo cual
                  incluye pero no se limita a: fines estadísticos, comerciales,
                  informativos, de seguimiento al servicio, de mercadeo, de
                  notificación y contacto al cliente para las campañas de
                  seguridad y/o de satisfacción, mercadeo relacional y/o
                  similares, verificación en centrales de riesgo, aspectos
                  contables y de nómina, y demás aplicables a cada uno de los
                  titulares.{" "}
                </p>

                <p>
                  Los titulares de la información así como los legalmente
                  legitimados tendrán derecho a: acceder, conocer, actualizar,
                  rectificar, revocar y solicitar prueba de la autorización, así
                  como a la supresión de los datos personales en los casos
                  contemplados en la Ley, para lo cual podrán enviar su
                  solicitud al correo electrónico claudia@grovity.co, si
                  prefiere comunicándose a la línea (+57) 310 453 1639 o
                  ingresando a la página web www.grovity.co.{" "}
                </p>

                <p>
                  Esta Política de Tratamiento de Datos es referente al uso que
                  GROVITY, le dará a los datos personales que reposen en sus
                  registros de conformidad con lo establecido en la ley 1581 de
                  2012 y el Decreto 1377 de 2013, así como los demás decretos
                  que reglamenten, complementen o modifiquen estas
                  disposiciones, por un término indefinido, o hasta que GROVITY
                  lo establezca y comunique en este sitio web.{" "}
                </p>

                <p>
                  <strong>28. Manejo de usuario y contraseña </strong>
                </p>

                <p>
                  El Usuario se compromete a guardar de forma confidencial y con
                  la máxima diligencia su clave de acceso personal al sitio web.{" "}
                </p>

                <p>
                  <strong>29. Solución de Controversias </strong>
                </p>

                <p>
                  Todas las controversias y/o reclamos que puedan surgir de la
                  relación comercial, así como por el uso del sitio web
                  www.grovity.co implican la aceptación y sometimiento a las
                  leyes y normas de la República de Colombia y serán resueltas
                  por los jueces competentes de la República de Colombia.
                </p>

                <p>
                  <strong>30. Normatividad aplicable</strong>
                </p>

                <p>
                  Los presentes términos y condiciones, el contrato y las
                  relaciones jurídicas que se deriven de los mismos, se regirán
                  por las leyes de la República de Colombia
                </p>

                <p>
                  <strong>31. Origen de los Fondos </strong>
                </p>

                <p>
                  Las partes declaran que sus ingresos provienen de actividades
                  lícitas y que no se encuentran con registros negativos en
                  listados de prevención de lavado de activos nacionales o
                  internacionales, ni incurren en categoría alguna de lavado de
                  activos y, en consecuencia, se obligan a responder, frente a
                  la otra parte, por todos los perjuicios que llegaren a causar
                  como consecuencia de la no correspondencia con la realidad de
                  esta afirmación. De acuerdo con lo anterior, será justa causa
                  para dar por terminado el contrato, la inclusión de cualquiera
                  de las partes, de sus accionistas o de sus representantes
                  legales en los listados de la OFAC o de cualquiera autoridad
                  local, extranjera o internacional, como sospechosa de
                  actividades de lavado de activos. Igualmente, la parte cuya
                  afirmación sea contraria a la realidad o a la que se le
                  incluya en los listados anotados, responderá ante la otra
                  parte por los perjuicios que le cause a la parte cumplida.{" "}
                </p>

                <p>
                  <strong>PARÁGRAFO.</strong> Para todos los efectos el "lavado
                  de dinero" es el conjunto de procedimientos usados para
                  cambiar la identidad del dinero obtenido ilegalmente, a fin de
                  que aparente haber sido obtenido de fuentes legítimas. Estos
                  procedimientos incluyen disimular la procedencia y propiedad
                  verdadera de los fondos.{" "}
                </p>

                <p>
                  <strong>32. Uso de Cookies</strong>
                </p>

                <p>
                  Los usuarios de la página web conocen y aceptan que esta podrá
                  utilizar un sistema de seguimiento mediante la utilización de
                  cookies. Las Cookies son pequeños archivos que se instalan en
                  el disco rígido, con una duración limitada en el tiempo que
                  ayudan a personalizar los servicios. También ofrecemos ciertas
                  funcionalidades que sólo están disponibles mediante el empleo
                  de cookies. Las Cookies se utilizan con el fin de conocer los
                  intereses, el comportamiento y la demografía de quienes
                  visitan o son visitantes de nuestro sitio web y de esa forma,
                  comprender mejor sus necesidades e intereses y darles un mejor
                  servicio o proveerle información relacionada. También usaremos
                  la información obtenida por intermedio de las cookies para
                  analizar las páginas navegadas por el visitante o usuario, las
                  búsquedas realizadas, mejorar nuestras iniciativas comerciales
                  y promocionales, mostrar publicidad o promociones, banners de
                  interés, noticias relacionadas con el portal, perfeccionar
                  nuestra oferta de contenidos y artículos, personalizar dichos
                  contenidos, presentación y servicios. Adicionalmente la página
                  web utiliza las cookies para que el usuario no tenga que
                  introducir su clave tan frecuentemente durante una sesión de
                  navegación, también para contabilizar y corroborar los
                  registros, la actividad del usuario y otros conceptos y
                  acuerdos comerciales, siempre teniendo como objetivo de la
                  instalación de las cookies, el beneficio del usuario que la
                  recibe, y no será usado con otros fines ajenos a los del
                  portal. Se establece que la instalación, permanencia y
                  existencia de las cookies en el computador del usuario o del
                  visitante depende de su exclusiva voluntad y puede ser
                  eliminada de su computador cuando así lo desee. Para saber
                  cómo quitar las cookies del sistema es necesario revisar la
                  sección ayuda (help) del navegador. También, se pueden
                  encontrar cookies u otros sistemas similares instalados por
                  terceros en ciertas páginas de nuestro Sitio. Es importante
                  resaltar que la página web no controla el uso de cookies por
                  terceros.
                </p>

                <p>
                  <strong>33. Acuerdo completo</strong>
                </p>

                <p>
                  La falla, demora o retardo de GROVITY para ejercer o hacer
                  valer cualquier derecho o disposición de estas condiciones de
                  servicio no constituirá una renuncia a tal derecho o
                  disposición. Los presentes términos y condiciones y las
                  políticas o reglas de operación publicadas por GROVITY en este
                  sitio o con respecto al servicio constituyen el acuerdo
                  completo de entendimiento entre usted y nosotros. Estas rigen
                  el uso del servicio y reemplaza cualquier acuerdo,
                  comunicaciones y propuestas anteriores o contemporáneas, ya
                  sea oral o escrita, entre usted y nosotros (incluyendo, pero
                  no limitado a, cualquier versión previa de los términos y
                  condiciones).
                </p>

                <p>
                  <strong>34. Dudas, aclaratorias o comentarios </strong>
                </p>
                <p>
                  En caso de duda, aclaratoria o comentario respecto al
                  contenido de esta página web, respecto de los presentes
                  términos y condiciones o cualquier otro tema relacionado con
                  los servicios ofrecidos por GROVITY, lo invitamos a realizar
                  su comentario en nuestra sección “Contáctenos” o por favor
                  comunicarse con nuestros canales de atención, vía correo a la
                  CR 6 80 A 11 INT 701, en la ciudad de Bogotá, Cundinamarca,
                  teléfono de contacto (+57) 310 453 1639 en horario de lunes a
                  viernes de 8:00 a. m. a 5:00 p. m., y correo electrónico
                  claudia@grovity.co.{" "}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TermsAndConditionsText;
