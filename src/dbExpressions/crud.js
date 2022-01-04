const connection = require('./db')


const getAll = async () =>
{
   try {   
    db = await connection.DbConnectionFacs.Get()
    const result = db.collection(process.env.COLLECTION_NAME_TOKEN).find().toArray();
    
    return result;

   } catch (error) {
    
       console.log(error)
   }
}

const add_Expression = async (id,turma,matricula,update,emotion,data) =>
{
    
    try {

    

    updateAluno_=""+[turma]+".alunos.$[]."+[data]+"."+[matricula]+"."+[emotion]
    
    
     db = await connection.DbConnectionFacs.Get()
     await db.collection(process.env.COLLECTION_NAME_EXPRESSIONS).updateOne(
        { "id":`${id}`}, {
            $push: {

            [updateAluno_]:update

            }
    }

    )
            
    } catch (error) {
        console.log("Turma não encontrada!") 
        console.log("Error:"+error)
        return false
    }

}


//adicionar token em disciplina
const addToken=async (turma,token) =>{      
    db = await connection.DbConnectionFacs.Get()   
    addToken_="tokens.$[]."+[turma] 
    await db.collection(process.env.COLLECTION_NAME_TOKEN).updateOne(
        { "_id": "tokensId" }, {
            $push: {

            [addToken_]:{"token-aula":token}

            }
    }

    )
    
 
}


const getReport=async(id_)=>{
    db = await connection.DbConnectionFacs.Get()
    result=await db.collection(process.env.COLLECTION_NAME_EXPRESSIONS).find({id:id_}).toArray();
   
    return result


}


module.exports = { getAll,add_Expression,addToken,getReport}