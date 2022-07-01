async function tokenValidationMiddleware(req,res,next){
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '')
    if (!token) {return res.sendStatus(401)}

    const session = await db.collection('sessions').findOne({ token });
    if (!session) {return res.sendStatus(401)}

    const costumer = await db.collection('costumers').findOne({ _id: session.userId });
    if (!costumer) {return res.sendStatus(401);}

    res.locals.costumer;
    next();
}

export default tokenValidationMiddleware

