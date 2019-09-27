'use strict';

const apiKey ='&api_key=vNaH6zzPIsPAvTImw0w6VKvwT6UAaUIA1oSI6xWZ';
const searchURL= 'https://developer.nps.gov/api/v1/';


// listens for submit button and passes input
// prints results to console
function onSubmit() {
	$('.search').submit( event => {
		event.preventDefault();
        let  stateSearch = $('.states').val();
        let  maxNum = $('.max').val();
		$('.results').html('');
		getInfo(stateSearch,maxNum);
	});
}

function getInfo (state,max) {
	fetch(`${searchURL}/parks?stateCode=${state}&limit=${max}${apiKey}`)
    .then(result => result.json())
    .then(jsonData => extractData(jsonData))
	.catch(e => {
		console.log(e);
	});
		
}

function extractData(parkData) {
    parkData.data.forEach(data => {
        let {
            fullName,
            description,
            url
        } = data;

        $('.results').append(`
            <h2>${data.fullName}</h2>
            <p>${data.description}</p>
            <a href=${data.url}>${data.url}</a>`
        );
    
    });
    
}

function notFound(search) {
	$('.results').append(`
			<h2>Request for ${search} cannot be found!</h2>
		`);
}

onSubmit();