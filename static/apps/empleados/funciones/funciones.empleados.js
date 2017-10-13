function showRespuestaApi(response) {
    resultado = Ext.JSON.decode(response.responseText);
    Ext.toast(resultado.msg, 'Aviso');
}

function editarEmpleado(record) {
    var id = record.id;

    var grid_empleados = Ext.getCmp('grid_empleados');
    var nombre = Ext.getCmp('nombre').getValue();
    var edad = Ext.getCmp('edad').getValue();
    var estatura = Ext.getCmp('estatura').getValue();
    var estado_civil = Ext.getCmp('estado_civil').getValue();
    var fecha_nacimiento = Ext.getCmp('fecha_nacimiento').getValue();
    var hora_nacimiento = Ext.getCmp('hora_nacimiento').getValue();
    
    url = '/api/apps/personas/' + id + '/'
    metodo = 'PUT'
    Ext.Ajax.request({
        url: url,
        method: metodo,
        params: {
            'nombre': nombre,
            'edad': edad,
            'estatura': estatura,
            'estado_civil': estado_civil,
            'fecha_nacimiento': Ext.Date.format(fecha_nacimiento,'Y-m-d'),
            'hora_nacimiento': Ext.util.Format.date(hora_nacimiento, "g:i A")
        },
        success: function(response, opts) {
            resultado = Ext.JSON.decode(response.responseText);
            grid_empleados.getStore().reload();
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