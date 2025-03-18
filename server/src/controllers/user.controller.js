async function alterPassword(req, res, next) {
    try {
        const {email, password} = req.body;
    } catch (error) {
        next(error);
    }
}