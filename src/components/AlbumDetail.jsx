import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './AlbumsDetail.css';

const AlbumDetail = () => {
	const ClientId = '186edb51b04148d99e7c55ed02ebc0fa';
	const ClientSecret = '24db6b43a228490f81bdada8879ec536';
	const {id} = useParams();
	const [token, setToken] = useState('');
	const artistID = id.split("-")[0];
	const albumId = id.split("-")[1];
	const [album, setAlbum] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		getToken();
		
	  }, [])
	   useEffect(() => {
		serch();
		
	  }, [token]) 

	  const getToken = async () => {
  
  
  
		const authParameters = {
		  method: 'POST',
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  body: 'grant_type=client_credentials&client_id=' + ClientId + '&client_secret=' + ClientSecret
		}
	
		fetch('https://accounts.spotify.com/api/token', authParameters)
		  .then(res => res.json())
		  .then(data => setToken(data.access_token))
	
	
	  }
	  console.log(token)

	 const serch = async () => {
	
		const searchParameters = {
		  method: 'GET',
		  headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token,
		  }
		}
		
	
		 fetch('https://api.spotify.com/v1/artists/' + artistID + "/albums" + '?include_groups=album&market=US&limit=50', searchParameters)
		  .then(res => res.json())
		  .then(data => {
			setAlbum(data.items.map((album) => ({ id: album.id, name: album.name, url: album.images[0].url })).filter(album=>album.id===albumId).reduce((acc, cur, i) => (acc = cur), {}))
			fetch('https://api.spotify.com/v1/albums/' + album.id + '/tracks', searchParameters)
		  .then(res => res.json())
		  .then(data => {
			
			  album.songs = data.items.map((song) => ({ name: song.name, id: song.id, album: { albumName: album.name, albumId: album.id } }));

  
			setAlbum(album);
			
  
  
  
		  });
		  });


	
	
	
	
	  } 

	
	

  return (
	<div className='cont' >
	<h1>AlbumDetail </h1>
	<h3>{album.name}</h3>
	<img  src={album.url} alt="" width={400} height={400} />
	<div className="">
				  {album.songs && album.songs.map((song) =>
					<div key={song.id} className="songs">
					  <p>{song.name}</p>
					  <button onClick={() => console.log(song)}>+</button>
  
  
					</div>
				  )}
				</div>
	
	
			
	</div>
  )
}

export default AlbumDetail