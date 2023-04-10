

export const postLogin = async (req, res, next) => {
    const userSession = req.session;
    const { name } = req.body;
    req.session.user = {
        name,
        isLoggedIn: true
    };

    try {
        await req.session.save();
    } catch (err) {
        console.error('Error saving to session storage: ', err);
        return next(new Error('Error creating user'));
    }

    res.status(200).json({
        estado: true,
        msg: 'OK',
        data: name
    });
};

export const getCheckSession = async (req, res) => {
    const userSession = req.session?.passport?.user;

    if (!userSession) {
        return res.status(202).json({
            estado: true,
            msg: 'No existe (session)',
            data: {}
        });
    } else {
        return res.status(200).json({
            estado: true,
            data: userSession
        });
    }
};

export const getLogout = async (req, res) => {
    await req.session.destroy();
    return res.status(200).json({
        estado: true,
        data: {}
    });
};