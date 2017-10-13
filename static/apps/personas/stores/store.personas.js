var storePersonas = Ext.create(Ext.data.JsonStore, {
    fields  : ['id', 'nombre', 'edad', 'fecha_nacimiento', 'hora_nacimiento', 'estado_civil'],
    storeId: 'store.personas',
    data    : [
        {'id': 1, 'nombre':'Persona 1', 'edad': 10, 'fecha_nacimiento': Ext.Date.parse('10/01/1980', 'd/m/Y'), 'hora_nacimiento': Ext.Date.parse('6:00 AM', 'g:i A'), 'estado_civil': 'SOLTERO'},
        {'id': 2, 'nombre':'Persona 2', 'edad': 20, 'fecha_nacimiento': Ext.Date.parse('15/02/1985', 'd/m/Y'), 'hora_nacimiento': Ext.Date.parse('7:00 AM', 'g:i A'), 'estado_civil': 'CASADO'},
        {'id': 3, 'nombre':'Persona 3', 'edad': 30, 'fecha_nacimiento': Ext.Date.parse('20/03/1990', 'd/m/Y'), 'hora_nacimiento': Ext.Date.parse('8:00 AM', 'g:i A'), 'estado_civil': 'VIUDO'},
        {'id': 4, 'nombre':'Persona 4', 'edad': 40, 'fecha_nacimiento': Ext.Date.parse('25/04/1995', 'd/m/Y'), 'hora_nacimiento': Ext.Date.parse('9:00 AM', 'g:i A'), 'estado_civil': 'DIVORCIADO'}
    ]
 });