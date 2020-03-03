const rp = require('request-promise');
const $ = require('cheerio');
const michelinParser = require('./michelinParser');
const fs = require('fs')

fs.writeFileSync('michelin.json');

//for (let i = 1; i < 15; i++)
for (let i = 1; i < 15; i++){
  //const url = 'https://guide.michelin.com/fr/fr/restaurants/page/' + i;
  const url = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/' + i;
  rp(url)
  .then(function(html) {
    const wikiUrls = [];
    //for (let j = 0; j < 40; j++)
    for (let j = 0; j < 40; j++){
      wikiUrls.push($('a.link', html)[j].attribs.href);
    }
    return Promise.all(
      wikiUrls.map(function(url) {
        return michelinParser('https://guide.michelin.com' + url);
      })
    );
  })
  .catch(function(err) {  
    console.log(err);
  });
}

