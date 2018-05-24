Ext.define('Monita4.mixin.Badge', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'badge',
        after: {
            // render: 'afterRender'
        }
    },

    afterRender: function() {
        var me = this;

        // me.badgeText = me.badgeText || '';

        // if (!me.el) {
        //     me.on('render', Ext.pass(me.setBadgeText, [me.badgeText, true], me), me, {
        //         single: true
        //     });
        //     return;
        // }

        // me.el.addCls('abp-badge');
        // me.setBadgeText(me.badgeText, true);

    },

    setBadgeText: function(text, force) {
        var me = this,
            oldBadgeText = me.badgeText,
            el = me.el,
            dom = el && el.dom;

        if (el && dom) {
            if (force || oldBadgeText !== text) {
                me.badgeText = text;

                dom.setAttribute('data-abp-badge', me.badgeText || '');

                if (Ext.isEmpty(me.badgeText)) {
                    console.log('add class');
                    el.addCls('hide-badge');
                } else {
                    console.log('remove class');
                    el.removeCls('hide-badge');
                }

                me.fireEvent('badgetextchange', me, oldBadgeText, text);
            } else {
                console.log('Badge text is already set to ', text);
            }
        } else {
            console.warn('Unable to set badge without valid el and dom references');
        }

    },

    getBadgeText: function() {
        return me.badgeText;
    }
});
