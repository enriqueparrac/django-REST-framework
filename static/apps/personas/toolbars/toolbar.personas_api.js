Ext.onReady(function() {
    
    Ext.define('toolbar_personas_api', {
        extend  : 'Ext.toolbar.Toolbar',
        alias   : 'widget.toolbar_personas_api',
        id      : 'toolbar_personas_api',
        items: [{
            xtype: 'button',
            text: 'Agregar',
            iconCls: urlIcono + 'file-o',
            handler: function (){
                insertaPersona();        
            }           
        }]
    })
}) 
    
    