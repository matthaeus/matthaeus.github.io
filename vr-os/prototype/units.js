

var units = [];
units[0] = [];
units[0][0] = {}
units[0][1] = {}

units[0][0].desc = 'Volumsdfsdfdse';
units[0][0].kind = 'numbers';
units[0][0].min = 16;
units[0][0].max = 29;
units[0][0].increment = 1;
units[0][0].unitSize = 10;
units[0][0].suffix = '&deg;';
units[0][0].now = units[0][0].min;
units[0][0].last = units[0][0].min;
units[0][0].decimals = 0;
units[0][0].last = 0;






units[1] = [];
units[1][0] = {}
units[1][1] = {}

units[1][0].desc = 'Volume';
units[1][0].kind = 'numbers';
units[1][0].min = -50;
units[1][0].max = 0;
units[1][0].increment = 0.1;
units[1][0].unitSize = 10;
units[1][0].suffix = 'dB';
units[1][0].now = -40;
units[1][0].last = -40;
units[1][0].decimals = 1;

units[1][1].desc = 'Playlist';
units[1][1].kind = 'images';
units[1][1].min = 0;
units[1][1].max = 4;
units[1][1].increment = 1;
units[1][1].unitSize = 90;
units[1][1].suffix = '';
units[1][1].now = 10;
units[1][1].last = 10;
units[1][1].decimals = 0;
units[1][1].fileNames = ['song1.png', 'song2.png', 'song3.png', 'song4.png', 'song5.png'];
units[1][1].labels = ['Hurricane', 'Get Lucky', 'Civilization', 'Bad', 'Bulletproof'];

// units[1][1].desc = 'Playlist';
// units[1][1].kind = 'text';
// units[1][1].min = 0;
// units[1][1].max = 4;
// units[1][1].increment = 1;
// units[1][1].unitSize = 100;
// units[1][1].suffix = '';
// units[1][1].now = 6;
// units[1][1].last = 6;
// units[1][1].decimals = 0;
// units[1][1].labels = ['Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5', 'Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5', 'Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5', 'Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5', 'Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5', 'Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5', 'Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5', 'Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5', 'Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5'];

units[2] = [];
units[2][0] = {}
units[2][1] = {}

units[2][0].desc = 'Mode';
units[2][0].kind = 'text';
units[2][0].min = 0;
units[2][0].max = 11;
units[2][0].increment = 1;
units[2][0].unitSize = 150;
units[2][0].suffix = '';
units[2][0].now = 8;
units[2][0].last = 8;
units[2][0].decimals = 0;
units[2][0].labels = ['FM Radio', 'USB', 'CD', 'AUX', 'FM Radio', 'USB', 'CD', 'AUX', 'FM Radio', 'USB', 'CD', 'AUX', 'FM Radio', 'USB', 'CD', 'AUX', 'FM Radio', 'USB', 'CD', 'AUX', 'FM Radio', 'USB', 'CD', 'AUX', 'FM Radio', 'USB', 'CD', 'AUX', 'FM Radio', 'USB', 'CD', 'AUX', 'FM Radio', 'USB', 'CD', 'AUX'];
         
units[2][1].desc = 'Frequency';
units[2][1].kind = 'numbers';
units[2][1].min = 87.5;
units[2][1].max = 108;
units[2][1].increment = 0.1;
units[2][1].unitSize = 13;
units[2][1].suffix = 'Hz';
units[2][1].now = 88.6;
units[2][1].last = 88.6;
units[2][1].decimals = 1;



units[3] = [];
units[3][0] = {}
units[3][1] = {}

units[3][0].desc = 'Temperature';
units[3][0].kind = 'numbers';
units[3][0].min = 16;
units[3][0].max = 29;
units[3][0].increment = 1;
units[3][0].unitSize = 50;
units[3][0].suffix = '&deg;C';
units[3][0].now = 21;
units[3][0].last = 21;
units[3][0].decimals = 0;

units[3][1].desc = 'Seat Heating';
units[3][1].kind = 'text';
units[3][1].min = 0;
units[3][1].max = 3;
units[3][1].increment = 1;
units[3][1].unitSize = 150;
units[3][1].suffix = '';
units[3][1].now = 0;
units[3][1].last = 0;
units[3][1].decimals = 0;
units[3][1].labels = ['Off', 'Low', 'Med', 'High'];




units[4] = [];
units[4][0] = {}
units[4][1] = {}


units[4][0].desc = 'Air Flow';
units[4][0].kind = 'text';
units[4][0].min = 0;
units[4][0].max = 7;
units[4][0].increment = 1;
units[4][0].unitSize = 80;
units[4][0].suffix = '';
units[4][0].now = 0;
units[4][0].last = 0;
units[4][0].decimals = 0;
units[4][0].labels = ['Off', 'Auto', '&#9679;', '&#9679;&#9679;', '&#9679;&#9679;&#9679;', '&#9679;&#9679;&#9679;&#9679;', '&#9679;&#9679;&#9679;&#9679;&#9679;', '&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'];

      
units[4][1].desc = 'Air Flow Diretion'; 
units[4][1].kind = 'text';
units[4][1].min = 0;
units[4][1].max = 4;
units[4][1].increment = 1;
units[4][1].unitSize = 130;
units[4][1].suffix = '';
units[4][1].now = 0;
units[4][1].last = 0;
units[4][1].decimals = 0;
units[4][1].labels = ['Upper','Lower','Mixed'];