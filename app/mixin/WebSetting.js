Ext.define('Monita4.mixin.WebSetting',{
	extend: 'Ext.Mixin',
	alias: 'mixin.WebSetting',
	mixinConfig: {
		id: 'util',
		after: {
			init: 'afterInit'
		}
	},
	afterInit:function() {
		//<debug>
		console.log('initiated mixin');
		//</debug>
	},
	getWebSetting:function(uid){
		// console.log(uid);
		var me = this;
		Ext.Ajax.request({
			method: 'post',
			url: monita4.Constants.getApi() + '/readWebSetting',
			params: {id: uid},
			success:function(a,b){
				var data = JSON.parse(a.responseText);
				me.setData(data);
			},
			failure: function(a,b){
				var data = null;
				Ext.Msg.show({
					title:'Info',
					message: 'There was an error in Application. Reload pages?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.INFO,
					fn: function(btn) {
						if (btn === 'yes') {
							window.location.reload();
							console.log('Yes pressed');
						} else if (btn === 'no') {
							console.log('No pressed');
						} else {
						}
					}
				});
				// return data;
			}
		});
	},
	resetWebSetting:function(){
		this.setHtmlSetting('Monita4','resources/asset/image/vtes2.png');
	},

	setData:function(data){
		var kukis = new monita4.LoginManager(),
		cook = JSON.parse(kukis.getCookie()),
		main;
		if (cook.role=='Operator') {
			main = Ext.ComponentQuery.query('app-mainuser')[0];

		}else{

			main = Ext.ComponentQuery.query('app-main')[0];
		}


		main.getViewModel().setData(data.data);
		this.setHtmlSetting(data.data.titleheader,monita4.Constants.getApi() + '/images/'+data.data.logo)
		// console.log(data);
		// console.log('dataKampret',me.getViewModel().getData());
	},
	setHtmlSetting:function(head,logo){
		document.title = head;
		var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.href = logo;
		document.getElementsByTagName('head')[0].appendChild(link);
	}
});
