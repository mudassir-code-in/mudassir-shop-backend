import jwt from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
    try {
        const accessToken = req.cookies.accessToken;

     
        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: 'Access Token not found. Please login again.'
            });
        }

 
        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            
            
            req.user = decoded; 
            
          
            next(); 

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

    } catch (error) {
        console.error("Middleware Auth Error:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error in auth verification'
        });
    }
}