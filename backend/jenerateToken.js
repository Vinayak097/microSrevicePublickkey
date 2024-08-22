import jwt from 'jsonwebtoken'
export const jenerateToken=(data)=>{
    console.log("data",data)
    const token=jwt.sign(data,process.env.JWT_SECRET)
    return token;        
}