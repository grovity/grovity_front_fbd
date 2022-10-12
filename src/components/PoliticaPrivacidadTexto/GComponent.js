import React from "react";
import PropTypes from "prop-types";
import "./scss/component-sm.scss";
import "./scss/component-md.scss";
import "./scss/component-lg.scss";
import { Row, Col } from "antd";

class PoliticaPrivacidadTexto extends React.PureComponent {
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
                  El sitio web GROVITY.CO , es una página propiedad de GROVITY,
                  INC. / GROVITY S.A.S., persona jurídica, domiciliada en
                  Colombia , regida por la ley colombiana y los presentes
                  Términos y Condiciones, los cuales el USUARIO se obliga a
                  respetar desde el momento de ingreso al sitio. Si el USUARIO
                  no está de acuerdo con cualquiera de los presentes Términos y
                  Condiciones deberá abstenerse de ingresar al sitio web o hacer
                  uso de sus servicios.
                  <br></br>
                  <br></br>
                  <br></br>
                </p>
                <strong>
                  <h3>Definiciones</h3>
                </strong>
                <ol type="a">
                  <li>
                    Usuario: persona que ingresa a al sitio web de GROVITY, INC.
                    / GROVITY S.A.S. o hace uso de cualquiera de sus servicios.
                  </li>
                  <li>
                    Sitio web. Dirección URL (GROVITY.CO) propiedad de GROVITY,
                    INC. / GROVITY S.A.S. y al cual aplican los presentes
                    términos y condiciones.
                  </li>
                  <li>
                    Propietario. GROVITY, INC. / GROVITY S.A.S., quien tiene el
                    control sobre el contenido que se ingresa, elimina o
                    permanece en el sitio, así como de la publicación del mismo.
                  </li>
                  <li>
                    Tratamiento de datos: Cualquier operación u operaciones
                    (recolectar, almacenar, analizar, transmitir, eliminar, etc)
                    que se realice con datos personales.
                  </li>
                  <li>
                    Responsable del tratamiento. Quién decide sobre el
                    tratamiento que se le da a los datos personales de los
                    usuarios, que para efectos de estos términos y condiciones
                    será GROVITY, INC. / GROVITY S.A.S.
                  </li>
                  <li>
                    Datos personales. Cualquier información asociada o que pueda
                    asociarse a una o varias personas determinadas o
                    determinables.
                  </li>
                  <li>
                    Titular. Persona cuyos datos personales sean tratados.
                  </li>
                </ol>
                <br></br>
                <br></br>
                <strong>
                  {" "}
                  <h3>Política de tratamiento de datos personales</h3>
                </strong>
                <p>
                  Al suministrar datos personales y aceptar su tratamiento el
                  USUARIO autoriza a que el sitio web y GROVITY, INC. / GROVITY
                  S.A.S. almacenen, transmitan, transfieran a cualquier título
                  la información proporcionada. Así mismo acepta su uso para
                  fines de prestar un mejor servicio, usos comerciales,
                  publicitarios y la comunicación de ofertas del sitio web,
                  GROVITY, INC. / GROVITY S.A.S. y terceros a los que les haya
                  sido transferida la información a cualquier título.
                  <p>
                    Al proporcionar sus datos personales el USUARIO acepta que
                    estos hagan parte de la base de datos que genera el sitio
                    web o GROVITY, INC. / GROVITY S.A.S. y que ésta sea
                    incluída, junto con su información, en los activos del sitio
                    web o GROVITY, INC. / GROVITY S.A.S. para las operaciones de
                    venta, fusión, escisión o cualquier otra operación
                    comercial.
                  </p>
                  <br></br>
                  <strong>Obligaciones del propietario</strong>
                  <br></br>
                  <br></br>
                  <strong>Medidas de protección:</strong> para garantizar la
                  privacidad de los datos personales proporcionados por el
                  USUARIO el propietario se obliga a tomar las medidas de
                  protección necesarias para evitar el acceso no autorizado a
                  dicha información. Estas medidas se ajustarán en función del
                  tipo de información proporcionada pero en ningún caso se asume
                  una obligación de resultado frente a la protección de dichos
                  datos. En caso de ingreso no autorizado, vulneración, o falla
                  de los servicios de seguridad el propietario se compromete a
                  solucionar el problema dentro de un tiempo razonable, mas no
                  será responsable por los daños producidos al USUARIO o
                  terceros por la violación de las medidas de seguridad
                  dispuestas o el acceso abusivo al sistema informático de
                  GROVITY, INC. / GROVITY S.A.S<br></br>
                  <br></br>
                  <p>
                    <strong>Control de la información:</strong> el USUARIO podrá
                    en cualquier momento solicitar la corrección, rectificación,
                    o actualización de la información proporcionada. Cuando la
                    Superintendencia de Comercio encuentre que el propietario ha
                    incumplido con la política de protección de datos acá
                    establecida o con los mínimos señalados por la ley el
                    USUARIO podrá solicitar la supresión de sus datos personales
                    tanto del sitio web como de las bases de datos de GROVITY,
                    INC. / GROVITY S.A.S. y terceros a los que les haya sido
                    transferida a cualquier título
                  </p>
                  <br></br>
                  <br></br>
                  <p>
                    <strong>Términos de respuesta:</strong> el propietario
                    responderá en un máximo de 10 (diez) días hábiles las
                    peticiones sobre consulta de datos personales que sean
                    elevadas por el USUARIO a través de los canales establecidos
                    para ello. Cuando la petición sea sobre corrección,
                    actualización o supresión de los datos el términos de
                    respuesta será de 15 (quince) días hábiles.
                  </p>
                  <strong>Canales de atención:</strong> para solicitudes sobre
                  actualización, rectificación, actualización o supresión de sus
                  datos personales el USUARIO podrá dirigirse a la dirección de
                  correo electrónico esteban@grovity.co y al teléfono (+57)
                  316668336
                  <br></br>
                  <br></br>
                  <strong>Copia de autorización: </strong>el propietario
                  conservará copia de la autorización otorgada por el USUARIO
                  para el tratamiento de sus datos personales y hará entrega de
                  la misma dentro de los 10 (diez) días hábiles siguientes a la
                  solicitud realizada por el USUARIO. Los términos comenzarán a
                  contar desde el día hábil siguiente a la fecha de realización
                  de la solicitud.<br></br>
                  <br></br>
                  <strong>Revelación de información: </strong>GROVITY, INC. /
                  GROVITY S.A.S. podrá dar a conocer los datos personales del
                  USUARIO cuando sea requerida por autoridades administrativas o
                  judiciales competentes.
                  <br></br>
                  <br></br>
                </p>
                <strong>
                  {" "}
                  <h3>Propiedad intelectual</h3>
                </strong>
                <p>
                  El contenido del sitio web (artículos, imágenes, vídeos,
                  logos, diseños, entre otros) es propiedad de GROVITY, INC. /
                  GROVITY S.A.S. y sólo podrán ser consultados por el USUARIO
                  para fines personales. Cualquier descarga, reproducción,
                  almacenamiento, transmisión, transferencia para permitir el
                  acceso a terceros, ya sea para fines personales o comerciales
                  se encuentra prohibido.
                  <br></br> Cuando en el sitio web se presente contenido de
                  terceros (artículos, imágenes, opiniones, vídeos, logos
                  diseños, entre otros) esto se hace con la autorización de los
                  autores del contenido y su descarga, reproducción,
                  almacenamiento, transmisión o transferencia a cualquier título
                  por parte del USUARIO queda sujeto a las mismas restricciones
                  del párrafo anterior. <br></br>Sobre los contenidos que el
                  USUARIO ingrese en el sitio web y que no constituyan datos
                  personales (opiniones, comentarios, imágenes, vídeos, logos,
                  diseños, entre otros) el USUARIO otorga a el sitio y a
                  GROVITY, INC. / GROVITY S.A.S. licencia para su uso sin
                  restricción alguna, incluyendo, pero no limitándose al
                  almacenamiento, reproducción, transferencia a cualquier
                  título, oneroso, gratuito, exhibición, entre otros.
                  <br></br>
                  <br></br>
                  <br></br>
                </p>
                <strong>
                  {" "}
                  <h3>Calidad de la información proporcionada</h3>
                </strong>
                <p>
                  El contenido publicado en el sitio web por cualquier medio o
                  formato (texto, video, imágenes, etc) cumple propósitos
                  meramente enunciativos y no constituyen asesoría o consejo
                  sobre cualquiera de los temas que traten. GROVITY, INC. /
                  GROVITY S.A.S. no garantiza la actualidad o veracidad de la
                  información contenida, sin perjuicio de aquella que constituya
                  oferta comercial o parte de ésta de conformidad con la
                  normatividad colombiana. <br></br>
                  <br></br>GROVITY, INC. / GROVITY S.A.S. no garantiza la
                  actualidad o veracidad de la información contenida en sitios
                  web, archivos, aplicaciones, y demás contenido de terceros a
                  los que el USUARIO sea redirigido desde el sitio web de su
                  propiedad, así como del contenido aportado por otros usuarios
                  en los espacios dispuestos para ello. El ingreso y uso de los
                  sitios, archivos, aplicaciones y similares a los que sea
                  redirigido el USUARIO desde GROVITY.CO estarán sujetos a los
                  términos y condiciones de los mismos, sobre los que GROVITY,
                  INC. / GROVITY S.A.S. no tiene responsabilidad alguna.
                  GROVITY, INC. / GROVITY S.A.S. tampoco garantiza que el
                  contenido de sitios web, archivos o aplicaciones de terceros
                  cumpla con la legislación colombiana en materia de protección
                  de datos o que el contenido allí presentado sea legal bajo la
                  normatividad colombiana.
                  <br></br>
                  <br></br>
                  GROVITY, INC. / GROVITY S.A.S. no se hace responsable por los
                  daños o perjuicios que pudiera causar al USUARIO o terceros la
                  inexactitud, error, o veracidad de la información
                  proporcionada en el sitio web o sitios, aplicaciones,
                  archivos, documentos y contenido de terceros a los cuales sea
                  redirigido el USUARIO, así como fallas parciales o completas
                  en el funcionamiento del mismo, códigos maliciosos que
                  terceros incluyeran en el sitio o sus archivos. Lo anterior
                  sin perjuicio de aquella información que constituya oferta
                  comercial en GROVITY.CO de conformidad con la normatividad
                  colombiana.<br></br>
                  <br></br>
                  <br></br>
                </p>
                <p>
                  <strong>
                    {" "}
                    <h3>Moderación</h3>
                  </strong>
                  Para garantizar el adecuado funcionamiento del sitio web y una
                  experiencia segura para los usuarios,{" "}
                  <strong>GROVITY, INC. / GROVITY S.A.S.</strong> podrá:
                  <ol type="a">
                    <li>
                      Cambiar en cualquier momento los presentes Términos y
                      Condiciones, así como la política de privacidad del sitio
                      web.
                    </li>
                    <li>Negar el registro de un USUARIO.</li>
                    <li>
                      Eliminar en cualquier momento los datos personales del
                      USUARIO de sus bases de datos.
                    </li>
                    <li>
                      Eliminar el contenido que el USUARIO haya ingresado a la
                      página, incluyendo pero no limitándose a comentarios,
                      imágenes, logos, vídeos, planos, diseños, entre otros.
                    </li>
                    <li>
                      Suspender de manera temporal o permanente la publicación
                      del sitio web, así como cualquiera de los servicios que
                      preste.
                    </li>
                    <li>
                      Eliminar sin previo aviso una parte o todo el contenido
                      agregado por el USUARIO al sitio cuando esté viole los
                      presentes términos y condiciones o la legislación
                      colombiana.
                    </li>
                  </ol>
                </p>{" "}
                <br></br>
                <p>
                  <strong>El USUARIO,</strong> para garantizar el adecuado
                  funcionamiento del sitio y una experiencia segura para los
                  demás deberá:
                  <ol type="a">
                    <li>
                      Acceder sólo a las secciones del sitio para las cuales ha
                      sido autorizado.
                    </li>
                    <li>
                      Abstenerse de proporcionar datos personales falsos, o que
                      induzcan a error al sitio web, GROVITY, INC. / GROVITY
                      S.A.S. a otros usuarios o a terceros, o que pretendan
                      impersonarlos.
                    </li>
                    <li>
                      Abstenerse de realizar actividades comerciales o
                      promocionales en los espacios en que el sitio le permite
                      agregar contenido, a menos que se autorice expresamente.
                    </li>
                    <li>
                      Abstenerse de descargar, reproducir, duplicar, almacenar
                      exhibir y en general disponer del contenido pago del sitio
                      para su exhibición o acceso por cualquier medio externo,
                      ya sea con fines personales o comerciales.
                    </li>
                    <li>
                      Abstenerse de proporcionar sus credenciales de ingreso
                      (CONTRASEÑA Y CORREO ELECTRÓNICO) para que terceros
                      diferentes del USUARIO accedan a los contenidos de pago
                      del sitio.
                    </li>
                  </ol>
                </p>
                <br></br>
                <br></br>
                <br></br>
                <h3>Política de cookies</h3>
                <p>
                  Las cookies son archivos que se guardan en el computador o
                  dispositivo del USUARIO al visitar el sitio web. Estos
                  archivos contienen información sobre las preferencias del
                  USUARIO, datos de login en diferentes sitios web así como
                  páginas visitadas, clicks dados e información con que se
                  rellenaron formularios, entre otros. Las cookies ayudan al
                  sitio a funcionar más rápidamente y prestar un mejor servicio.
                  <br></br>
                  El USUARIO puede deshabilitar el uso de cookies para sitios
                  específicos desde la configuración de su navegador web. Al no
                  deshabilitarlos para el sitio web de GROVITY, INC. / GROVITY
                  S.A.S. acepta su uso. <br></br>El deshabilitar el uso de
                  cookies en puede causar que el sitio no funcione de manera
                  adecuada, con poca velocidad, con errores o que presente
                  fallas que no permitan el uso por parte del USUARIO
                </p>
                <h3>Políticas de Privacidad de Usuarios de Google</h3>
                <p>
                  Grovity solicita el permiso de lectura de calendarios de los
                  usuarios,usando clientes OAuth 2.0 con configuración de
                  aplicación web. El cual se solicita "Consultar y descargar
                  cualquier calendario al que tengas acceso a través de tu
                  Calendario de Google". Se solicita información de horarios y
                  fechas de los eventos en un tiempo determinado, y se generan
                  espacios de disponibilidad para un usuario, que se muestran en
                  la plataforma. Grovity no almacena de forma permanente esta
                  información, solamente se trata y se muestra en el momento de
                  la consulta.
                </p>
                <p>
                  Grovity Se reserva el derecho de cambiar los términos de la
                  presente Política de Privacidad en cualquier momento.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PoliticaPrivacidadTexto;
