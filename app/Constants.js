/**
 * Constants Class
 * used for storing global function(s) and global variables
 * @class Constants
 * @module Constants
 * @constructor
 */

Ext.define("Monita4.Constants", {
  singleton: true,
  /**
   * define socket to default null
   * @property socket
   * @type {string}
   * @default null
   */
  socket: null,

  /**
   * function to get URL application programming interface (API)
   * @module Constants
   * @submodule getApi()
   * @method getApi()
   * @return {String} Returns an url API
   */
  getApi: function () {
    var loc = window.location;

    if (loc.hostname == 'localhost') {
      // return 'http://localhost:1336';
      return 'http://10.10.10.11:1336';
    } else {
      return 'http://' + loc.hostname + ':1336';
    }

    // return 'http://project.daunbiru.com:1336';
    // return 'http://192.168.1.17:1337';
    // return 'http://119.18.154.235:1965';
    // return 'http://localhost:1337';
  },
  getUrlWs: function () {
    var loc = window.location;

    if (loc.hostname == 'localhost') {
      return 'ws://localhost:1234';
    } else {
      return 'ws://' + loc.hostname + ':1234';
    }
    // return 'ws://119.18.154.235:1234';
    // return 'ws://project.daunbiru.com:1234';
  },
  /**
   * function to getToken from User login
   * @method getToken()
   * @return {Boolean} Returns user token on cookies is exist
   */
  getToken: function () {
    var cookies = getCookie("marine");

    if (cookies) {
      var kueh = Base64Decode(cookies);
      kueh = JSON.parse(kueh);
      return kueh.token;
    } else {
      return false;
    }

  },

  /**
   * used in any controller ExtJS to create WebSocket
   * @method  createWb()
   * @param  {String} config.url The url on the config object
   * @return {String} socket User
   */
  createWb: function (urlio) {
    var me = this;
    me.io = Ext.create('Ext.ux.SailsIo.SailsIO', {
      url: urlio,
      token: monita4.Constants.getToken()
    })
    this.socket = me.io.socket;
    return me.io.socket;
  },
  /**
   * used in any controller ExtJS to call a Toastr.js
   * @method panggilToast
   * @return {Object} toast function
   * @example using this function : packageName.Constants.panggilToast.success/info/warning/danger();
   */
  panggilToast: function () {
    /**
     * call an own library Toastr
     * @type {Object}
     */
    var me = Ext.create('Ext.ux.Toast');
    return me.toastr;
  },
  getBearer: function () { //Helper untuk memanggil jwt token, yo
    return {
      'Authorization': 'Bearer ' + monita4.Constants.getToken()
    };
  },
  getTimes: function () {
    var datetime = new Date();

    var offset = datetime.getTimezoneOffset(),
      o = Math.abs(offset);
    var timezone = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
    var epoch = datetime.getTime();

    // console.log(Math.floor(epoch/1000));

    return {
      datetime: datetime,
      timezone: timezone,
      epoch: Math.floor(epoch / 1000)
    };
  },
  getEpoch: function (date) {
    var t = new Date(date);

    return Math.floor(t.getTime() / 1000);
  },
  getAuth: function () {
    var cookies = getCookie("marine");

    if (cookies) {
      var kueh = Base64Decode(cookies);
      kueh = Ext.JSON.decode(kueh);

      return kueh;
    } else {
      return false;
    }
  }
});
