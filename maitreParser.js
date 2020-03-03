const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs')

const storeData = (data, path) => {
  try {
    fs.appendFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

fs.writeFileSync('maitres.json')

for (let i = 1; i < 8000; i++){
    const url = 'https://www.maitresrestaurateurs.fr/profil/' + i;
    
    rp(url)
    .then(function(html) {
        restaurant = $('.infos-nom', html).text(); 
        restaurant = restaurant.replace(/\n/g, '')   
        restaurant = restaurant.trim()
        restaurant = {name:restaurant}
        console.log(restaurant);
        storeData(restaurant, 'maitres.json')
      })
      .catch(function(err) {
      })
}






  

  