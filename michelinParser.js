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

const michelinParser = function(url) {
  return rp(url)
    .then(function(html) {
      name = $('.restaurant-details__heading--title', html).text();
      tel = $('span.flex-fill', html).text(); 
      name = name.slice(0, name.length/2);
      name = name.toUpperCase();
      tel = tel.slice(4, 17);
      tel = '0' + tel
      name = {name:name}
      tel = {tel:tel}
      console.log(name)
      //console.log(tel)
      storeData(name, 'michelin.json')
      //storeData(tel, 'michelin.json')
    })
    .catch(function(err) {
    });
};

module.exports = michelinParser;


/*
label = $('.restaurant-details__classification--list', html).text();
      label = label.replace(/\n/g, '')   
      label = label.replace('=', '')
      label = label.replace('‹', '')
      //label = label.replace('o', '')
      label = label.replace('ó', '')
      label = label.replace('ò', '')
      label = label.replace('ö', '')
      label = label.replace('ô', '')
      label = label.replace('• qualité des produits et tour de main du chef : un bon repas tout simplement', '')
      label = label.replace('Très confortable. Nos établissements de charme.', '')
      label = label.replace('Assez confortable', '')
      label = label.replace('Une étoile • Une cuisine d\'une grande finesse. Vaut l\'étape !', '')
      label = label.trim();
      //console.log(label)
*/

