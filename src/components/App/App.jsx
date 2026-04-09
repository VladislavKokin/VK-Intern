import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "../styles.modules.css"

const MainPage = ({ images, favorites, toggleFavorite }) => (
  <div className="conteinerCats">
    {images.map(({ id, url }) => (
      <div className="conteinerImage" key={id}>
        <img className="imageCats" src={url} alt={`image-${id}`} />
        <button
          className={`buttonLike ${favorites.includes(id) ? "active" : ""}`}
          onClick={() => toggleFavorite(id)}
        ></button>
      </div>
    ))}
    <div className="loading">... загружаем еще котиков ...</div>
  </div>
);

const Catalog = ({ images, favorites, toggleFavorite }) => {
  const favoriteImages = images.filter(img => favorites.includes(img.id));

  return (
    <div className='conteinerCats'>
      {favoriteImages.length ? (
        favoriteImages.map(({ id, url }) => (
          <div className='conteinerImage' key={id}>
            <img className='imageCats' src={url} alt={`image-${id}`} />
            <button  className={`buttonLike ${favorites.includes(id) ? "active" : ""}`} 
            onClick={() => toggleFavorite(id)}>
            </button>
          </div>
        ))
      ) : (
        <p>Нет любимых котиков</p>
      )}
    </div>
  );
};

const App = () => {
    const [images, setImages] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (id) => {
      setFavorites(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
    };

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        .then((loadedData) => loadedData.json())
        .then((loadedProducts) => {
            setImages(loadedProducts);
        });
    }, []);

    return (
      <div className='app'>
        <header className="header">
          <div>
            <Link to="/">
                <button className="buttonAllCats">Все котики</button>
            </Link>
            <Link to="/catalog">
                <button className="buttonLikeCats">Любимые котики</button>
            </Link>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<MainPage images={images} favorites={favorites} toggleFavorite={toggleFavorite}/>} />
          <Route path="/catalog" element={<Catalog images={images} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        </Routes>
      </div>
    );
}

export default App