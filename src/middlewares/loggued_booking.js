function permission(req, res, next) {

    if (req.session && req.session.user) {
        if (req.session.user.id_role == 2) {
            next();
        } else {
            res.send('pagina no encontrada');
        }
    } else {
        res.send('pagina no encontrada');
    }
}

module.exports = permission;
