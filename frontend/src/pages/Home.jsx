import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {
  return (
    <div
      className="bg-cover bg-center pt-16" // Ajusta el padding-top según la altura de tu navbar
      style={{ backgroundImage: 'url(https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728683804/bowl-with-pills-clock-beside-desk_e9izkx.jpg)' }}>
      <div className="absolute inset-0 bg-white opacity-70"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white bg-emerald-700 rounded-lg p-2">Bienvenido a MedAlert</h1>
        <p className="mt-4 text-lg text-white bg-emerald-700 rounded-lg p-2">Gestión de alertas para tus fármacos.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ width: '500px', height: '500px' }}> {/* Ajusta el tamaño aquí */}
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
          transitionTime={500}
        >
          <div>
            <img src="https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728701970/Registro_2_hodj1n.jpg" alt="Registro" />
            <p className="text-white text-lg bg-emerald-700 bg-opacity-50 p-2 rounded-lg">Registra tu cuenta</p>
          </div>
          <div>
            <img src="https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728700979/planes_v3r0lp.jpg" alt="Plan" />
            <p className="text-white text-lg bg-emerald-700 bg-opacity-50 p-2 rounded-lg">Elije un plan</p>
          </div>
          <div>
            <img src="https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728699630/Alerta_agendar_cvaowz.jpg" alt="Registra farmacos" />
            <p className="text-white text-lg bg-emerald-700 bg-opacity-50 p-2 rounded-lg">Comienza a registrar los fármacos</p>
          </div>
        </Carousel>
      </div>
    </div>
      </div>
    </div>
  );
}

export default Home;
