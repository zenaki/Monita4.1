Ext.define('Monita4.view.login.Login', {
	extend: 'Ext.window.Window',
	xtype: 'login',
	itemId: 'buatlogin',
	requires: [
			'Monita4.view.login.LoginController',
			'Ext.form.Panel',
			'Monita4.LoginManager',
			'Monita4.view.login.LoginModel',
			'Ext.window.Window'
	],

	controller: 'login',
	viewModel: {
		type: "login-login"
	},
	title: 'Login - Monita 4',
	// renderTo: Ext.getBody(),
	iconCls: 'ico_vts',
	modal:false,
	glyph: 0xf0f0,
	resizable: false,
	draggable: false,
	closable: false,
	autoShow: true,
	items: {
		xtype: 'form',

		bodyPadding: 10,
		reference: 'formlogin',
		defaultType: 'textfield',
		fieldDefaults: {
			labelAlign: 'right',
			labelWidth: 90,
			msgTarget: 'side'
		},
		defaults: {
			anchor: '100%'
		},
		items: [{
			fieldLabel: 'User ID',
			name: 'u',
			emptyText: 'User ID',
			allowBlank: false
		},{
			fieldLabel: 'Password',
			emptyText: 'Password',
			inputType: 'password',
			submitValue: false,
			allowBlank: false,
			listeners : {
				change : 'onChange'
				// focusleave : 'onFocusLeave'
			}
		},/*{
			xtype: 'component',
			autoEl: {
				tag: 'a',
				href: '#',
				html: 'Nantinya Forgot Password'
			}
		},*/{
			name: 'p',
			reference: 'pass',
			xtype:'hidden'
		},{
			xtype: 'numberfield',
			reference: 'kode',
			emptyText: 'Answer Question',
			name: 'c',
			allowBlank: false,
			listeners : {
				afterrender:'onLoadCode',
				specialKey: 'onSpecialKey'
			}
		},{
			reference: 'capca',
			name : 'k',
			hidden : true,
			listeners : {
				afterrender:'onLoadCode'
			}
		}],
		buttons: [{
			xtype : 'component',
			id: 'app-login-logo',
			autoEl: {tag: 'a', href: 'http://www.daunbiru.com', target: '_blank'}
		},'->',{
			text: 'Register',
			listeners: {
				click: 'onRegistClick'
				// specialKey: 'onSpecialKey'
			}
		},'->',{
			text: 'Login',
			formBind: true,
			listeners: {
				click: 'onLoginClick',
				specialKey: 'onSpecialKey'
			}
		}]
	}
});
