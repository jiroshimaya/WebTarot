//const zip = (array1, array2) => array1.map((_, i) => [array1[i], array2[i]]);
//const zip = (...rows) => rows[0].map((_,c)=>rows.map(row=>row[c]));
const zip = (...rows) => [].map.call(rows[0],(_,c)=>rows.map(row=>row[c]));

//urlからパスワードを受け取る関数
const getUrlParam = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const getRandomText = num => {
	var l = num;//生成する文字列の長さ
	var c = "abcdefghijklmnopqrstuvwxyz0123456789";

	var cl = c.length;
	var r = "";
	for(var i=0; i<l; i++){
	  r += c[Math.floor(Math.random()*cl)];
	}

	return r;
}

//最大値・最小値を引数に持つ関数
const getRandomInt = ( min, max ) => {
	if(max === null)
		return Math.floor( Math.random() * min );
	else{
		return Math.floor( Math.random() * (max + 1 - min) ) + min;
	}
}

//全角を2文字半角を1文字でカウントする
const getLen = str => {
	  var result = 0;
	  for(var i=0;i<str.length;i++){
	    var chr = str.charCodeAt(i);
	    if((chr >= 0x00 && chr < 0x81) ||
	       (chr === 0xf8f0) ||
	       (chr >= 0xff61 && chr < 0xffa0) ||
	       (chr >= 0xf8f1 && chr < 0xf8f4)){
	      //半角文字の場合は1を加算
	      result += 1;
	    }else{
	      //それ以外の文字の場合は2を加算
	      result += 2;
	    }
	  }
	  //結果を返す
	  return result;
};

const getRandomFromList = ary => {
	return ary[Math.floor(Math.random() * ary.length)];
}

const getCurrentTime = () => {
	const now = new Date();
	const year = now.getFullYear();
	const mon = now.getMonth()+1; //１を足すこと
	const day = now.getDate();
	const hour = now.getHours();
	const min = now.getMinutes();
	const sec = now.getSeconds();

	const year_str = ('000' + year).slice(-4);
	const mon_str = ('0' + mon).slice(-2);
	const day_str = ('0' + day).slice(-2);
	const hour_str = ('0' + hour).slice(-2);
	const min_str = ('0' + min).slice(-2);
	const sec_str = ('0' + sec).slice(-2);

	//出力用
	var s = year_str + mon_str + day_str + hour_str + min_str + sec_str;
	return s;
}

const isJSON = arg => {
    arg = (typeof arg === "function") ? arg() : arg;
    if (typeof arg  !== "string") {
        return false;
    }
    try {
    arg = (!JSON) ? eval("(" + arg + ")") : JSON.parse(arg);
        return true;
    } catch (e) {
        return false;
    }
};

const isOnlyAlphabet = text => {
	if (text.match(/[^A-Z|^a-z|^0-9]/g))return false;
	else return true;
}

const isJapanese = text => {
	for(let i=0;i<text.length; i++){
		if(text.charCodeAt(i) >= 256)
			return true;
	}
	return false;
}

const isNumber = val => (isNaN(val) == false);
const isNull = val => (val == null); //return true if val is null or undefined
const loadTextFile = (path, onLoadFunc) => {
	$.ajax({
		url: path,
		type: 'GET',
		dataType: 'text',
		success: data=>{
			onLoadFunc(data);
		},
		error: data=>{
			console.log('error in loading file of',path);
			console.log(data);
		}
	});
}
const loadTextFileSync = path => {
	const ajax = $.ajax({
		url: path,
		type: 'GET',
		dataType: 'text',
		async: false,
		success: data=>{
			console.log('success');
		},
		error: data=>{
			console.log('error in loading file of',path);
			console.log(data);
		}
	});
	return ajax.responseText;
}

const loadYamlFile = (path, onLoadFunc) => {
	$.ajax({
		url: path,
		type: 'GET',
		dataType: 'text',
		success: data=>{
			const yaml = jsyaml.safeLoad(data);
			//console.log(yaml);
			onLoadFunc(data);
		},
		error: data=>{
			console.log('error in loading file of',path);
			console.log(data);
		}
	});
}

const loadYamlFileSync = path => {
	const text = loadTextFileSync(path);
	return jsyaml.safeLoad(text);
}

//console.log(loadTextFileSync('robot/CommU.yml'));