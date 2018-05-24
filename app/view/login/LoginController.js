Ext.define('Monita4.view.login.LoginController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.login',
  // requires: ['Ext.ux.SailsIO'],
  // init: function (){
  //     console.log('ready');
  //     var socket = this.createWb('http://localhost:1337');
  //     // console.log(socket.socket);
  //     socket.get('/websocket/reds', function(response) {
  //         console.log('got response', response);
  //     });
  // },
  mixins: {
    WebSetting: 'Monita4.mixin.WebSetting'
  },
  init: function() {
    var me = this;
    // this.getView().destroy();

    this.myMask = new Ext.LoadMask({
      msg: 'Please wait...',
      target: this.getView()
    });
  },
  onSpecialKey: function(field, e) {
    // console.log(e);
    if (e.getKey() === e.ENTER) {
      this.onLoginClick();
    }
  },

  // createWb: function (urlio){
  //     var me = this;
  //     me.io = Ext.create('Ext.ux.SailsIO', {
  //         url: urlio
  //     })
  //     return me.io.socket;
  // },

  onLoadCode: function() {

    this.loginManager = new Monita4.LoginManager();
    var random = this.loginManager.rand();
    var setLabel = random.num1 + ' ' + random.op + ' ' + random.num2;
    var setHasil = random.res;
    this.lookupReference('kode').setFieldLabel(setLabel);
    this.lookupReference('capca').setValue(setHasil);
  },
  onRegistClick: function(btn) {
    var view = this.getView();
    // view.destroy();
    this.dialog = view.add({
      xtype: 'wind_regist'
    });
    this.dialog.show();
  },
  onLoginClick: function(btn) {
    var me = this,
      myform = me.lookupReference('formlogin'),
      isif = myform.getValues(),
      up = {
        u: isif.u,
        p: isif.p
      },
      isienc64 = Ext.util.Base64.encode(JSON.stringify(up));
    // var up = {isif.u,isif.p};
    // console.log(up);

    // console.log(isienc64);
    // if (isif.c != isif.k) console.log('sama');
    // var banding = (isif.c === isif.k) ? 1:0;

    // console.log(banding);
    // console.log(isio);
    myform.reset();
    me.onLoadCode();
    var mask = this.myMask;
    // if(banding ==1 ) console.log('sama'); else console.log('gak sama');

    if (isif.c === isif.k) {
      console.log('load model login');
      // console.log('up', up);
      // console.log('isienc64', isienc64);
      f_auth = new Monita4.model.login.Login({
        idu: isienc64
      });
      // var vms = Ext.create('Monita4.store.vm.editor.canvas.button.ButtonFormStore');
      //<debug>
      console.log('f_auth',f_auth);
      //</debug>
      this.myMask.show();

      f_auth.save({
        success: function(task, op, u) {

          Ext.Msg.show({
            title: 'Success',
            msg: 'Please wait...'
          });

          var data = Ext.JSON.decode(op.getResponse().responseText);
          var data_decode = me.loginManager.base64_decode(data.auth);
          // conf = data_decode.conf;
          me.loginManager.setCookie(data_decode);
          console.log('data_decode', data_decode);
          me.onShowPanel(data_decode);

          Ext.Msg.close();

          // vms.load();
        },
        failure: function(task, operation) {
          myform.getComponent(0).focus();

          var errorMsg = (operation.error.status === 0) ? 'Tidak bisa terhubung ke API' : operation.getError();
          // mask.destroy();
          Ext.Msg.show({
            title: 'Login Failed!',
            msg: errorMsg,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
          });
          return;
        }
      });

    } else {
      // console.log('gagal load model login');
      // console.log(myform);
      myform.getComponent(0).focus();
      Ext.Msg.show({
        title: 'Login Failed!',
        msg: 'Invalid Captcha',
        icon: Ext.Msg.ERROR,
        buttons: Ext.Msg.OK
      });
      return;


    }



  },
  onShowPanel: function(data) {
    // console.log('tampilkan panel',data);
    var me = this;
    this.myMask.destroy();
    this.getView().destroy();
    me.mixins.WebSetting.getWebSetting(data.uid);
    if (data.role == "Admin") {
      var utama = Ext.widget('app-main');
      // console.log(utama.down('appheader'));
      utama.getViewModel().setData({
        auth: data
      });
      // this.data = utama.getViewModel().getData();

      // Set Title Header
      // var apphead = utama.down('appheader');
      // utama.getViewModel().setData({judulnya:'Monita4 Admin - Konfigurator'});
      var data = utama.getViewModel().getData();
      // console.log(this.data);
      // console.log('ga hide');
    } else {
      // console.log('kampret');
      var utama = Ext.widget('app-mainuser');
      utama.getViewModel().setData({
        auth: data
      });
      // this.data = utama.getViewModel().getData();

      // Set Title Header
      // var apphead = utama.down('appheader');
      // utama.getViewModel().setData({judulnya:'Monita4 - Water Management System'});
      var data = utama.getViewModel().getData();
      // console.log(this.data);
      // console.log('harusnya hide');
    }
    // document.title = data.judulnya;
    // this.redirectTo('#!ct_asset');

    // return;
    // Set Data ViewModel di Main
    // utama.getViewModel().setData({uname:data.uname, role:data.role });

    // utama.getViewModel().setData(data);

    // id_user.setConfig({
    //     fieldLabel: data.uid,
    //     value: data.uid
    // });
    // var coba = utama.getViewModel().getData();
    // console.log(coba);

    // utama.fireEvent('saatMasuk',data);
    // Ext.Ajax.request({
    //     url: 'data/index.php/login/nama_login',
    //     success: function(response){
    //         var s = Ext.ComponentQuery.query('#label_welcome')[0];
    //         s.setText("Selamat Datang "+response.responseText);
    //     }
    // });
    // var s = Ext.ComponentQuery.query('#label_welcome')[0];
    // s.setText("Selamat Datang "+coba.data.uname);
  },
  // onCxlClick: function(btn){
  //     // console.log('hee cancel', btn);
  //     var formku = this.lookupReference('form');
  //     formku.getForm().reset();
  //     this.onLoading();
  // },
  onChange: function(field) {
    this.onEncriptForm(field);
  },
  onEncriptForm: function(field) {
    // this.encode = new Monita4.LoginManager();
    var pass = this.lookupReference('pass');
    var val = field.getValue();
    pass.setValue(val != "" ? this.loginManager.encodeMD5(val) : "");
  }
});
