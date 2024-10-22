import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen pt-20 flex flex-col items-center justify-center" // Usamos flex para centrar todo el contenido
      style={{ backgroundImage: 'url(https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728683804/bowl-with-pills-clock-beside-desk_e9izkx.jpg)' }}
    >
      {/* Capa de opacidad sobre el fondo */}
      <div className="absolute inset-0 bg-white opacity-60 z-0"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white bg-emerald-700 rounded-lg p-2">
          Bienvenido a MedAlert
        </h1>
        <img 
          src="https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728678502/Medalerticon_fl7n6q.jpg"
          alt="MedAlert Logo"
          className="w-32 h-32 mt-4 mb-4 object-contain"
        />
        <p className="mt-4 text-lg text-white bg-emerald-700 rounded-lg p-2">
          Gestión de alertas para tus fármacos.
        </p>

        {/* Carrusel */}
        <div className="mt-8 w-full max-w-md">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
            transitionTime={500}
          >
            <div className="h-66">
              <img
                src="https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728701970/Registro_2_hodj1n.jpg"
                alt="Registro"
                className="w-full h-full object-cover"
              />
              <p className="legend text-white text-lg bg-emerald-700 bg-opacity-90 p-2 rounded-lg">
                Registra tu cuenta
              </p>
            </div>
            <div className="h-66">
              <img
                src="https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728700979/planes_v3r0lp.jpg"
                alt="Plan"
                className="w-full h-full object-cover"
              />
              <p className="legend text-white text-lg bg-emerald-700 bg-opacity-90 p-2 rounded-lg">
                Elige un plan
              </p>
            </div>
            <div className="h-66">
              <img
                src="https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728699630/Alerta_agendar_cvaowz.jpg"
                alt="Registra farmacos"
                className="w-full h-full object-cover"
              />
              <p className="legend text-white text-lg bg-emerald-700 bg-opacity-90 p-2 rounded-lg">
                Comienza a registrar los fármacos
              </p>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Home;
