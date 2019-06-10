var imagePath = 'http://image.tmdb.org/t/p/w300';
var ajaxUrl = 'https://api.themoviedb.org/3/search/movie';
var api_key = 'f2c99cf74ee4c4214605f5ac1bc00fc6';
var basic_url = 'https://developers.themoviedb.org/3/getting-started/introduction';
var pageNum = 2;
var container = document.getElementById('flex-container');
var h3 = document.getElementById('nema-tog-naslova');
var divRes;
document.getElementById('search').addEventListener('keypress', callApi);
function callApi(event) {
    if (event.key === 'Enter') {
        // alert('enter je pritisnut');
        var xr = new XMLHttpRequest();
        xr.addEventListener('load', reqListener);
        xr.open('GET', ajaxUrl + '?api_key=' + api_key + '&query=' + document.getElementById('search').value);

        xr.send();
    }
}
function readMore() {
    var value = pageNum++;
    console.log(value);
    pageChange();
        function pageChange() {
            var xr = new XMLHttpRequest();
            xr.addEventListener('load', reqListener);
            xr.open('GET', ajaxUrl + '?api_key=' + api_key + ('&page=' + value) + '&query=' + document.getElementById('search').value);
            xr.send();
    }
}
function reqListener() {
    var obj = JSON.parse(this.responseText);
    console.log(obj);
    var img;
    var titleMovie;
    var reliceDate;
    var grade;

    selectNum = document.getElementById('selectNum');
    if (obj.total_results > 0) {
        obj.results.forEach(results => {

            var poster = 'https://image.tmdb.org/t/p/w185' + results.poster_path;
            var nemaPostera = 'no-image.jpeg';
            var title = results.title;
            var ocena = 'Ocena: ' + results.vote_average;
            var date = 'Datum ' + results.release_date;

            divRes = document.createElement('div');
            divRes.setAttribute('id', 'divRes');
            divRes.setAttribute('class', 'result');
            container.appendChild(divRes);

            img = document.createElement('img');
            img.setAttribute('src', poster);

            h3 = document.createElement('h3');
            titleMovie = document.createTextNode(title);
            h3.appendChild(titleMovie);
            p1 = document.createElement('p');
            grade = document.createTextNode(ocena);
            p1.setAttribute('class', 'ocena');
            p1.appendChild(grade)
            p2 = document.createElement('p');
            reliceDate = document.createTextNode(date)
            p2.appendChild(reliceDate);
            divRes.appendChild(img);
            divRes.appendChild(h3);
            divRes.appendChild(p1);
            divRes.appendChild(p2);

            if(results.poster_path === null){
                console.log('ovde nema fotke');
                img.setAttribute('src', nemaPostera);
            }
        });
    }

    
}
