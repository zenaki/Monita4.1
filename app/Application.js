/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Monita4.Application', {
    extend: 'Ext.app.Application',

    name: 'Monita4',

    mixins: {
      WebSetting: 'Monita4.mixin.WebSetting'
    },

    requires: [
      'Monita4.LoginManager',
      'Monita4.Constants'
    ],

    stores: [
        // TODO: add global / shared stores here
    ],

    models: [
      'login.Login'
    ],

    launch: function () {
        // TODO - Launch the application
        var me = this;
        me.kukis = new Monita4.LoginManager();

        // var mbx = Ext.create('Ext.window.MessageBox', {
        //   closeAction: 'destroy'
        // }).show({
        //   title: 'Please wait',
        //   msg: 'Loading items...',
        //   progressText: 'Initializing...',
        //   width: 300,
        //   progress: true,
        //   closable: false
        //     // animateTarget: btn
        // });
        //
        // // Fake progress fn
        // var i = 0,
        //   fn;
        //
        // fn = function() {
        //   me.timer = null;
        //   ++i;
        //   if (i === 2) {
        //     mbx.hide();
        //     // Monita4.Constants.panggilToast().warning('Your fake items were loaded', 'Done');
        //   } else {
        //     var val = i / 1;
        //     mbx.updateProgress(val, Math.round(100 * val) + '% completed');
        //     me.timer = Ext.defer(fn, 500);
        //   }
        // };
        //
        // me.timer = Ext.defer(fn, 500);
        // Ext.get('loading').fadeOut({
        //   remove: true
        // });

        /*Sharing Cookies Credential, bro
        Problem solving untuk spamming session talisa
        Sekalian juga ngirim param JWT supaya tidak berulang codenya*/

        Ext.Ajax.on("beforerequest", function(con, dat) {
          // console.log("Test1");
          con.setUseDefaultXhrHeader(false);
          con.setWithCredentials(true);
          con.setDefaultHeaders({
            'Authorization': 'Bearer ' + Monita4.Constants.getToken()
          });

          var times = Monita4.Constants.getTimes();
          console.log("times", times);

          if (dat.params === undefined) {
            dat.params = {};
          }

          var logmanager = new Monita4.LoginManager();
          dat.params.timezone = (times.timezone === undefined) ? null : times.timezone;
          // dat.params = "par="+logmanager.base64_encode(dat.params);
          console.log("dat", dat);
          // Ext.encode(dat.params);
          // dat.params.epoch = times.epoch;

        });

        var resStatus = '';
        var infoStatus = '';

        Ext.Ajax.on("requestexception", function(con, resp, opt) {
          // console.log("Test2");
          Monita4.helper.ConException.exec(resp);
        });

        me.lama = JSON.parse(me.kukis.getCookie());

        if (me.lama) {
          // me.mixins.WebSetting.getWebSetting(me.lama.uid);

          if (me.lama.role == "Admin") {
            console.log("Role", me.lama.role);
            // var utama = Ext.create({
            //   xtype: 'app-main'
            // });
            //
            // var data = utama.getViewModel().getData();

          } else {
            console.log("Role", me.lama.role);
            // var utama = Ext.create({
            //   xtype: 'app-mainuser'
            // });
            //
            // var data = utama.getViewModel().getData();
            // var nav = Ext.ComponentQuery.query('#navtreemain')[0];
            // var coba = nav.getView();
          }
          // utama.getViewModel().setData({
          //   auth: me.lama
          // });

        } else {
          console.log("me.lama", me.lama);
          // var toastnya = Monita4.Constants.panggilToast();
          // window.location.reload();
          // Router.loading();
          // Router.pindah('/login');
          // toastr.warning('Please login first!','Warning',{'positionClass':'toast-bottom-left'});
          Ext.create({
            xtype: 'login'
          });
        }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
