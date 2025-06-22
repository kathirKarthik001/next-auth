import { prisma}  from "@/lib/db"

const getUserByEmail = async ( email : string ) =>{
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    return user
}

const getUserById = async ( id : string ) =>{
    const user = await prisma.user.findUnique({
        where:{
            id:id
        }
    })
    return user
}



export { getUserByEmail , getUserById }