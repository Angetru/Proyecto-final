function Home() {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/dtzpmi6qs/image/upload/v1728683804/bowl-with-pills-clock-beside-desk_e9izkx.jpg)',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Para un fondo oscuro */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white">Bienvenido a MedAlert</h1>
        <p className="mt-4 text-lg text-white">Tu aplicación de salud confiable.</p>
        <button className="mt-6 bg-emerald-700 text-white py-2 px-4 rounded-lg">
          Empezar
        </button>
      </div>
    </div>
  );
}

export default Home;
