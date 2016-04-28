var _data = null;

function readData() {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    console.log('firing request');
    xhr.open('GET', 'masterData.json', true);
    xhr.addEventListener('load', function() {
	_data = JSON.parse(this.responseText);
    });
    xhr.send();
}

readData();

var _championList = ['Alistar', 'Caitlyn'];
var _championDiv;
var _currentChamp;

var _leftSummoner = "Aphromoo";
var _rightSummoner = "Doublelift";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function displayMatchup() {
    // select a random champion
    var selectedChampIndex = getRandomInt(0, _championList.length);
    _currentChamp = _championList[selectedChampIndex];

    var nameDisplay = document.querySelector('#champDisplay h2');
    nameDisplay.innerHTML = _currentChamp;
}

function vote(summonerIndex) {
    // find the left score
    var leftScore = _data['players'][_leftSummoner][_currentChamp]["championPoints"];
    var rightScore = _data['players'][_rightSummoner][_currentChamp]["championPoints"];

    var result;

    if (summonerIndex == 0) {
	result = (leftScore >= rightScore);
    } else {
	result = (rightScore >= leftScore);
    }

    var resultDisplay = document.getElementById('results');
    resultDisplay.innerHTML = (result) ? 'Success' : 'Failure';
}

document.addEventListener('DOMContentLoaded', function() {
    displayMatchup();
    
    var leftSummonerEle = document.querySelector('#one button');
    leftSummonerEle.addEventListener('click', function() { vote(0); });

    var rightSummonerEle = document.querySelector('#two button');
    rightSummonerEle.addEventListener('click', function() { vote(1); });
});
