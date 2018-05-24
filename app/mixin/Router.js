Ext.define('Monita4.mixin.Router',{
	extend: 'Ext.Mixin',
	alias: 'mixin.router',

	defaultRoute: '!ct_asset',
	mixinConfig:{
		after:{
			initViewModel: 'afterInitViewModel',
			init: 'afterInit'
		}
	},

	afterInit: function(view) {
		Ext.app.route.Router.application.on({
			scope: this,
			unmatchedroute: this.onUnmatchedRoute
		});
	},

	afterInitViewModel:function(viewModel){
		var me = this;

		viewModel.bind('{tab}',me.onTabChange,me);
	},
	beforeProcessRoute:function(tab,action) {
		action.resume();
	},

	processRoute:function(tab) {
		// console.log(tab);
		var me = Ext.ComponentQuery.query('#maintab')[0];
		if (tab) {
			// me.setActiveTab(tab);
		}
	},

	onTabChange: function(laa,tab){
		// console.log(tab.xtype);
		// console.log(laa);
		// if (true) {}
		if (tab.xtype=='tabpanel') {
			var socket = monita4.Constants.socket,
				sidecanvas = Ext.ComponentQuery.query('#sidebarCanvas')[0],
				maintab = Ext.ComponentQuery.query('#maintab')[0],
				ws = maintab.down('tabpanel').items.items[2],
				upitemsStore = sidecanvas.getViewModel().getStore('uploaditems');
				locitemsStore = sidecanvas.getViewModel().getStore('localitems');
				backitemsStore = sidecanvas.getViewModel().getStore('localbackgrounditems');
				if (upitemsStore.isLoaded()!=1) {
					upitemsStore.getProxy().setHeaders({
						'Authorization': 'Bearer ' + monita4.Constants.getToken()
					});
					upitemsStore.load();
			}
			if (backitemsStore.isLoaded()!=1) {
				backitemsStore.getProxy().setHeaders({
						'Authorization': 'Bearer ' + monita4.Constants.getToken()
					});
				backitemsStore.load();
			}
			if (locitemsStore.isLoaded()!=1) {
				locitemsStore.getProxy().setHeaders({
						'Authorization': 'Bearer ' + monita4.Constants.getToken()
					});
				locitemsStore.load();
			}
		}
		this.redirectTo(this.createHash(tab));
	},

	createHash:function(tab,id) {
		var hash = window.location.hash,
			ha = hash ? hash.split('/') : [],
			tab = tab && tab.getItemId ? tab.getItemId() : tab,
			id = id && id.getId ? id.getId() : id;

		ha[0] = tab ? '!' + tab : (ha[0] ? ha[0] : this.defaultRoute);
		if (id) {
			ha[1] = id;
		}
		return ha.join('/');
	},

	onUnmatchedRoute: function(route) {
		//<debug>
		console.log('onUnmatchedRoute', route);
		//</debug>
		this.redirectTo(this.defaultRoute);
	}
});
