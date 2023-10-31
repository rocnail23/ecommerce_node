const  {User,Code} = require("../models")
const bcrypt = require("bcrypt")
const sendEmail = require("../utils/nodeMail")

const createUser = async() => {
    try {
        
        const {name, password, email, urlBase} = req.body
        const body = {name,password,email}
        body.password = await bcrypt.hash(password,10)
        const result = await User.create(body);
        const code = require("crypto").randomBytes(64).toString("hex")
        const url = `${urlBase}/verify_email/${code}`
        const send = await sendEmail({
            to:email,
            subject: "verificacion de cuenta",
            html: `<div><h1> verifica tu cuenta<h1/>
                    <a href="${url}"> has click aqui para verificar tu usuario<a/><div/>`
        })
    
        const emailcode = {
            code,
            user_Id: result.id 
        }
        await Code.create(emailcode)
        return res.status(201).json({result,send});

    } catch (error) {
        console.log(error)
        return res.status(400).json({mgs:error})
    }
}


const verifyCode = catchError(async(req,res) => {
   try {
    const {code} = req.params
    const emailcode = await Code.findOne({where:{code}})
    if(!emailcode) return res.sendStatus(401)
    const body = {
        valid: true
    }
     await User.update(body,{where:{id:emailcode.userId}, returning:true})
    emailcode.destroy()
    return res.status(200).json({mgs:"user validated"})
   } catch (error) {
    return  res.status(400).json({mgs:'ups error'})
   }
})

const loginUser = catchError(async(req,res) => {
        
   try {
    const {email,password} = req.body
 
    const user = await User.findOne({where:{email}})
    console.log(user)
    if(!user) return res.sendStatus(401)
    
    if(user.valid == false) return res.sendStatus(401)
    
    const isPassword = await bcrypt.compare(password,user.password)
    if(!isPassword) return res.sendStatus(401)
    const token = jwt.sign({user},process.env.SECRET,{
        expiresIn: "2h",
    })
    return res.status(201).json({token,user})
   } catch (error) {
    return res.status(400)
   }

})


module.exports = {
    createUser,
    verifyCode,
    loginUser
}