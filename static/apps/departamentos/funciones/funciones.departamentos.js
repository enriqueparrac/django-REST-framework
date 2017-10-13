function showRespuestaApi(response) {
    resultado = Ext.JSON.decode(response.responseText);
    Ext.toast(resultado.msg, 'Aviso');
}

function editarDepartamento(record) {
    var id = record.id;

    var grid_departamentos = Ext.getCmp('grid_departamentos');
    var nombre = Ext.getCmp('nombre').getValue();
    var descripcion = Ext.getCmp('descripcion').getValue();
        
    url = '/api/apps/departamentos/' + id + '/'
    metodo = 'PUT'
    Ext.Ajax.request({
        url: url,
        method: metodo,
        params: {
            'nombre': nombre,
            'descripcion': descripcion
        },
        success: function(response, opts) {
            resultado = Ext.JSON.decode(response.responseText);
            grid_departamentos.getStore().reload();
            if (!resultado.success) {
                Ext.toast(resultado.msg.toString(), 'Aviso');
            } else {
                showRespuestaApi(response);
            }


        },
        failure: function(response, opts) {
            showRespuestaApi(response);
        }
    })
}