Ext.define('Monita4.LoginManager', {

	 config: {
        /**
         * @cfg {Class} model
         * The model class from which to create the "user" record from the login.
         */
        model: null,

        /**
         * @cfg {Ext.data.Session} session
         */
        session: null
    },

    constructor: function (config) {
        this.initConfig(config);
    },
    // applyModel: function(model) {
    //     return model && Ext.data.schema.Schema.lookupEntity(model);
    // },

    rand:function(){
    	var n1 = Math.round(Math.random() * 10 + 1);
    	var n2 = Math.round(Math.random() * 10 + 1);
    	// console.log(n1,n2);
    	var operator = "+",
    	// var operator = "+-x",
    	opnum = Math.floor(Math.random() * operator.length),
    	randop = operator.substring(opnum,opnum+1);
    	// console.log(randop);
    	var hsl;
    	switch (randop){
				case '+': hsl=n1+n2; break;
			}

      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
        string_length = 5,
        randomstring='',
				i;
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        var angka = {num1 : n1, num2 : n2, op : randop, res : hsl, rand : randomstring };
        // console.log(angka);
        return angka;
    },

		cekExpired: function(){
			// return this.expired;
			return this.expiration;
		},

    cekLogin:function(data){
    	// console.log('ini cek logiin bro',data);
    	if (data){
    		var me = this;
    		var model_log = new marine.model.Login();
	    	model_log.load({
	    		params : {id : data.auth.id},
	    		success: function(task, operation){
	    			var data = Ext.JSON.decode(operation.getResponse().responseText);
	    			// console.log('sukses masuk lagi ==> ',data);
	    			// Ext.widget('app-main').destroy();
	    			// me.setAfterLogin(data);
	    		},

	    		failure: function(task, operation){
	    			//<debug>
	    			console.log('failed');
	    			//</debug>
	    		}

	    	});
    	} else return;

    },

    getCookie: function(){
    	//var cek = Ext.util.Cookies.get("marine");
    	//return cek;
			var cookies = getCookie("marine");
			if (cookies)
			{
					return Base64Decode(cookies) ;
			}
			else { return null;}

    },
    removeCookie: function(){
    	Ext.util.Cookies.clear("marine");
    	Ext.util.Cookies.clear("sessid");
    	// clear('name_of_cookie');
    },

    setCookie: function(obj){
				var tgl = new Date();
				// var config = JSON.parse(obj.conf);
				// console.log(config);
				var lex = (typeof(obj.conf) === 'object') ? obj.conf.lex : JSON.parse(obj.conf).lex;
				if (lex==='-1') {
					this.expired = 2147483647;
					// console.log('iya');
				}else{
					this.expired = tgl.getMinutes() + (parseFloat(lex));
					// console.log('bukan');
				}
				// console.log('lex => '+config.lex);
				// var expired = tgl.getMinutes() + (parseFloat(config.lex) * 1000);
				// this.expired = tgl.getMinutes() + (parseFloat(1));

				// console.log(tgl+ ' ==> ' +expired);
				// console.log(tgl+ ' ==> ' +this.expired);
				// console.log(new Date(tgl.setMinutes(this.expired)));

				//*
				// var exp = tgl.getMinutes() + parseFloat(1000 );
				// console.log(exp);
	      this.expiration = (lex !=0) ? new Date(tgl.setMinutes(this.expired)) : new Date('Fri, 31 Dec 9999 23:59:59 GMT');
				// console.log(tgl.setMinutes(this.expired));
				// console.log(new Date(tgl.setMinutes(this.expired)));
				// console.log('hari ini -> '+tgl.getTime());
				// console.log(this.expiration.getTime());

				// debugger;

				obj.habis = this.expiration.getTime();
				// obj.push(new Date(tgl.setMinutes(this.expired));

				// console.log('objek ekspired cookis ',obj);

				  // var expiration = new Date('Fri, 31 Dec 9999 23:59:59 GMT');
	        // var kukis = obj.data;
	        // kukis.status = true;
	        // console.log(kukis);
        // console.log(Ext.util.Base64.encode(JSON.stringify(kukis)));

    		// Ext.util.Cookies.set("marine", Ext.util.Base64.encode(JSON.stringify(kukis)), new Date(tgl.setMinutes(exp)) );
    		Ext.util.Cookies.set("marine", this.base64_encode(obj), this.expiration );
				//*/
		},

		base64_encode: function(object)
		{
			var setJSON = JSON.stringify(object);
			return Ext.util.Base64.encode(setJSON);
		},

		base64_decode: function(object)
		{
			var decode = Base64Decode(object);
			return Ext.JSON.decode(decode);
		},

    encodeMD5: function(str) {
		  //  discuss at: http://phpjs.org/functions/md5/
		  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
		  // improved by: Michael White (http://getsprink.com)
		  // improved by: Jack
		  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  //    input by: Brett Zamir (http://brett-zamir.me)
		  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  //  depends on: utf8_encode
		  //   example 1: md5('Kevin van Zonneveld');
		  //   returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'

	  	var xl;

	  	var rotateLeft = function(lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	 	};

		var addUnsigned = function(lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
			  	return (lResult ^ lX8 ^ lY8);
			}
		};

		var _F = function(x, y, z) {
			return (x & y) | ((~x) & z);
		};
		var _G = function(x, y, z) {
			return (x & z) | (y & (~z));
		};
		var _H = function(x, y, z) {
			return (x ^ y ^ z);
		};
		var _I = function(x, y, z) {
			return (y ^ (x | (~z)));
		};

		var _FF = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var _GG = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var _HH = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var _II = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var convertToWordArray = function(str) {
			var lWordCount;
			var lMessageLength = str.length;
			var lNumberOfWords_temp1 = lMessageLength + 8;
			var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
			var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
			var lWordArray = new Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		};

		var wordToHex = function(lValue) {
			var wordToHexValue = '',
			wordToHexValue_temp = '',
			lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				wordToHexValue_temp = '0' + lByte.toString(16);
				wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
			}
			return wordToHexValue;
		};

		var x = [],
		k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
		S12 = 12,
		S13 = 17,
		S14 = 22,
		S21 = 5,
		S22 = 9,
		S23 = 14,
		S24 = 20,
		S31 = 4,
		S32 = 11,
		S33 = 16,
		S34 = 23,
		S41 = 6,
		S42 = 10,
		S43 = 15,
		S44 = 21;

		  //str = this.utf8_encode(str);
		x = convertToWordArray(str);
		a = 0x67452301;
		b = 0xEFCDAB89;
		c = 0x98BADCFE;
		d = 0x10325476;

		xl = x.length;
		for (k = 0; k < xl; k += 16) {
			AA = a;
			BB = b;
			CC = c;
			DD = d;
			a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
			d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
			c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
			b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
			a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
			d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
			c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
			b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
			a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
			d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
			c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
			b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
			a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
			d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
			c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
			b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
			a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
			d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
			c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
			b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
			a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
			d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
			c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
			b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
			a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
			d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
			c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
			b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
			a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
			d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
			c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
			b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
			a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
			d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
			c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
			b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
			a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
			d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
			c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
			b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
			a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
			d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
			c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
			b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
			a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
			d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
			c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
			b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
			a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
			d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
			c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
			b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
			a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
			d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
			c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
			b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
			a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
			d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
			c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
			b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
			a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
			d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
			c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
			b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
			a = addUnsigned(a, AA);
			b = addUnsigned(b, BB);
			c = addUnsigned(c, CC);
			d = addUnsigned(d, DD);
		}

		var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

		return temp.toLowerCase();
	}





});
