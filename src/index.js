import { name } from './component';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';

require('./index.less');
console.log(name);

$('#app').html(name);
var img = document.createElement("img");
img.className = 'img-circle';
img.src = require("./zfpx.png");
document.body.appendChild(img);