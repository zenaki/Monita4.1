Ext.define('Monita4.model.login.Login', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'idu', type:'string' }
	],

	proxy: {
		type: 'ajax',
		api: {
			// create: 'data/index.php/login/doLogin/'
			create: Monita4.Constants.getApi()+'/auth/login'
		},
		reader: {
			type: 'json',
			rootProperty: 'auth',
			messageProperty: 'message'
		}
	}
});
