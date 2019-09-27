'use strict';

const apiKey ='&api_key=vNaH6zzPIsPAvTImw0w6VKvwT6UAaUIA1oSI6xWZ';
const searchURL= 'https://developer.nps.gov/api/v1/';


// listens for submit button and passes input
// prints results to console
function onSubmit() {
	$('.search').submit( event => {
		event.preventDefault();
		let  stateSearch = $('.states').val();
		console.log(stateSearch);
		$('.results').html('');
		getInfo(stateSearch);
	});
}

function getInfo (state) {
	fetch(`${searchURL}/parks?stateCode=${state}${apiKey}`)
    .then(result => result.json())
    .then(jsonData => console.log(jsonData))
    .then(jsonData => extractData(jsonData))
    .then(jsonData => console.log(jsonData))
	.catch(e => {
		console.log(e);
	});
		
}

function extractData(parkData) {
	let data = {
        "fullName": parkData.data[0].fullName,
		"description": parkData.data[0].description,
		"url": parkData.data[0].url
	};

	if (data.status === 'error') notFound(breed);
	else {
	$('.output').append(`
			<img src='${data.message}'>
		`);
}}

function notFound(search) {
	$('.output').append(`
			<h2>Request for ${search} cannot be found!</h2>
		`);
}

onSubmit();