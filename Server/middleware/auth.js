import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
  
  const token = req.headers.authorization?.split(' ')[1];
  
  try{
     
    if(!token){
    return res.status(403).send("Access Denied");
    
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  }catch(err){
    res.status(500).json({error: err.message});
  }
}

