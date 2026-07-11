import { getAuth } from '@clerk/express';

export const getCurrentUser = (req, res) => {
    const { userId, sessionId } = getAuth(req);

    res.status(200).json({
        userId,
        sessionId,
    });
};
