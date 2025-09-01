import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

// export const isAuthenticated = async(req,resizeBy,next)=>{
//     try {
//         const token = req.cookies.token;
//         if(!token){
//             return res.status(401).json({
//                 message:"user not authenticated",
//                 success:false
//             })
//         const decode = jwt.verify(token,process.env.SECRET_KEY)
//         if(!decode){
//             return res.status(401).json({
//                 message:"invalid token",
//                 success:false
//             })
//         }
//         req.id = decode.userId;
//         next();
//         }
//     } catch (error) {
//         console.log("error in authentication")
//     }
// }

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(req.cookies.token)
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        req.id = decode.userId; // ✅ Attach to req, not res
        next();
    } catch (error) {
        console.log("Error in authentication", error); // Add error detail
        return res.status(500).json({ message: "Internal server error" });
    }
};
