Ext.onReady(function() {
    
    Ext.tip.QuickTipManager.init();
    
    viewportEmpleados = Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid_empleados',
            flex:1
        }]
    });
    
    Ext.Ajax.on('beforerequest', function(conn, options) {
        if (!(/^http:.*/.test(options.url) || /^https:.*/.test(options.url))) {
            if (typeof(options.headers) == "undefined") {
                options.headers = {
                    'X-CSRFToken': Ext.util.Cookies.get('csrftoken')
                };
            } else {
                options.headers.extend({
                    'X-CSRFToken': Ext.util.Cookies.get('csrftoken')
                });
            }
        }
    }, this);
});